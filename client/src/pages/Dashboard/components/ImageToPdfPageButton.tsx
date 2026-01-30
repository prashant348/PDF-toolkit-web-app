import { useNavigate } from "react-router-dom"

export default function ImageToPdfPageButton() {
  
    const navigate = useNavigate();

    return (
    <button
        onClick={() => navigate("/dashboard/pdf/image-to-pdf")}
        className="border cursor-pointer"
    >
        Image to PDF
    </button>
  )
}
