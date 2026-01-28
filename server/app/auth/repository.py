from sqlalchemy.orm import Session
from auth.models import User

class AuthRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def create_user(
            self, 
            email: str, 
            password: str
        ) -> User | None:
        user = User(email=email, password=password)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user

    
    def get_user_by_email(self, email: str) -> User | None:
        user = self.db.query(User).filter(User.email == email).first()
        if (not user):
            return None
        return user

    def get_user_by_id(self, id: str) -> User | None:
        user = self.db.query(User).filter(User.id == id).first()
        if (not user):
            return None
        return user        