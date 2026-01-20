from sqlalchemy.orm import Session
from auth.models import User
from auth.schemas import UserSchema

class AuthRepository:
    def __init__(self) -> None:
        pass

    def create_user(
            self, 
            db: Session, 
            email: str, 
            password: str
        ) -> UserSchema | None:
        user = User(email=email, password=password)
        db.add(user)
        db.commit()
        db.refresh(user)

        return {
            "id": user.id,
            "email": user.email
        }

    
    def getUserByEmail(self, db: Session, email: str) -> UserSchema | None:
        user = db.query(User).filter(User.email == email).first()
        if (not user):
            return None
        return {
            "id": user.id,
            "email": user.email
        }
        