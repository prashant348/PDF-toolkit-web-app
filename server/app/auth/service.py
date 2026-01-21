from sqlalchemy.orm import Session
from auth.repository import AuthRepository
from auth.utils import hash_password, normalized_email
from auth.dependencies import authenticate_user
from fastapi.responses import JSONResponse, Response


class AuthService:
    def __init__(self, repo: AuthRepository) -> None:
        self.repo = repo

    def register(self, email: str, password: str):
        try:
            email = normalized_email(email)
            password = hash_password(password)
            # check if user already exists by user email
            user = self.repo.getUserByEmail(email)
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
            token = authenticate_user(self.repo, email, password)
            # if user is not authenticated then return error response 
            if not token:
                return JSONResponse(
                    status_code=401,
                    content={
                        "success": False,
                        "msg": "Invalid credentials"
                    }
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
                value=token,
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


    