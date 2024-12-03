from fastapi import HTTPException
from app.database import get_db_connection 
from app.schemas.portfolio_project import PortfolioProjectCreate, PortfolioProjectUpdate
import json

def create_portfolio_project(portfolio_project: PortfolioProjectCreate):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        query = """
        INSERT INTO portfolio_projects (title, description, content, site_url)
        VALUES (%s, %s, %s, %s)
        """
        
        cursor.execute(query, (
            portfolio_project.title,
            portfolio_project.description,
            portfolio_project.content,
            portfolio_project.site_url
        ))

        connection.commit()

        project_id = cursor.lastrowid

        if portfolio_project.images:
            image_query = """
            INSERT INTO project_images (project_id, image_url)
            VALUES (%s, %s)
            """
            for image in portfolio_project.images:
                cursor.execute(image_query, (project_id, image))
            
            connection.commit()

        if portfolio_project.technologies:
            tech_query = """
            INSERT INTO project_technologies (project_id, technology_name)
            VALUES (%s, %s)
            """
            for technology in portfolio_project.technologies:
                cursor.execute(tech_query, (project_id, technology))
            
            connection.commit()

        return {
            "message": "Portfolio project created successfully",
            "portfolio_project": {
                "id": project_id,
                "title": portfolio_project.title,
                "description": portfolio_project.description,
                "images": portfolio_project.images,
                "content": portfolio_project.content,
                "technologies": portfolio_project.technologies,
                "site_url": portfolio_project.site_url
            }
        }

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating Portfolio project: {str(e)}")
    finally:
        connection.close()



def get_portfolio_project_by_id(project_id: int):

    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        query = """
        SELECT id, title, description, content, site_url FROM portfolio_projects WHERE id = %s
        """
        cursor.execute(query, (project_id,))
        portfolio_project = cursor.fetchone()

        if portfolio_project is None:
            raise HTTPException(status_code=404, detail="portfolio_project not found")

        image_query = """
        SELECT image_url FROM project_images WHERE project_id = %s
        """
        cursor.execute(image_query, (project_id,))
        images = [row[0] for row in cursor.fetchall()]

        tech_query = """
        SELECT technology_name FROM project_technologies WHERE project_id = %s
        """
        cursor.execute(tech_query, (project_id,))
        technologies = [row[0] for row in cursor.fetchall()]

        return {
            "id": portfolio_project[0],
            "title": portfolio_project[1],
            "description": portfolio_project[2],
            "content": portfolio_project[3],
            "images": images,
            "technologies": technologies,
            "site_url":portfolio_project[4]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving portfolio project: {str(e)}")
    finally:
        connection.close()


def update_portfolio_project(project_id: int, portfolio_project: PortfolioProjectUpdate):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        set_fields = []
        params = []

        if portfolio_project.title is not None:
            set_fields.append("title = %s")
            params.append(portfolio_project.title)
        if portfolio_project.description is not None:
            set_fields.append("description = %s")
            params.append(portfolio_project.description)
        if portfolio_project.content is not None:
            set_fields.append("content = %s")
            params.append(portfolio_project.content)
        if portfolio_project.site_url is not None:
            set_fields.append("site_url = %s")
            params.append(portfolio_project.site_url)

        params.append(project_id)  

        update_query = f"""
        UPDATE portfolio_projects SET {', '.join(set_fields)} WHERE id = %s
        """

        cursor.execute(update_query, tuple(params))  
        connection.commit()

        if portfolio_project.images is not None:
            delete_image_query = """
            DELETE FROM project_images WHERE project_id = %s
            """
            cursor.execute(delete_image_query, (project_id,))
            connection.commit()

            image_query = """
            INSERT INTO project_images (project_id, image_url) VALUES (%s, %s)
            """
            for image in portfolio_project.images:
                cursor.execute(image_query, (project_id, image))
            connection.commit()

        if portfolio_project.technologies is not None:
            delete_tech_query = """
            DELETE FROM project_technologies WHERE project_id = %s
            """
            cursor.execute(delete_tech_query, (project_id,))
            connection.commit()

            tech_query = """
            INSERT INTO project_technologies (project_id, technology_name) VALUES (%s, %s)
            """
            for technology in portfolio_project.technologies:
                cursor.execute(tech_query, (project_id, technology))
            connection.commit()

        return {
            "message": "portfolio project updated successfully",
            "portfolio_project": {
                "id": project_id,
                "title": portfolio_project.title if portfolio_project.title is not None else "Not provided",
                "description": portfolio_project.description if portfolio_project.description is not None else "Not provided",
                "content": portfolio_project.content if portfolio_project.content is not None else "Not provided",
                "site_url": portfolio_project.site_url if portfolio_project.site_url is not None else "Not provided",
                "images": portfolio_project.images if portfolio_project.images is not None else [],
                "technologies": portfolio_project.technologies if portfolio_project.technologies is not None else []
            }
        }

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating portfolio project: {str(e)}")
    finally:
        connection.close()


def delete_portfolio_project(project_id: int):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        delete_image_query = """
        DELETE FROM project_images WHERE project_id = %s
        """
        cursor.execute(delete_image_query, (project_id,))
        connection.commit()

        delete_tech_query = """
        DELETE FROM project_technologies WHERE project_id = %s
        """
        cursor.execute(delete_tech_query, (project_id,))
        connection.commit()

        delete_portfolio_project_query = """
        DELETE FROM portfolio_projects WHERE id = %s
        """
        cursor.execute(delete_portfolio_project_query, (project_id,))
        connection.commit()

        return {"message": "portfolio project deleted successfully"}

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting portfolio project: {str(e)}")
    finally:
        connection.close()


def index_portfolio_project():

    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        query = "SELECT id, title, description, content, site_url FROM portfolio_projects"
        cursor.execute(query)
        portfolio_projects = cursor.fetchall()

        portfolio_projects_data = []
        for portfolio_project in portfolio_projects:
            project_id = portfolio_project[0]

            image_query = """
            SELECT image_url FROM project_images WHERE project_id = %s
            """
            cursor.execute(image_query, (project_id,))
            images = [row[0] for row in cursor.fetchall()]

            tech_query = """
            SELECT technology_name FROM project_technologies WHERE project_id = %s
            """
            cursor.execute(tech_query, (project_id,))
            technologies = [row[0] for row in cursor.fetchall()]

            portfolio_projects_data.append({
                "id": portfolio_project[0],
                "title": portfolio_project[1],
                "description": portfolio_project[2],
                "content": portfolio_project[3],
                "images": images,
                "technologies": technologies,
                "site_url": portfolio_project[4]
            })

        return portfolio_projects_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching portfolio projects: {str(e)}")
    finally:
        connection.close()



