from fastapi import HTTPException
from typing import List
from app.database import get_db_connection 
from app.schemas.contact import MessageRequest
from app.services.email_service import send_email

def send_message_to_admins(message_request: MessageRequest):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        
        cursor.execute("SELECT email FROM admins")
        admins = cursor.fetchall()
        if not admins:
            raise HTTPException(status_code=404, detail="No admins found")

        admin_emails = [admin[0] for admin in admins] 

        for admin_email in admin_emails:
            send_email(
                recipient=admin_email,
                subject=f"Message from {message_request.name}",
                body=message_request.message
            )

        return {"message": "Emails sent successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending messages: {str(e)}")
    finally:
        connection.close()
