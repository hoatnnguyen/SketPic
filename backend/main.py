from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
import io
from utils.process_image import process_image

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
        print(f"File: {file}")
        contents = await file.read()

        processed_image_bytes = process_image(contents)

        return StreamingResponse(io.BytesIO(processed_image_bytes), media_type="image/jpeg") 
    except Exception as e:
        return JSONResponse(content={"message": "Failed to process file"}, status_code=400)
