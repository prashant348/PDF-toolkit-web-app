from fastapi import APIRouter, Depends
from core.session import get_db
from sqlalchemy.orm import Session
from auth.service import AuthService
from auth.repository import AuthRepository
from auth.schemas import RegistrationSchema, LoginSchema
from fastapi.responses import Response

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