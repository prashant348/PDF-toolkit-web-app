from fastapi import APIRouter, UploadFile, File
from pdf.service import PDFService

router = APIRouter(
    prefix="/pdf",
    tags=["auth"]
)

@router.post(path="/image-to-pdf", status_code=200)
async def image_to_pdf(file: UploadFile = File(...)):
    return await PDFService().image_to_pdf(file)