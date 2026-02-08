
export function downloadBlob(
    blob: Blob, 
    filename: string = (
        globalThis.crypto.randomUUID()??
        (Date.now().toString(36) + Math.random().toString(36).slice(2, 8))
    )
): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
}