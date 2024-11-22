from fastapi import APIRouter, HTTPException, Depends
from app.schemas.service import ServiceCreate, ServiceUpdate
from fastapi import Depends, HTTPException, Header



from app.controllers.service_controller import (
    create_service,
    index_services,
    get_service_by_id,
    update_service,
    delete_service,
)

router = APIRouter()

@router.post("/create", summary="Create a new service")
def create(service: ServiceCreate):
    return create_service(service)



@router.get("/{service_id}", response_model=dict)
def get_service_route(service_id: int):
    """
    Endpoint to get a service by its ID.
    """
    try:
        return get_service_by_id(service_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving service: {str(e)}")


@router.put("/{service_id}", response_model=dict)
def update_service_route(service_id: int, service: ServiceUpdate):
    """
    Endpoint to update an existing service by ID.
    """
    try:
        return update_service(service_id, service)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating service: {str(e)}")


@router.delete("/{service_id}", response_model=dict)
async def delete_service_route(service_id: int):
    """
    Endpoint to delete a service by ID.
    """
    try:
        return await delete_service(service_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting service: {str(e)}")


@router.get("/", response_model=list)
def index_services_route():
    """
    Endpoint to list all services.
    """
    try:
        return index_services()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching services: {str(e)}")
