from sqlalchemy.orm import Session
from auth.repository import AuthRepository
from auth.utils import validate_password, generate_access_token
from fastapi import Depends
from core.session import get_db

# repo = AuthRepository(db=Depends(get_db))

def authenticate_user(repo: AuthRepository, email: str, password: str) -> str | bool:

    user = repo.getUserByEmail(email)

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

