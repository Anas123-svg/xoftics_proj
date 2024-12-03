from pydantic import BaseModel, Field
from typing import Optional, List
from decimal import Decimal
from datetime import datetime

class ClientProjectCreate(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    details: Optional[str] = None
    budget: Optional[Decimal] = None
    deadline: Optional[str] = Field(None, max_length=255)
    status: Optional[str] = Field(None, max_length=50)
    update_by_admin: Optional[str] = None
    progress: Optional[int] = Field(None, ge=0, le=100)

class ClientProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    budget: Optional[Decimal] = None
    deadline: Optional[str] = Field(None, max_length=255)
    status: Optional[str] = Field(None, max_length=50)
    update_by_admin: Optional[str] = None
    progress: Optional[int] = Field(None, ge=0, le=100)  
    
    
class ClientProjectResponse(BaseModel):
    id: int
    client_id: int
    title: str
    description: Optional[str] = None
    details: Optional[str] = None
    budget: Decimal
    deadline: str
    status: str
    update_by_admin: Optional[str] = None
    progress: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True  
