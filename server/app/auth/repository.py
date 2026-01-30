from sqlalchemy.orm import Session
from auth.models import User, RefreshToken
from datetime import datetime, timezone

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
    
    def create_refresh_token(self, user_id: str, token: str, expires_at: str) -> RefreshToken | None:
        refresh_token = RefreshToken(user_id=user_id, token=token, expires_at=expires_at)
        self.db.add(refresh_token)
        self.db.commit()
        self.db.refresh(refresh_token)

        return refresh_token
    
    def get_valid_refresh_token(self, token: str):
        return (
            self.db.query(RefreshToken)
            .filter(
                RefreshToken.token == token,
                RefreshToken.is_revoked == False,
                RefreshToken.expires_at > datetime.now(timezone.utc)
            )
            .first()
        )
    
    def delete_refresh_token(self,token: str):
        self.db.query(RefreshToken).filter(RefreshToken.token == token).delete()
        self.db.commit()

    def delete_user(self, user_id: str):
        self.db.query(User).filter(User.id == user_id).delete()
        self.db.commit()

    def mark_email_verified(self, user_id: str):
        self.db.query(User).filter(User.id == user_id).update({"is_verified": True})
        self.db.commit()