from bcrypt import hashpw, gensalt, checkpw

SALT_ROUNDS=12
SALT = gensalt(rounds=SALT_ROUNDS)

def hash_password(password: str) -> str:
    return hashpw(password.encode('utf-8'), SALT)

def validate_password(password: str, hashed_password: str) -> bool:
    return checkpw(password.encode('utf-8'), hashed_password)

def normalized_email(email: str) -> str:
    return email.lower().strip()