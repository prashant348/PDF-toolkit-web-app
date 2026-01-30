from fastapi import APIRouter, Depends, Request
from core.session import get_db
from sqlalchemy.orm import Session
from auth.service import AuthService
from auth.repository import AuthRepository
from auth.schemas import RegistrationSchema, LoginSchema
from auth.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post(path="/register", status_code=201)
def register(data: RegistrationSchema, db: Session = Depends(get_db)):
    return AuthService(AuthRepository(db)).register(data.email, data.password)

@router.post(path="/login", status_code=201)
def login(data: LoginSchema, db: Session = Depends(get_db)):
    return AuthService(AuthRepository(db)).login(data.email, data.password)

@router.post(path="/refresh", status_code=200)
def refresh(request: Request, db: Session = Depends(get_db)):
    return AuthService(AuthRepository(db)).refresh(request)

@router.post(path="/logout", status_code=200)
def logout(request: Request, db: Session = Depends(get_db)):
    return AuthService(AuthRepository(db)).logout(request)

@router.delete(path="/delete-account", status_code=200)
def delete_account(request: Request, db: Session = Depends(get_db)):
    return AuthService(AuthRepository(db)).delete_account(request)

@router.get(path="/me", status_code=200)
def me(request: Request, db: Session = Depends(get_db)):
    user = get_current_user(AuthRepository(db), request)
    return {
        "id": user.id,
        "email": user.email
    } 
