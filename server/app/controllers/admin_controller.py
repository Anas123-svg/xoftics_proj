from fastapi import HTTPException
from app.database import get_db_connection
from app.schemas.admin import AdminCreate
import jwt
from app.core.security import create_access_token, get_password_hash
from app.utils.utils import verify_password  
#from app.core.config import settings  
from jose import JWTError  
def create_admin(admin: AdminCreate): 
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        hashed_password = get_password_hash(admin.password)

        cursor.execute(
            """
            INSERT INTO admins (name, email, phone, address, profile_image, password, role)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
            """,
            (
                admin.name,
                admin.email,
                admin.phone,
                admin.address,
                admin.profile_image,
                hashed_password,
                admin.role,
            ),
        )
        connection.commit()

        cursor.execute("SELECT LAST_INSERT_ID();")
        admin_id = cursor.fetchone()[0]
        
        
        cursor.execute("SELECT * FROM admins WHERE id = %s", (admin_id,))
        created_admin = cursor.fetchone()


        admin_email = admin.email

        token_data = {"id": admin_id, "email": admin_email}
        access_token = create_access_token(data=token_data)

        return {
            "message": "admin created successfully",
            "access_token": access_token,
            "admin": created_admin,
            "token_type": "bearer",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating admin: {str(e)}")
    finally:
        connection.close()
        
        
def login(email: str, password: str):
    connection = get_db_connection()
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM admins WHERE email = %s", (email,))
        admin = cursor.fetchone()

        if not admin or not verify_password(password, admin["password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        token_data = {"id": admin["id"], "email": admin["email"]}
        access_token = create_access_token(data=token_data)

        return {"access_token": access_token, "token_type": "bearer", "admin": admin}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error logging in: {str(e)}")
    finally:
        connection.close()


import os
from dotenv import load_dotenv
from jose import JWTError, jwt
from fastapi import HTTPException
load_dotenv()

def get_admin_by_token(token: str):
    try:
        secret_key = "your_secret_key"
        algorithm = "HS256"
        
        if not secret_key or not algorithm:
            raise HTTPException(status_code=500, detail="Secret key or algorithm not configured.")

        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        admin_id = payload.get("id")

        if not admin_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        connection = get_db_connection()
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM admins WHERE id = %s", (admin_id,))
            admin = cursor.fetchone()

            if not admin:
                raise HTTPException(status_code=404, detail="Admin not found")

            return admin
        finally:
            connection.close()
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


        
        
def get_all_admins():
    connection = get_db_connection()
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM admins")
        return cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching admins: {str(e)}")
    finally:
        connection.close()

def get_admin_by_id(admin_id: int):
    connection = get_db_connection()
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM admins WHERE id = %s", (admin_id,))
        admin = cursor.fetchone()
        if not admin:
            raise HTTPException(status_code=404, detail="admin not found")
        return admin
    finally:
        connection.close()

def delete_admin(admin_id: int):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM admins WHERE id = %s", (admin_id,))
        connection.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="admin not found")
        return {"message": "admin deleted successfully"}
    finally:
        connection.close()
