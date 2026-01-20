from fastapi import FastAPI
from dotenv import load_dotenv
from auth.router import router as auth_router
import uvicorn
import os

load_dotenv()

app = FastAPI()
app.include_router(auth_router)
port = int(os.getenv("FASTAPI_PORT"))

@app.get("/")
def root():
    return { "msg": "hello fastapi" }

if __name__ == "__main__":
    # To use uvicorn reload feature pass app="main:app" instead of app=app
    # "main:app" -> main -> file name without extension, app -> function name
    uvicorn.run(app="main:app", host="127.0.0.1", port=port, reload=True)