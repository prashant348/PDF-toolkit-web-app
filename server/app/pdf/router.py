from fastapi import APIRouter, UploadFile, File
from pdf.service import PDFService
from typing import List

router = APIRouter(
    prefix="/pdf",
    tags=["auth"]
)

@router.post(path="/image-to-pdf", status_code=200)
async def image_to_pdf(files: List[UploadFile] = File(...)):
    return await PDFService().image_to_pdf(files)