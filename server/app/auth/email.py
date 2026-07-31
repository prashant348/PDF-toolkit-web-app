from auth.schemas import EmailSchema
from dotenv import load_dotenv
import os
import httpx

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")


# Validate config early
if not RESEND_API_KEY:
    raise RuntimeError("Missing mail configuration: set RESEND_API_KEY in .env")

async def send_email_verification_link(data: EmailSchema, token: str, base_url: str):
    client_side_verification_url = f"{base_url}/confirm-email?token={token}"
    html = f"""
    <p>Click to verify your email</p>
    <a href="{client_side_verification_url}">Verify Email</a>
    """
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            url="https://api.resend.com/emails",  # Sahi endpoint URL
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                # Naye account ke liye 'onboarding@resend.dev' use karna zaroori hai
                "from": "PDF Toolkit <onboarding@resend.dev>",
                "to": [data.email],
                "subject": "PDF Toolkit Email Verification",
                "html": html,
            }
        )
        
    if response.status_code == 200:
        return {"success": True, "message": "Email sent successfully"}
    else:
        return {"success": False, "message": f"Failed: {response.text}"}
