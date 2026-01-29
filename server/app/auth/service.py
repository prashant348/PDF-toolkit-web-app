from auth.repository import AuthRepository
from auth.utils import hash_password, normalized_email, generate_access_token
from auth.dependencies import authenticate_user
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta, timezone
from auth.utils import generate_refresh_token
from fastapi import Request

REFRESH_TOKEN_EXPIRE_DAYS = 7 

class AuthService:
    def __init__(self, repo: AuthRepository) -> None:
        self.repo = repo

    def register(self, email: str, password: str):
        try:
            email = normalized_email(email)
            password = hash_password(password)
            # check if user already exists by user email
            user = self.repo.get_user_by_email(email)
            # if user already exists then return error response
            if user:
                return JSONResponse(
                    status_code=400,
                    content={
                        "success": False,
                        "msg": "User already exists"
                    }
                )
            # if user does not exist then create user
            user = self.repo.create_user(email, password)

            # if user is not created then return error response
            if not user:
                raise Exception("Error creating user")
            
            # if user is created then return success response
            return JSONResponse(
                status_code=201,
                content={
                    "success": True,
                    "msg": "User created successfully"
                }
            )
        
        except Exception as e:
            print("Register Error: ", e) # for debugging purposes only
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "msg": "Error creating user"
                }
            )
        
    def login(self, email: str, password: str):
        try:
            email = normalized_email(email)
            # if user is authenticated then return jwt generated access token
            access_token = authenticate_user(self.repo, email, password)
            # if user is not authenticated then return error response 
            if not access_token:
                return JSONResponse(
                    status_code=401,
                    content={
                        "success": False,
                        "msg": "Invalid credentials"
                    }
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
                    "msg": "User logged in successfully"
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
            
        except Exception as e:
            print("Login Error: ", e)
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "msg": "Error logging in user"
                }
            )
    
    def refresh(self, request: Request):
        try:
            refresh_token = request.cookies.get("refresh_token")

            if not refresh_token:
                return JSONResponse(
                    status_code=401,
                    content={
                        "success": False,
                        "msg": "Refresh token not found"
                    }
                )
            
            db_token = self.repo.get_valid_refresh_token(refresh_token)

            if not db_token:
                return JSONResponse(
                    status_code=401,
                    content={
                        "success": False,
                        "msg": "Invalid refresh token"
                    }
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
                    "user": {
                        "id": user.id,
                        "email": user.email
                    }
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

        except Exception as e:
            print("Refresh Error: ", e)
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "msg": "Error refreshing token"
                }
            ) 
        
    def logout(self, request: Request):
        try:
            access_token = request.cookies.get("access_token") 
            refresh_token = request.cookies.get("refresh_token")

            self.repo.delete_refresh_token(refresh_token)

            response = JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "msg": "User logged out successfully"
                }
            )

            response.delete_cookie(key="access_token")
            response.delete_cookie(key="refresh_token")

            return response
        except Exception as e:
            print("Logout Error: ", e)
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "msg": "Error logging out user"
                }
            )

            
        



    