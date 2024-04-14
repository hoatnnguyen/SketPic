from PIL import Image
import io
from utils.sketch import PencilSketch
import numpy as np
import cv2

def sketch_image(image_bytes):
    img = np.asarray(bytearray(image_bytes))
    img = cv2.imdecode(img, 1)
    sketched = PencilSketch()
    img = sketched(img)

    _,result = cv2.imencode('.jpg',img)
    img_bytes = io.BytesIO(result.tobytes())

    return img_bytes
