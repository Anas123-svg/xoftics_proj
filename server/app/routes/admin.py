from fastapi import APIRouter, HTTPException, Depends
from app.schemas.admin import AdminCreate, AdminUpdate,LoginRequest
from fastapi import Depends, HTTPException, Header

from app.controllers.admin_controller import (
    create_admin,
    login,
    get_admin_by_token,
    get_all_admins,
    get_admin_by_id,
    #update_client,
    delete_admin,
)

router = APIRouter()

@router.post("/create", summary="Create a new admin")
def create(admin: AdminCreate):
    return create_admin(admin)

@router.post("/login", summary="Login a admin and get token")
def login_admin(request: LoginRequest):
    return login(request.email, request.password)

@router.get("/profile", summary="Get admin details by token")
def get_profile(Authorization: str = Header(...)):
    token = Authorization.split("Bearer ")[-1]  # Extract the token part
    return get_admin_by_token(token)

@router.get("/", summary="Get all admins")
def get_clients():
    return get_all_admins()

@router.get("/{admin_id}", summary="Get a client by ID")
def get_client(admin_id: int):
    return get_admin_by_id(admin_id)

#@router.put("/{client_id}", summary="Update client details")
#def update(client_id: int, client: ClientUpdate):
 #   return update_client(client_id, client)

@router.delete("/{admin_id}", summary="Delete a client")
def delete(admin_id: int):
    return delete_admin(admin_id)
