import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
// Required: Set the worker source for PDF.js to function

export async function pdfPageCounter(
    file: File
): Promise<number | undefined> {
    if (!file || file.type !== "application/pdf") return;

    // 1. Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // 2. Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    // 3. Get the total number of pages
    const totalPages = pdf.numPages;
    console.log("Total Pages:", totalPages);
    // alert(`The selected PDF has ${totalPages} pages.`);
    return totalPages;

}
