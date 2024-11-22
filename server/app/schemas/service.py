from pydantic import BaseModel, Field
from typing import Optional, List

class ServiceCreate(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    images: Optional[List[str]] = None  
    content: Optional[str] = None
    technologies: Optional[List[str]] = None 

class ServiceUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    images: Optional[List[str]] = None
    content: Optional[str] = None
    technologies: Optional[List[str]] = None

class ServiceResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    images: Optional[List[str]]
    content: Optional[str]
    technologies: Optional[List[str]]

    class Config:
        orm_mode = True
