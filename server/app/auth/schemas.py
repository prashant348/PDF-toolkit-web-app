from pydantic import BaseModel, EmailStr

class UserSchema(BaseModel):
    id: str
    email: str

class RegistrationSchema(BaseModel):
    email: str
    password: str

class LoginSchema(BaseModel):
    email: str
    password: str

class EmailSchema(BaseModel):
    email: EmailStr

class UserPublic(BaseModel):
    id: str
    email: str
    is_verified: bool