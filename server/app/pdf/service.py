from io import BytesIO
from pdf.utils import convert_image_to_pdf
from fastapi import UploadFile, HTTPException
from fastapi.responses import StreamingResponse

ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg"
]

class PDFService:
    def __init__(self):
        pass

    async def image_to_pdf(self, file: UploadFile):
        try:
            if file.content_type not in ALLOWED_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail="Only PNG and JPEG images are allowed"
                )
            # read file bytes 
            file_bytes = await file.read()

            # convert to pdf
            pdf_bytes = convert_image_to_pdf(file_bytes)

            # return pdf as downloadable response
            return StreamingResponse(
                content=BytesIO(pdf_bytes),
                media_type="application/pdf",
                headers={
                    "Content-Disposition": f"attachment; filename={file.filename}.pdf"
                }
            )

        except Exception as e:
            print("Image to PDF Error: ", e)
            raise HTTPException(
                status_code=500,
                detail="Error converting image to PDF"
            )