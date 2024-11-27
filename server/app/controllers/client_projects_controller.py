from fastapi import HTTPException
from app.database import get_db_connection 
from app.schemas.client_project import ClientProjectCreate, ClientProjectUpdate
import json

from fastapi import HTTPException
from app.database import get_db_connection
from app.schemas.client_project import ClientProjectCreate
import jwt

def create_client_project(client_project: ClientProjectCreate, token: str):
    connection = get_db_connection()
    secret_key = "your_secret_key"
    algorithm = "HS256"

    if not secret_key or not algorithm:
        raise HTTPException(status_code=500, detail="Secret key or algorithm not configured.")

    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        client_id = payload.get("id")

        if not client_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        cursor = connection.cursor()
        query = """
        INSERT INTO client_projects (client_id, title, description, budget, deadline, status, update_by_admin, progress)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            client_id,
            client_project.title,
            client_project.description,
            client_project.budget,
            client_project.deadline,
            client_project.status,
            client_project.update_by_admin,
            client_project.progress
        ))

        connection.commit()
        project_id = cursor.lastrowid

        return {
            "message": "Client project created successfully",
            "client_project": {
                "id": project_id,
                "client_id": client_id,
                "title": client_project.title,
                "description": client_project.description,
                "budget": client_project.budget,
                "deadline": client_project.deadline,
                "status": client_project.status,
                "update_by_admin": client_project.update_by_admin,
                "progress": client_project.progress
            }
        }

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating client project: {str(e)}")
    finally:
        connection.close()


def get_all_projects():
    connection = get_db_connection()
    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM client_projects"
        cursor.execute(query)
        projects = cursor.fetchall()
        
        return projects
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching projects: {str(e)}")
    finally:
        connection.close()



def get_projects_by_client(token: str):
    connection = get_db_connection()
    secret_key = "your_secret_key"
    algorithm = "HS256"

    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        client_id = payload.get("id")

        if not client_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM client_projects WHERE client_id = %s"
        cursor.execute(query, (client_id,))
        projects = cursor.fetchall()

        return projects

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching client projects: {str(e)}")
    finally:
        connection.close()


def update_project(project_id: int, project_update: ClientProjectUpdate):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        fields = []
        values = []
        for key, value in project_update.dict(exclude_none=True).items():
            fields.append(f"{key} = %s")
            values.append(value)

        if not fields:
            raise HTTPException(status_code=400, detail="No fields provided for update")

        query = f"UPDATE client_projects SET {', '.join(fields)} WHERE id = %s"
        values.append(project_id)

        cursor.execute(query, values)
        connection.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Project not found")

        return {"message": "Project updated successfully"}

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating project: {str(e)}")
    finally:
        connection.close()


def delete_project(project_id: int):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        query = "DELETE FROM client_projects WHERE id = %s"
        cursor.execute(query, (project_id,))
        connection.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Project not found")

        return {"message": "Project deleted successfully"}

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting project: {str(e)}")
    finally:
        connection.close()
