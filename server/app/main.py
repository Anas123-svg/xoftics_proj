import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from app.routes.client import router as client_router
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))


app = FastAPI()

app.include_router(client_router, prefix="/clients", tags=["Clients"])

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}
