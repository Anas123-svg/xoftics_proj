from fastapi import APIRouter, Depends
from app.schemas.client import ClientCreate, ClientUpdate
from app.controllers.client_controller import (
    create_client,
    get_all_clients,
    get_client_by_id,
    update_client,
    delete_client,
)

router = APIRouter()

@router.post("/", summary="Create a new client")
def create(client: ClientCreate):
    return create_client(client)

@router.get("/", summary="Get all clients")
def read_all():
    return get_all_clients()

@router.get("/{client_id}", summary="Get a client by ID")
def read(client_id: int):
    return get_client_by_id(client_id)

@router.put("/{client_id}", summary="Update a client")
def update(client_id: int, client: ClientUpdate):
    return update_client(client_id, client)

@router.delete("/{client_id}", summary="Delete a client")
def delete(client_id: int):
    return delete_client(client_id)
