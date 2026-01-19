from fastapi import FastAPI
import uvicorn
import dotenv
dotenv.load_dotenv()

app = FastAPI()
port = int(dotenv.get_key(".env", "FASTAPI_PORT"))


@app.get("/")
def root():
    return { "msg": "hello fastapi" }

if __name__ == "__main__":
    # To use uvicorn reload feature pass app="main:app" instead of app=app
    # "main:app" -> main -> file name without extension, app -> function name
    uvicorn.run(app="main:app", host="127.0.0.1", port=port, reload=True)