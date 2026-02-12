from fastapi import Depends, Request
from sqlalchemy.orm import Session
from core.session import get_db
from auth.service import AuthService
from auth.repository import AuthRepository
from auth.dependencies import get_current_user

def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    return AuthService(AuthRepository(db))

def get_current_user_helper(request: Request, db: Session = Depends(get_db)):
    repo = AuthRepository(db)
    return get_current_user(repo, request)