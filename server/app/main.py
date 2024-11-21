from fastapi import FastAPI
from app.routes.client import router as client_router

app = FastAPI()

app.include_router(client_router, prefix="/clients", tags=["Clients"])

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}
