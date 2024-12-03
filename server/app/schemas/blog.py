from pydantic import BaseModel, Field
from typing import Optional, List

class BlogCreate(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    images: Optional[List[str]] = None  
    content: Optional[str] = None
    
class BlogUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    images: Optional[List[str]] = None
    content: Optional[str] = None

class BlogResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    images: Optional[List[str]]
    content: Optional[str]
    
    class Config:
        orm_mode = True
