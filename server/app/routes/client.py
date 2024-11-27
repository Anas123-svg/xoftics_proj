from fastapi import APIRouter, HTTPException, Depends
from app.schemas.client import ClientCreate, ClientUpdate,LoginRequest
from fastapi import Depends, HTTPException, Header

from app.controllers.client_controller import (
    create_client,
    login,
    get_client_by_token,
    get_all_clients,
    get_client_by_id,
    #update_client,
    delete_client,
)

router = APIRouter()

@router.post("/create", summary="Create a new client")
def create(client: ClientCreate):
    return create_client(client)

@router.post("/login", summary="Login a client and get token")
def login_client(request: LoginRequest):
    return login(request.email, request.password)

@router.get("/profile", summary="Get client details by token")
def get_profile(Authorization: str = Header(...)):
    token = Authorization.split("Bearer ")[-1] 
    return get_client_by_token(token)

@router.get("/", summary="Get all clients")
def get_clients():
    return get_all_clients()

@router.get("/{client_id}", summary="Get a client by ID")
def get_client(client_id: int):
    return get_client_by_id(client_id)

#@router.put("/{client_id}", summary="Update client details")
#def update(client_id: int, client: ClientUpdate):
 #   return update_client(client_id, client)

@router.delete("/{client_id}", summary="Delete a client")
def delete(client_id: int):
    return delete_client(client_id)
