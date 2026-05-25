from fastapi import FastAPI
from pydantic import BaseModel
from prometheus_fastapi_instrumentator import Instrumentator
from transformers import pipeline

app = FastAPI()
Instrumentator().instrument(app).expose(app)

classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base"
)

class UserInput(BaseModel):
    text: str

@app.get("/")
def health():
    return {"status": "AI service running"}

@app.post("/predict")
def predict(data: UserInput):
    result = classifier(data.text)
    return {
        "input": data.text,
        "prediction": result
    }