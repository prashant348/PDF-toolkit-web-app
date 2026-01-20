from pydantic import BaseModel

class UserSchema(BaseModel):
    id: str
    email: str

class RegistrationSchema(BaseModel):
    email: str
    password: str

class LoginSchema(BaseModel):
    email: str
    password: str

