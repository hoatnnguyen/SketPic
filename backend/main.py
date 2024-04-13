from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi import HTTPException
import io
from utils.anime_converter import convert_to_anime
from utils.process_image import sketch_image
import cv2

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

        if converter == "Anime":
            img = convert_to_anime(contents)
            _, img_encoded = cv2.imencode('.jpg', img)
            img_bytes = io.BytesIO(img_encoded.tobytes())
        else:
            img_bytes = sketch_image(contents)
            print(f"done converting to sketch")

        return StreamingResponse(img_bytes, media_type="image/jpeg") 

    except Exception as e:
        raise HTTPException(status_code=400, detail="Failed to process image")
