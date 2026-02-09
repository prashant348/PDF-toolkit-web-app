import { createContext, useContext, useState } from "react"
import { imagesToPdf } from "../api/pdf/imagesToPdf.api"
import { mergePdfs } from "../api/pdf/mergePdfs.api"
import { splitPdfIntoMultiplePdfs } from "../api/pdf/splitPdf.api"
import { pdfPageCounter } from "../utils/pdfPageCounter"

type PDFContextType = {
    isConverting: boolean;
    isMerging: boolean;
    mergingError: string | null;
    convertingError: string | null;
    isSplitting: boolean;
    splittingError: string | null;
    isCounting: boolean;
    countingError: string | null;
    convertImagesToPdf: (files: File[]) => Promise<void>;
    mergeMultiplePdfs: (files: File[]) => Promise<void>;
    splitPdf: (file: File, ranges: string) => Promise<void>;
    getTotalNumberOfPagesInPdf: (file: File) => Promise<number | undefined>;
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
    const [ isSplitting, setIsSplitting ] = useState<boolean>(false);
    const [ splittingError, setSplittingError ] = useState<string | null>(null);
    const [isCounting, setIsCounting] = useState<boolean>(false);
    const [countingError, setCountingError] = useState<string | null>(null);

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

    const splitPdf = async (
        file: File,
        ranges: string
    ): Promise<void> => {
        setSplittingError(null);
        setIsSplitting(true);
        try {
            await splitPdfIntoMultiplePdfs(file, ranges);
        } catch (err: any) {
            console.log("err: ", err);
            setCountingError("Failed to count");
        } finally {
            setIsSplitting(false);
        }
    }

    const getTotalNumberOfPagesInPdf = async (
        file: File
    ): Promise<number | undefined> => {
        setCountingError(null);
        setIsCounting(true);

        try {
            const result = await pdfPageCounter(file);
            return result
        } catch (err: any) {
            console.log("err: ", err);
            setCountingError(() => {
                if (typeof err.message === "object") {
                    return err.message.message;
                }
                return err.message;
            });
        } finally {
            setIsCounting(false);
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
                convertingError,
                splitPdf,
                isSplitting,
                splittingError,
                getTotalNumberOfPagesInPdf,
                isCounting,
                countingError
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