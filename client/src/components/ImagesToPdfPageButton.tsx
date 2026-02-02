import { useNavigate } from "react-router-dom"

export default function ImagesToPdfPageButton() {
  
    const navigate = useNavigate();

    return (
    <button
        onClick={() => navigate("/dashboard/pdf/images-to-pdf")}
        className="border cursor-pointer"
    >
        Image to PDF
    </button>
  )
}
