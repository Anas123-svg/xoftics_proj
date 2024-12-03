from fastapi import HTTPException
from app.database import get_db_connection 
from app.schemas.blog import BlogCreate, BlogUpdate
import json


def create_blog(blog: BlogCreate):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        query = """
        INSERT INTO blogs (title, description, content)
        VALUES (%s, %s, %s)
        """
        
        cursor.execute(query, (
            blog.title,
            blog.description,
            blog.content
        ))

        connection.commit()

        blog_id = cursor.lastrowid

        if blog.images:
            image_query = """
            INSERT INTO blog_images (blog_id, image_url)
            VALUES (%s, %s)
            """
            for image in blog.images:
                cursor.execute(image_query, (blog_id, image))
            
            connection.commit()

        return {
            "message": "blog created successfully",
            "blog": {
                "id": blog_id,
                "title": blog.title,
                "description": blog.description,
                "images": blog.images,
                "content": blog.content,
            }
        }

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating blog: {str(e)}")
    finally:
        connection.close()




def get_blog_by_id(blog_id: int):

    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        query = """
        SELECT id, title, description, content FROM blogs WHERE id = %s
        """
        cursor.execute(query, (blog_id,))
        blog = cursor.fetchone()

        if blog is None:
            raise HTTPException(status_code=404, detail="blog not found")

        image_query = """
        SELECT image_url FROM blog_images WHERE blog_id = %s
        """
        cursor.execute(image_query, (blog_id,))
        images = [row[0] for row in cursor.fetchall()]

        return {
            "id": blog[0],
            "title": blog[1],
            "description": blog[2],
            "content": blog[3],
            "images": images,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving blog: {str(e)}")
    finally:
        connection.close()


def update_blog(blog_id: int, blog: BlogUpdate):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        set_fields = []
        params = []

        if blog.title is not None:
            set_fields.append("title = %s")
            params.append(blog.title)
        if blog.description is not None:
            set_fields.append("description = %s")
            params.append(blog.description)
        if blog.content is not None:
            set_fields.append("content = %s")
            params.append(blog.content)

        params.append(blog_id)  

        update_query = f"""
        UPDATE blogs SET {', '.join(set_fields)} WHERE id = %s
        """

        cursor.execute(update_query, tuple(params))  
        connection.commit()

        if blog.images is not None:
            delete_image_query = """
            DELETE FROM blog_images WHERE blog_id = %s
            """
            cursor.execute(delete_image_query, (blog_id,))
            connection.commit()

            image_query = """
            INSERT INTO blog_images (blog_id, image_url) VALUES (%s, %s)
            """
            for image in blog.images:
                cursor.execute(image_query, (blog_id, image))
            connection.commit()
        return {
            "message": "blog updated successfully",
            "blog": {
                "id": blog_id,
                "title": blog.title if blog.title is not None else "Not provided",
                "description": blog.description if blog.description is not None else "Not provided",
                "content": blog.content if blog.content is not None else "Not provided",
                "images": blog.images if blog.images is not None else [],
            }
        }

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating blog: {str(e)}")
    finally:
        connection.close()


def delete_blog(blog_id: int):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        delete_image_query = """
        DELETE FROM blog_images WHERE blog_id = %s
        """
        cursor.execute(delete_image_query, (blog_id,))
        connection.commit()

        delete_blog_query = """
        DELETE FROM blogs WHERE id = %s
        """
        cursor.execute(delete_blog_query, (blog_id,))
        connection.commit()

        return {"message": "blog deleted successfully"}

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting blog: {str(e)}")
    finally:
        connection.close()


def index_blogs():
    connection = get_db_connection()
    try:
        cursor = connection.cursor()

        query = "SELECT id, title, description,content FROM blogs"
        cursor.execute(query)
        blogs = cursor.fetchall()

        blogs_data = []
        for blog in blogs:
            blog_id = blog[0]

            image_query = """
            SELECT image_url FROM blog_images WHERE blog_id = %s
            """
            cursor.execute(image_query, (blog_id,))
            images = [row[0] for row in cursor.fetchall()]

            blogs_data.append({
                "id": blog[0],
                "title": blog[1],
                "description": blog[2],
                "images": images,
            })

        return blogs_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching blogs: {str(e)}")
    finally:
        connection.close()



