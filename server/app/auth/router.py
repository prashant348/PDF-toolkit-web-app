from fastapi import APIRouter, Depends, Request, Body, BackgroundTasks, HTTPException, status
from auth.service import AuthService
from auth.schemas import RegistrationSchema, LoginSchema, EmailSchema, TokenSchema
from auth.helpers import get_auth_service, get_current_user_helper
from auth.dependencies import csrf_dependency

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

service: AuthService = Depends(get_auth_service)

@router.post(path="/register", status_code=201)
def register(data: RegistrationSchema, service: AuthService = service, background_tasks: BackgroundTasks = BackgroundTasks()):
    result = service.register(data.email, data.password, background_tasks)
    return result

@router.post(path="/login", status_code=201)
def login(data: LoginSchema, service: AuthService = service):
    result = service.login(data.email, data.password)
    return result

@router.post(path="/refresh", status_code=200)
def refresh(request: Request, service: AuthService = service):
    result = service.refresh(request)
    return result

@router.post(path="/logout", status_code=200, dependencies=[Depends(csrf_dependency)])
def logout(request: Request, service: AuthService = service):
    result = service.logout(request)
    return result 

@router.delete(path="/delete-account", status_code=200, dependencies=[Depends(csrf_dependency)])
def delete_account(request: Request, service: AuthService = service):
    result = service.delete_account(request)
    return result  

@router.post(path="/send-email", status_code=200)
async def send_email(data: EmailSchema = Body(...), service: AuthService = service):
    result = await service.send_email(data)
    return result

@router.post(path="/verify-email", status_code=200)
def verify_email(data: TokenSchema = Body(...), service: AuthService = service):
    result = service.verify_email(data.token)
    return result

@router.get(path="/me", status_code=200)
def me(user: dict = Depends(get_current_user_helper)):
    return {
        "id": user.id,
        "email": user.email,
        "is_verified": user.is_verified
    } 
