from fastapi import HTTPException
from app.database import get_db_connection 
from app.schemas.service import ServiceCreate, ServiceUpdate
import json

def create_service(service: ServiceCreate):
    """
    Create a new service in the database, and associate images and technologies
    in their respective tables.

    Args:
        service (ServiceCreate): The data required to create the service.

    Returns:
        dict: Confirmation message with the created service details.
    """
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        query = """
        INSERT INTO services (title, description, content)
        VALUES (%s, %s, %s)
        """
        
        cursor.execute(query, (
            service.title,
            service.description,
            service.content
        ))

        connection.commit()

        service_id = cursor.lastrowid

        if service.images:
            image_query = """
            INSERT INTO service_images (service_id, image_url)
            VALUES (%s, %s)
            """
            for image in service.images:
                cursor.execute(image_query, (service_id, image))
            
            connection.commit()

        if service.technologies:
            tech_query = """
            INSERT INTO service_technologies (service_id, technology_name)
            VALUES (%s, %s)
            """
            for technology in service.technologies:
                cursor.execute(tech_query, (service_id, technology))
            
            connection.commit()

        return {
            "message": "Service created successfully",
            "service": {
                "id": service_id,
                "title": service.title,
                "description": service.description,
                "images": service.images,
                "content": service.content,
                "technologies": service.technologies
            }
        }

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating service: {str(e)}")
    finally:
        connection.close()



def get_service_by_id(service_id: int):

    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        query = """
        SELECT id, title, description, content FROM services WHERE id = %s
        """
        cursor.execute(query, (service_id,))
        service = cursor.fetchone()

        if service is None:
            raise HTTPException(status_code=404, detail="Service not found")

        image_query = """
        SELECT image_url FROM service_images WHERE service_id = %s
        """
        cursor.execute(image_query, (service_id,))
        images = [row[0] for row in cursor.fetchall()]

        tech_query = """
        SELECT technology_name FROM service_technologies WHERE service_id = %s
        """
        cursor.execute(tech_query, (service_id,))
        technologies = [row[0] for row in cursor.fetchall()]

        return {
            "id": service[0],
            "title": service[1],
            "description": service[2],
            "content": service[3],
            "images": images,
            "technologies": technologies
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving service: {str(e)}")
    finally:
        connection.close()


def update_service(service_id: int, service: ServiceUpdate):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        set_fields = []
        params = []

        if service.title is not None:
            set_fields.append("title = %s")
            params.append(service.title)
        if service.description is not None:
            set_fields.append("description = %s")
            params.append(service.description)
        if service.content is not None:
            set_fields.append("content = %s")
            params.append(service.content)

        params.append(service_id)  

        update_query = f"""
        UPDATE services SET {', '.join(set_fields)} WHERE id = %s
        """

        cursor.execute(update_query, tuple(params))  
        connection.commit()

        if service.images is not None:
            delete_image_query = """
            DELETE FROM service_images WHERE service_id = %s
            """
            cursor.execute(delete_image_query, (service_id,))
            connection.commit()

            image_query = """
            INSERT INTO service_images (service_id, image_url) VALUES (%s, %s)
            """
            for image in service.images:
                cursor.execute(image_query, (service_id, image))
            connection.commit()

        if service.technologies is not None:
            delete_tech_query = """
            DELETE FROM service_technologies WHERE service_id = %s
            """
            cursor.execute(delete_tech_query, (service_id,))
            connection.commit()

            tech_query = """
            INSERT INTO service_technologies (service_id, technology_name) VALUES (%s, %s)
            """
            for technology in service.technologies:
                cursor.execute(tech_query, (service_id, technology))
            connection.commit()

        return {
            "message": "Service updated successfully",
            "service": {
                "id": service_id,
                "title": service.title if service.title is not None else "Not provided",
                "description": service.description if service.description is not None else "Not provided",
                "content": service.content if service.content is not None else "Not provided",
                "images": service.images if service.images is not None else [],
                "technologies": service.technologies if service.technologies is not None else []
            }
        }

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating service: {str(e)}")
    finally:
        connection.close()


def delete_service(service_id: int):
    """
    Delete a service by its ID from the database.
    """
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        delete_image_query = """
        DELETE FROM service_images WHERE service_id = %s
        """
        cursor.execute(delete_image_query, (service_id,))
        connection.commit()

        delete_tech_query = """
        DELETE FROM service_technologies WHERE service_id = %s
        """
        cursor.execute(delete_tech_query, (service_id,))
        connection.commit()

        delete_service_query = """
        DELETE FROM services WHERE id = %s
        """
        cursor.execute(delete_service_query, (service_id,))
        connection.commit()

        return {"message": "Service deleted successfully"}

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting service: {str(e)}")
    finally:
        connection.close()


def index_services():
    """
    Get all services from the database.
    """
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        query = "SELECT id, title, description FROM services"
        cursor.execute(query)
        services = cursor.fetchall()

        services_data = []
        for service in services:
            service_id = service[0]

            image_query = """
            SELECT image_url FROM service_images WHERE service_id = %s
            """
            cursor.execute(image_query, (service_id,))
            images = [row[0] for row in cursor.fetchall()]

            tech_query = """
            SELECT technology_name FROM service_technologies WHERE service_id = %s
            """
            cursor.execute(tech_query, (service_id,))
            technologies = [row[0] for row in cursor.fetchall()]

            services_data.append({
                "id": service[0],
                "title": service[1],
                "description": service[2],
                "images": images,
                "technologies": technologies
            })

        return services_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching services: {str(e)}")
    finally:
        connection.close()



