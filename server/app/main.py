import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from fastapi import FastAPI
from app.routes.client import router as client_router
from app.routes.admin import router as admin_router
from app.routes.service import router as service_router
from app.routes.client_project import router as client_project_router
from app.routes.blog import router as blog_router
from app.routes.portfolio_project import router as portfolio_project_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.contact import router as contact_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"],  
)

app.include_router(admin_router, prefix="/admins", tags=["Admins"])
app.include_router(service_router, prefix="/services", tags=["Services"])
app.include_router(blog_router, prefix="/blogs", tags=["Blogs"])
app.include_router(client_router, prefix="/clients", tags=["Clients"])
app.include_router(client_project_router, prefix="/client_projects", tags=["Client Projects"])
app.include_router(contact_router, prefix="/contact", tags=["contact"])
app.include_router(portfolio_project_router, prefix="/portfolio_projects", tags=["Portfolio Projects"])

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}
