from io import BytesIO
from pdf.utils import convert_image_to_pdf
from fastapi import UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from typing import List
from PIL import Image
import io

ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg"
]

class PDFService:
    def __init__(self):
        pass

    async def images_to_pdf(self, files: List[UploadFile]):
        if not files: 
            raise HTTPException(
                status_code=400,
                detail="No files uploaded"
            )
        
        images = []

        for file in files:
            if file.content_type not in ALLOWED_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail="Only PNG and JPEG images are allowed"
                )
            
            # read file bytes 
            file_bytes = await file.read()
            img = Image.open(io.BytesIO(file_bytes)).convert("RGB")
            images.append(img)
        
        if not images:
            raise HTTPException(
                status_code=400,
                detail="No valid images"
            )
        
        pdf_buffer = io.BytesIO()
        images[0].save(
            pdf_buffer,
            format="PDF",
            save_all=True,
            append_images=images[1:]
        )

        pdf_buffer.seek(0)

        # return pdf as downloadable response
        return StreamingResponse(
            status_code=200,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={file.filename}.pdf"
            },
            content=pdf_buffer
        )
