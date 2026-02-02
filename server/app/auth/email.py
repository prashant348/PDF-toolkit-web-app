from auth.schemas import EmailSchema
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType, NameEmail
from starlette.responses import JSONResponse
from dotenv import load_dotenv
import os

load_dotenv()

MAIL_USERNAME=os.getenv("MAIL_USERNAME")
MAIL_PASSWORD=os.getenv("MAIL_PASSWORD")
MAIL_FROM_EMAIL=os.getenv("MAIL_FROM_EMAIL")
MAIL_FROM_NAME=os.getenv("MAIL_FROM_NAME")
MAIL_PORT=os.getenv("MAIL_PORT")
MAIL_SERVER=os.getenv("MAIL_SERVER")

# Validate config early and set sensible defaults
if not MAIL_SERVER or not MAIL_FROM_EMAIL or not MAIL_USERNAME or not MAIL_PASSWORD:
    raise RuntimeError("Missing mail configuration: set MAIL_SERVER, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM_EMAIL in .env")


conf = ConnectionConfig( 
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_FROM=str(NameEmail(MAIL_FROM_NAME, MAIL_FROM_EMAIL)),
    MAIL_PORT=int(MAIL_PORT),
    MAIL_SERVER=MAIL_SERVER, 
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True 
)  


async def send_email_verification_link(
        data: EmailSchema, 
        token: str, 
        base_url: str
    ):
    
    verification_url = f"{base_url}/auth/verify-mail?token={token}"

    html = f"""
    <p>Click to verify your email</p>
    <a href="{verification_url}">Verify Email</a>
    """

    message = MessageSchema(
        subject="FastAPI Mail Module",
        recipients=[data.email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)

    await fm.send_message(message)

    return {
        "success": True,
        "message": "Email sent successfully"
    }
    