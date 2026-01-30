from PIL import Image
from io import BytesIO

def convert_image_to_pdf(file_bytes: bytes):

        # Load image from bytes
    image = Image.open(BytesIO(file_bytes))

    # convert image to RGB because png has alpha channel RGBA
    if image.mode in ("P", "RGBA"):
        image = image.convert("RGB")

    pdf_buffer = BytesIO()

    # Save image to PDF
    image.save(pdf_buffer, format="PDF")

    pdf_buffer.seek(0)

    return pdf_buffer.read()

