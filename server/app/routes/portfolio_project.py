from fastapi import APIRouter, HTTPException, Depends
from app.schemas.portfolio_project import PortfolioProjectCreate, PortfolioProjectUpdate
from fastapi import Depends, HTTPException, Header



from app.controllers.portfolio_projects_controller import (
    create_portfolio_project,
    index_portfolio_project,
    get_portfolio_project_by_id,
    update_portfolio_project,
    delete_portfolio_project,
)

router = APIRouter()

@router.post("/create", summary="Create a new portfolio project")
def create(project: PortfolioProjectCreate):
    return create_portfolio_project(project)


@router.get("/{project_id}", response_model=dict)
def get_portfolio_project_route(project_id: int):
    try:
        return get_portfolio_project_by_id(project_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving portfolio project: {str(e)}")
    
    
    
@router.put("/{project_id}", response_model=dict)
def update_portfolio_project_route(project_id: int, project: PortfolioProjectUpdate):
    try:
        return update_portfolio_project(project_id, project)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating portfolio project: {str(e)}")


@router.delete("/{project_id}", response_model=dict)
def delete_portfolio_project_route(project_id: int):
    try:
        return delete_portfolio_project(project_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting portfolio project: {str(e)}")
    
    
@router.get("/", response_model=list)
def index_portfolio_project_route():
    try:
        return index_portfolio_project()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching portfolio projects: {str(e)}")
