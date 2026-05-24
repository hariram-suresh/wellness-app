from fastapi import FastAPI
from pydantic import BaseModel
import requests

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AI_SERVICE_URL = "http://ai-service:8001/predict"

class UserInput(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "Backend running in Kubernetes"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/analyze")
def analyze(data: UserInput):

    response = requests.post(
        AI_SERVICE_URL,
        json={"text": data.text}
    )

    return response.json()

nisbefonfnowebg0nw