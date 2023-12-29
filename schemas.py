from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str
    name: str

    class Config():
        orm_mode = True

class SignInSchema(BaseModel):
    username: str
    password: str

    class Config():
        orm_mode = True

class LogoutSchema(BaseModel):
    username:str