from pydantic import BaseModel, EmailStr


class MessageRequest(BaseModel):
    name: str
    email: EmailStr
    message: str
