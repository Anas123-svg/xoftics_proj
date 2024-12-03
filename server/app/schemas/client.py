from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

class ClientCreate(BaseModel):
    name: str = Field(..., max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)
    company_name: Optional[str] = None
    phone: str = Field(..., max_length=15)
    address: Optional[str] = None
    profile_image: Optional[str] = None  


class ClientUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=100)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8)  
    company_name: Optional[str] = None
    phone: Optional[str] = Field(None, max_length=15)
    address: Optional[str] = None
    profile_image: Optional[str] = None

class ClientResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    company_name: Optional[str]
    phone: str
    address: Optional[str]
    profile_image: Optional[str]  

    class Config:
        orm_mode = True
