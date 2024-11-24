from pydantic import BaseModel, Field
from typing import Optional, List

class PortfolioProjectCreate(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    images: Optional[List[str]] = None  
    content: Optional[str] = None
    technologies: Optional[List[str]] = None
    site_url: Optional[str] = None


class PortfolioProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    images: Optional[List[str]] = None
    content: Optional[str] = None
    technologies: Optional[List[str]] = None
    site_url: Optional[str] = None


class PortfolioProjectResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    images: Optional[List[str]]
    content: Optional[str]
    technologies: Optional[List[str]]
    site_url: Optional[str] = None


    class Config:
        orm_mode = True
