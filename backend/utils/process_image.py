from PIL import Image
import io
from utils.sketch import PencilSketch
import requests
import numpy as np
import cv2
import os

def process_image(image_bytes):
    
    img = Image.open(io.BytesIO(image_bytes))
    # Example: Resize the image to 300x300
    # Should put logic to convert the image to sketch or anime styled image
    img.thumbnail((300, 300))
    output = io.BytesIO()
    img.save(output, format='JPEG')
    img.show()

def sketch_image(image_bytes):
    img = np.asarray(bytearray(image_bytes))
    img = cv2.imdecode(img, 1)
    sketched = PencilSketch()
    img = sketched(img)

    _,result = cv2.imencode('.jpg',img)
    result_bytes = result.tobytes()

    # Save the image to a file
    output_dir = "../statics/output"
    output_file = os.path.join(output_dir, "output.jpeg")

    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Write the image bytes to the output file
    with open(output_file, "wb") as f:
        f.write(result_bytes)

    return result_bytes
