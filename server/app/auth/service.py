from sqlalchemy.orm import Session
from auth.repository import AuthRepository
from auth.utils import hash_password, normalized_email
from fastapi.responses import JSONResponse

class AuthService:
    def __init__(self, repo: AuthRepository) -> None:
        self.repo = repo

    def register(self, db: Session, email: str, password: str):
        try:
            email = normalized_email(email)
            password = hash_password(password)
            # check if user already exists by user email
            user = self.repo.getUserByEmail(db, email)
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
            user = self.repo.create_user(db, email, password)

            # if user is not created then return error response
            if not user:
                raise Exception("Error creating user")
            
            # if user is created then return success response
            return {
                "success": True,
                "msg": "User created successfully",
                "user": user
            }
        
        except Exception as e:
            print(e) # for debugging purposes only
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "msg": "Error creating user"
                }
            )

    