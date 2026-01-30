from bcrypt import hashpw, gensalt, checkpw
from core.config import JWT_SECRET, JWT_EXPIRE_MINUTES
from jose import jwt
from datetime import datetime, timedelta, timezone
import secrets

SALT_ROUNDS=12
SALT = gensalt(rounds=SALT_ROUNDS)
ALGORITHMS = ["HS256"]

def hash_password(password: str) -> str:
    return hashpw(password.encode('utf-8'), SALT).decode("utf-8")

def validate_password(password: str, hashed_password: str) -> bool:
    return checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def normalized_email(email: str) -> str:
    return email.lower().strip()

def generate_access_token(user_data: dict["id": str, "email": str ]) -> str:
    to_encode = user_data.copy() # returns a shallow copy of dictionary
    expire = datetime.now(timezone.utc) + timedelta(minutes=float(JWT_EXPIRE_MINUTES))
    to_encode.update({ "exp": expire })
    return jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHMS[0])
    
def verify_access_token(token: str):
    return jwt.decode(token, JWT_SECRET, algorithms=ALGORITHMS[0])
 
def generate_refresh_token() -> str:
    return secrets.token_hex(64)

def generate_email_verification_token(email: str) -> str:

    expire = datetime.now(timezone.utc) + timedelta(hours=24)

    payload = {
        "sub": email,  # 'sub' is the standard field for the subject
        "exp": expire,   # 'exp' is the standard expiration field
        "iat": datetime.now(timezone.utc),  # 'iat' marks when it was issued
        "type": "email_verification"  # Useful to distinguish from login tokens
    }

    return jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHMS[0])

def verify_email_verification_token(token: str):
    return jwt.decode(token, JWT_SECRET, algorithms=ALGORITHMS[0])