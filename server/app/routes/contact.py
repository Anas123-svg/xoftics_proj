from fastapi import APIRouter, HTTPException, Header
from app.schemas.contact import MessageRequest 
from app.controllers.contact_controller import send_message_to_admins  

router = APIRouter()

@router.post("/send-message", summary="Send message to all admins")
def send_message(message_request: MessageRequest):
    try:
        return send_message_to_admins(message_request)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
