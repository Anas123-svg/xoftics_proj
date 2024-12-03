from fastapi import APIRouter, HTTPException, Depends, Header
from typing import List
from app.schemas.client_project import ClientProjectCreate, ClientProjectUpdate
from app.controllers.client_projects_controller import (
    create_client_project,
    get_all_projects,
    get_projects_by_client,
    update_project,
    delete_project,
)

router = APIRouter()

@router.post("/create", response_model=dict)
def create_project(client_project: ClientProjectCreate, Authorization: str = Header(...)):
    print("Token received:", Authorization)
    token = Authorization.split("Bearer ")[-1] 
    try:
        return create_client_project(client_project, token)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/projects", response_model=List[dict])
def get_all_projects_route():

    try:
        return get_all_projects()
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/client", response_model=List[dict])
def get_projects_by_client_route(Authorization: str = Header(...)):
    token = Authorization.split("Bearer ")[-1] 
    try:
        return get_projects_by_client(token)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{project_id}", response_model=dict)
def update_client_project_route(project_id: int, project_update: ClientProjectUpdate):

    try:
        return update_project(project_id, project_update)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/projects/{project_id}", response_model=dict)
def delete_client_project_route(project_id: int):

    try:
        return delete_project(project_id)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
