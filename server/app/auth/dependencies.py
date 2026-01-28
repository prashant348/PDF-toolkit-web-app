from sqlalchemy.orm import Session
from auth.repository import AuthRepository
from auth.utils import validate_password, generate_access_token, verify_access_token
from fastapi import Depends, Request, HTTPException
from core.session import get_db
from jose import JWTError


# repo = AuthRepository(db=Depends(get_db))

def authenticate_user(repo: AuthRepository, email: str, password: str) -> str | bool:

    user = repo.get_user_by_email(email)

    if not user:
        return False
    
    hashed_password = user.password
    validate = validate_password(password, hashed_password)

    if not validate:
        return False
    
    token = generate_access_token({
        "id": user.id,
        "email": user.email
    })
    
    return token

def get_current_user(repo: AuthRepository, request: Request):
    token = request.cookies.get("access_token")
    
    if not token:
        raise HTTPException(
            status_code=401,
            detail="Not Authorized!"
        ) 

    try:
        payload = verify_access_token(token)
        user_id = payload.get("id")
    except JWTError:
        raise HTTPException(
            status_code=401, 
            detail="Invalid token"
        )
    
    user = repo.get_user_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    return user




