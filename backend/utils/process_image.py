from PIL import Image
import io
import sketch
import requests
import numpy as np
import cv2

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
    sketched = sketch.PencilSketch()
    img = sketched(img)

    _,result = cv2.imencode('.jpg',img)
    result = result.tobytes()

    return result

#test picture
# url = "https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg"
# img_bytes = requests.get(url).content
# test = sketch_image(img_bytes)
# process_image(test)
