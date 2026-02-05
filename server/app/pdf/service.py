from io import BytesIO
from pdf.utils import convert_image_to_pdf
from fastapi import UploadFile, HTTPException, status
from fastapi.responses import StreamingResponse
from typing import List
from PIL import Image
from pypdf import PdfWriter, PdfReader
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
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No files uploaded"
            )
        
        images = []

        for file in files:
            if file.content_type not in ALLOWED_TYPES:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Only PNG and JPEG images are allowed"
                )
            
            # read file bytes 
            file_bytes = await file.read()
            img = Image.open(io.BytesIO(file_bytes)).convert("RGB")
            images.append(img)
        
        if not images:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
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
    
    async def merge_pdfs(
            self,
            files: List[UploadFile] 
    ):
        if len(files) < 2:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="At least 2 PDF files are required"
            )
        
        writer = PdfWriter()

        for file in files:
            if file.content_type != "application/pdf":
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Only PDF files are allowed"
                )
            
            pdf_bytes = await file.read()
            reader = PdfReader(BytesIO(pdf_bytes))

            for page in reader.pages:
                writer.add_page(page)

        output_buffer = BytesIO()
        writer.write(output_buffer)
        output_buffer.seek(0)

        return StreamingResponse(
            status_code=status.HTTP_200_OK,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={file.filename}.pdf"
            },
            content=output_buffer
        )
