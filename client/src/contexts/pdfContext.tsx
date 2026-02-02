import { createContext, useContext, useState } from "react"
import { imagesToPdf } from "../api/pdf/imagesToPdf.api"


type PDFContextType = {
    isConverting: boolean;
    convertImagesToPdf: (files: File[]) => Promise<void>
}

interface PDFProviderProps {
    children: React.ReactNode
}

const PDFContext = createContext<PDFContextType | null>(null)

export function PDFProvider({children}: PDFProviderProps) {

    const [isConverting, setIsConverting] = useState<boolean>(false);
    
    const convertImagesToPdf = async (
        files: File[]
    ): Promise<void> => {
        setIsConverting(true);
        try {
            await imagesToPdf(files);
        } catch (err: any) { 
            console.log("err: ", err)
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <PDFContext.Provider 
            value={{
                convertImagesToPdf,
                isConverting
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