from dotenv import load_dotenv
import os

load_dotenv()

SQLALCHEMY_URL = os.getenv("SQLALCHEMY_URL")
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_EXPIRE_MINUTES = os.getenv("JWT_EXPIRE_MINUTES")

class Settings:
    SQLALCHEMY_URL = SQLALCHEMY_URL

settings = Settings()