import os, cv2
import numpy as np
import onnxruntime as ort

def process_image(img):
    h, w = img.shape[:2]
    # resize image to multiple of 8s
    def to_8s(x):
        return 256 if x < 256 else x - x % 8
    img = cv2.resize(img, (to_8s(w), to_8s(h)))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB).astype(np.float32)/ 127.5 - 1.0
    return img

def load_test_data(image_path):
    print("Loading test data")
    nparr = np.frombuffer(image_path, np.uint8)
    img0 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    print("Read successfully")
    print(f"Image shape: {img0.shape}")
    # Resize the input image if it's larger than 2000
    if img0.shape[0] > 2000 or img0.shape[1] > 2000:
        ratio = round(2000 / max(img0.shape[0], img0.shape[1]), 2)
        img0 = cv2.resize(img0, None, fx = ratio, fy = ratio)

    img = process_image(img0)
    print("successfully process image")
    img = np.expand_dims(img, axis=0)

    return img, img0.shape

def convert_to_anime(input_imgs_path, onnx="./model/AnimeGANv3.onnx", device="cpu"):
    test_file = input_imgs_path

    # Initialize ONNX session
    if ort.get_device() == 'GPU' and device == "gpu":
        session = ort.InferenceSession(onnx, providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])
    else:
        session = ort.InferenceSession(onnx, providers=['CPUExecutionProvider'])

    # Get input and output names
    x = session.get_inputs()[0].name
    y = session.get_outputs()[0].name

    # Load and process the input image
    sample_image, shape = load_test_data(test_file)  # Pass input image path and ONNX model path

    # Run inference
    fake_img = session.run(None, {x: sample_image})

    img = (np.squeeze(fake_img[0]) + 1.) / 2 * 255
    img = np.clip(img, 0, 255).astype(np.uint8)
    img = cv2.resize(img, (shape[1], shape[0]))
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    return img
