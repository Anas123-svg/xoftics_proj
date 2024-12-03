from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from pydantic import BaseModel



class LoginRequest(BaseModel):
    email: str
    password: str

class AdminCreate(BaseModel):
    name: str = Field(..., max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)
    phone: str = Field(None, max_length=15)
    address: Optional[str] = None
    profile_image: Optional[str] = None
    role: Optional[str] = None
    
    
class AdminUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=100)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8)  
    phone: Optional[str] = Field(None, max_length=15)
    address: Optional[str] = None
    profile_image: Optional[str] = None
    role : Optional[str] = None
    
class AdminResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: Optional[str]
    phone: str
    address: Optional[str]
    profile_image: Optional[str]  

    class Config:
        orm_mode = True
