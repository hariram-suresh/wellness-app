from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

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