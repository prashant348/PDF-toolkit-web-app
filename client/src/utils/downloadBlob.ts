
export function downloadBlob(
    blob: Blob, 
    filename: string = "images" 
): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
}