from fastapi import APIRouter, UploadFile, File
from pdf.service import PDFService
from typing import List

router = APIRouter(
    prefix="/pdf",
    tags=["auth"]
)

@router.post(path="/images-to-pdf", status_code=200)
async def images_to_pdf(files: List[UploadFile] = File(...)):
    result = await PDFService().images_to_pdf(files)
    return result