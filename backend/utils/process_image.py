from PIL import Image
import io

def process_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes))
    # Example: Resize the image to 300x300
    # Should put logic to convert the image to sketch or anime styled image
    img.thumbnail((300, 300))
    output = io.BytesIO()
    img.save(output, format='JPEG')
    return output.getvalue()
