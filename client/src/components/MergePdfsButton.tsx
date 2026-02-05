import { useNavigate } from "react-router-dom"

export function MergePdfsButton() {
    
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/dashboard/pdf/merge-pdfs")}
            className="cursor-pointer border"
        >
            Merge PDFs
        </button>
    )
}