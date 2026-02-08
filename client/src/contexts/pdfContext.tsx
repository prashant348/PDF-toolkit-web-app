import { createContext, useContext, useState } from "react"
import { imagesToPdf } from "../api/pdf/imagesToPdf.api"
import { mergePdfs } from "../api/pdf/mergePdfs.api"

type PDFContextType = {
    isConverting: boolean;
    isMerging: boolean;
    mergingError: string | null;
    convertingError: string | null;
    convertImagesToPdf: (files: File[]) => Promise<void>;
    mergeMultiplePdfs: (files: File[]) => Promise<void>;
}

interface PDFProviderProps {
    children: React.ReactNode
}

const PDFContext = createContext<PDFContextType | null>(null)

export function PDFProvider({children}: PDFProviderProps) {

    const [isConverting, setIsConverting] = useState<boolean>(false);
    const [ convertingError, setConvertingError ] = useState<string | null>(null);
    const [ isMerging, setIsMerging ] = useState<boolean>(false);
    const [ mergingError, setMergingError ] = useState<string | null>(null);

    const convertImagesToPdf = async (
        files: File[]
    ): Promise<void> => {
        setConvertingError(null);
        setIsConverting(true);
        try {
            await imagesToPdf(files);
        } catch (err: any) { 
            console.log("err: ", err)
            setConvertingError(() => {
                if (typeof err.message === "object") {
                    return err.message.message;
                }
                return err.message;
            });
        } finally {
            setIsConverting(false);
        }
    };

    const mergeMultiplePdfs = async (
        files: File[]
    ): Promise<void> => {
        setMergingError(null);
        setIsMerging(true);
        try {
            await mergePdfs(files);
        } catch (err: any) {
            console.log("err: ", err);
            setMergingError(() => {
                if (typeof err.message === "object") {
                    return err.message.message;
                }
                return err.message;
            });
        } finally {
            setIsMerging(false);
        }
    }
    
    return (
        <PDFContext.Provider 
            value={{
                isConverting,
                isMerging,
                convertImagesToPdf,
                mergeMultiplePdfs,
                mergingError,
                convertingError
            }}
        >
            {children}
        </PDFContext.Provider>
    )
}

export function usePDF() {
    const ctx = useContext(PDFContext);
    if (!ctx) throw new Error("usePDF must be used inside PDFProvider");
    return ctx
}