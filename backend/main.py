from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from PIL import Image
import numpy as np
import io
from utils.anime_converter import convert

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "SketPic"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), converter: str = Form(...)):
    try:
        contents = await file.read()

        input_path = "../statics/input/input.jpeg"
        with open(input_path, "wb") as f:
            f.write(contents)

        if converter == "Anime":
            convert("../statics/input/input.jpeg")
            img_path = "../statics/output/output.jpeg"
        else:
            # Sketch converter should be here
            img_path = "../statics/input/input.jpeg"
        
        # Open the image using PIL
        img = Image.open(img_path)

        # Convert the image to bytes
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='JPEG')
        img_bytes.seek(0)
        return StreamingResponse(img_bytes, media_type="image/jpeg") 
    except Exception as e:
        return JSONResponse(content={"message": "Failed to process file"}, status_code=400)
