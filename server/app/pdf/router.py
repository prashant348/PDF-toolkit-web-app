from fastapi import APIRouter, UploadFile, File, Form
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

@router.post(path="/merge-pdfs", status_code=200)
async def merge_pdfs(files: List[UploadFile] = File(...)):
    result = await PDFService().merge_pdfs(files)
    return result

@router.post(path="/split-pdf", status_code=200)
async def split_pdf(file: UploadFile = File(...), ranges: str = Form(...)):
    result = await PDFService().split_pdf(file, ranges)
    return result