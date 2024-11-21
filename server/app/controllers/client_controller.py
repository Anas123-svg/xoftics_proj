from fastapi import HTTPException
from app.database import get_db_connection
from app.schemas.client import ClientCreate, ClientUpdate

def create_client(client: ClientCreate):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        cursor.execute(
            """
            INSERT INTO clients (name, email, company_name, phone, address)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (client.name, client.email, client.company_name, client.phone, client.address),
        )
        connection.commit()
        return {"message": "Client created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating client: {str(e)}")
    finally:
        connection.close()

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

def update_client(client_id: int, client: ClientUpdate):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        update_query = """
            UPDATE clients SET name = %s, email = %s, company_name = %s, phone = %s, address = %s WHERE id = %s
        """
        cursor.execute(
            update_query,
            (
                client.name,
                client.email,
                client.company_name,
                client.phone,
                client.address,
                client_id,
            ),
        )
        connection.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Client not found")
        return {"message": "Client updated successfully"}
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
