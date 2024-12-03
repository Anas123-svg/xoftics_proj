from fastapi import HTTPException
from app.database import get_db_connection
from app.schemas.client import ClientCreate, ClientUpdate
import jwt
from app.core.security import create_access_token, get_password_hash
from app.utils.utils import verify_password  
#from app.core.config import settings  
from jose import JWTError  
def create_client(client: ClientCreate):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        hashed_password = get_password_hash(client.password)

        cursor.execute(
            """
            INSERT INTO clients (name, email, company_name, phone, address, profile_image, password)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
            """,
            (
                client.name,
                client.email,
                client.company_name,
                client.phone,
                client.address,
                client.profile_image,
                hashed_password,
            ),
        )
        connection.commit()

        cursor.execute("SELECT LAST_INSERT_ID();")
        client_id = cursor.fetchone()[0]
        
        
        cursor.execute("SELECT * FROM clients WHERE id = %s", (client_id,))
        created_client = cursor.fetchone()

        client_email = client.email

        token_data = {"id": client_id, "email": client_email}
        access_token = create_access_token(data=token_data)

        return {
            "message": "Client created successfully",
            "access_token": access_token,
            "client": created_client,
            "token_type": "bearer",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating client: {str(e)}")
    finally:
        connection.close()
        
        
def login(email: str, password: str):
    connection = get_db_connection()
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clients WHERE email = %s", (email,))
        client = cursor.fetchone()

        if not client or not verify_password(password, client["password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        token_data = {"id": client["id"], "email": client["email"]}
        access_token = create_access_token(data=token_data)

        return {"access_token": access_token, "token_type": "bearer", "client": client}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error logging in: {str(e)}")
    finally:
        connection.close()


import os
from dotenv import load_dotenv
from jose import JWTError, jwt
from fastapi import HTTPException
load_dotenv()

def get_client_by_token(token: str):
    try:
        secret_key = "your_secret_key"
        algorithm = "HS256"
        
        if not secret_key or not algorithm:
            raise HTTPException(status_code=500, detail="Secret key or algorithm not configured.")

        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        client_id = payload.get("id")

        if not client_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        connection = get_db_connection()
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM clients WHERE id = %s", (client_id,))
            client = cursor.fetchone()

            if not client:
                raise HTTPException(status_code=404, detail="Client not found")

            return client
        finally:
            connection.close()
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
        
        
def get_all_clients():
    connection = get_db_connection()
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clients")
        return cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching clients: {str(e)}")
    finally:
        connection.close()

def get_client_by_id(client_id: int):
    connection = get_db_connection()
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clients WHERE id = %s", (client_id,))
        client = cursor.fetchone()
        if not client:
            raise HTTPException(status_code=404, detail="Client not found")
        return client
    finally:
        connection.close()

def delete_client(client_id: int):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM clients WHERE id = %s", (client_id,))
        connection.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Client not found")
        return {"message": "Client deleted successfully"}
    finally:
        connection.close()

def update_client(client_id: int, updated_data: ClientUpdate):
    connection = get_db_connection()

    try:
        
        updated_fields = updated_data.dict(exclude_unset=True)

        if not updated_fields:
            raise HTTPException(status_code=400, detail="No fields to update")

        
        cursor = connection.cursor(dictionary=True)
        query = "UPDATE clients SET "
        query_parts = []
        values = []

        for key, value in updated_fields.items():
            query_parts.append(f"{key} = %s")
            values.append(value)

        query += ", ".join(query_parts) + " WHERE id = %s"
        values.append(client_id)

        
        print("Generated Query:", query)
        print("Values:", values)

        cursor.execute(query, tuple(values))
        connection.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail=f"Client with id {client_id} not found")

        
        cursor.execute("SELECT * FROM clients WHERE id = %s", (client_id,))
        updated_client = cursor.fetchone()

        if not updated_client:
            raise HTTPException(status_code=404, detail=f"Client with id {client_id} not found after update")

        
        return {
            "message": "Client updated successfully",
            "client": updated_client,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating client: {str(e)}")
    finally:
        connection.close()
