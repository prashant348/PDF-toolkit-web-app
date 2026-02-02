from fastapi import FastAPI, HTTPException
from fastapi.requests import Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from auth.router import router as auth_router
from pdf.router import router as pdf_router
import uvicorn
import os

load_dotenv()

app = FastAPI()
port = int(os.getenv("FASTAPI_PORT"))
origins = [
    "http://localhost:5173", # frontend server url
    "http://127.0.0.1:5173"
]
app.add_middleware(
    CORSMiddleware,             # cors middleware
    allow_origins=origins,       # List of allowed origins
    allow_credentials=True,     # Allow cookies/auth headers
    allow_methods=["*"],         # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],         # Allow all headers
) 
app.include_router(auth_router)
app.include_router(pdf_router)

@app.exception_handler(HTTPException)
def global_http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.detail
        }
    )

@app.get("/")
def root():
    return { "msg": "hello fastapi" }

if __name__ == "__main__":
    # To use uvicorn reload feature pass app="main:app" instead of app=app
    # "main:app" -> main -> file name without extension, app -> function name
    uvicorn.run(app="main:app", host="127.0.0.1", port=port, reload=True)