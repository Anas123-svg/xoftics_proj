from fastapi import APIRouter, HTTPException, Depends
from app.schemas.blog import BlogCreate, BlogUpdate
from fastapi import Depends, HTTPException, Header



from app.controllers.blog_controller import (
    create_blog,
    index_blogs,
    get_blog_by_id,
    update_blog,
    delete_blog,
)

router = APIRouter()

@router.post("/create", summary="Create a new blog")
def create(blog: BlogCreate):
    return create_blog(blog)



@router.get("/{blog_id}", response_model=dict)
def get_blog_route(blog_id: int):
    try:
        return get_blog_by_id(blog_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving blog: {str(e)}")


@router.put("/{blog_id}", response_model=dict)
def update_blog_route(blog_id: int, blog: BlogUpdate):
    try:
        return update_blog(blog_id, blog)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating blog: {str(e)}")


@router.delete("/{blog_id}", response_model=dict)
def delete_blog_route(blog_id: int):
    try:
        return delete_blog(blog_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting blog: {str(e)}")


@router.get("/", response_model=list)
def index_blogs_route():
    try:
        return index_blogs()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching blogs: {str(e)}")
