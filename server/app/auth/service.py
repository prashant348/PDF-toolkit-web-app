from auth.repository import AuthRepository
from auth.utils import hash_password, normalized_email, generate_access_token
from auth.dependencies import authenticate_user
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta, timezone
from auth.utils import generate_refresh_token, generate_email_verification_token, verify_email_verification_token
from fastapi import Request, HTTPException, status, BackgroundTasks
from auth.schemas import EmailSchema, UserPublic
from auth.email import send_email_verification_link
from core.redis import redis_client as rc
import os

REFRESH_TOKEN_EXPIRE_DAYS = 7
# BASE_URL = os.getenv("FASTAPI_BASE_URL") 
CLIENT_BASE_URL = os.getenv("REACT_BASE_URL")

class AuthService:
    def __init__(self, repo: AuthRepository) -> None:
        self.repo = repo

    def register(self, email: str, password: str, background_tasks: BackgroundTasks):
        email = normalized_email(email)

        password = hash_password(password)
        # check if user already exists by user email
        user = self.repo.get_user_by_email(email)
        # if user already exists then return error response
        if user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email"
            )
        # if user does not exist then create user
        user = self.repo.create_user(email, password)

        # if user is not created then return error response
        if not user:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error creating user"
            )
        # if user is created then run the email verification background task
        token = generate_email_verification_token(user.email)
        background_tasks.add_task(
            send_email_verification_link, 
            EmailSchema(email=email), 
            token, 
            CLIENT_BASE_URL
        )
        # if user is created then return success response
        return {
            "success": True,
            "message": "User created successfully",
            "user": UserPublic.model_validate({
                "id": user.id,
                "email": user.email,    
                "is_verified": user.is_verified
            }).model_dump()
        }
    
    def login(self, email: str, password: str):
        email = normalized_email(email)
        # if user is authenticated then return jwt generated access token
        access_token = authenticate_user(self.repo, email, password)
        # if user is not authenticated then return error response 
        if not access_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            ) 
            
        # if user is authenticated then create refresh token
        refresh_token = generate_refresh_token()
        # get user id
        user = self.repo.get_user_by_email(email)
        
        expire = datetime.now(timezone.utc) + timedelta(days=float(REFRESH_TOKEN_EXPIRE_DAYS))

        self.repo.create_refresh_token(
            user_id=user.id,
            token=refresh_token,
            expires_at=expire
        )

        # Create the success response object locally before setting cookie 
        response = JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "User logged in successfully",
                "user": UserPublic.model_validate({
                    "id": user.id,
                    "email": user.email,
                    "is_verified": user.is_verified
                }).model_dump()
            }
        )

        # now set cookie on the response object
        response.set_cookie(
            key="access_token",
            value=access_token,
            max_age= 30 * 60, # 30 mins
            httponly=True,
            samesite="lax",
            secure=False # for local dev only
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            max_age= REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60, # 7 days
            httponly=True,
            samesite="lax",
            secure=False # for local dev only
        )

        # now return the response object
        return response
    
    def refresh(self, request: Request):
        refresh_token = request.cookies.get("refresh_token")

        if not refresh_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token not found"
            )
        
        db_token = self.repo.get_valid_refresh_token(refresh_token)

        if not db_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
        
        user = self.repo.get_user_by_id(db_token.user_id)

        access_token = generate_access_token({
            "id": user.id,
            "email": user.email
        })

        response = JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "New access token generated successfully",
                "user": UserPublic.model_validate({
                    "id": user.id,
                    "email": user.email,
                    "is_verified": user.is_verified
                }).model_dump()
            }
        )

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            samesite="lax",
            secure=False,
            max_age=30 * 60
        )

        return response
        
    def logout(self, request: Request):

        refresh_token = request.cookies.get("refresh_token")

        self.repo.delete_refresh_token(refresh_token)

        response = JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "User logged out successfully"
            }
        )

        response.delete_cookie(key="access_token")
        response.delete_cookie(key="refresh_token")

        return response

        
    def delete_account(self, request: Request):
        refresh_token = request.cookies.get("refresh_token")

        refresh_token = self.repo.get_valid_refresh_token(refresh_token)

        if not refresh_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )

        self.repo.delete_refresh_token(refresh_token.token)
        self.repo.delete_user(refresh_token.user_id)

        response = JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "Account deleted successfully"
            }
        )

        response.delete_cookie(key="access_token")
        response.delete_cookie(key="refresh_token")

        return response

    
    async def send_email(self, data: EmailSchema):
        # first check if user exist by email
        user = self.repo.get_user_by_email(data.email)
        # if noe exist then raise exception
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        # check if user is already verified or not, if verified, raise exception
        if user.is_verified:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already verified"
            )
        # if user exist and not verified then invoke send_email service main logic
        key = f"email_resend_lock:{data.email}"
        if rc.exists(key):
            ttl = rc.ttl(key) 
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Too many requests, please try again later in {ttl} seconds"
            )
        
        token = generate_email_verification_token(data.email)
        res = await send_email_verification_link(data, token, CLIENT_BASE_URL)
        if not res:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error sending email"
            )
        rc.set(key, "active", ex=60)
        return res


    def verify_email(self, token: str):
        payload = verify_email_verification_token(token)
        # ensure token type:
        if (payload.get("type") != "email_verification"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid token type"
            )
        
        email = payload.get("sub")

        if not email: 
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid token payload"
            )
        
        user = self.repo.get_user_by_email(email)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        print("user from confirm email: ", user.is_verified)
        
        if user.is_verified:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already verified"
            )
    
        self.repo.mark_email_verified(user.id)

        return {
            "success": True,
            "message": "Email verified successfully"
        }

        



    