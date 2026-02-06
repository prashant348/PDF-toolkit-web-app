
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
export function BackButton() {
    const navigate = useNavigate();
    return (
        <button
            className="border rounded-full p-1 cursor-pointer"
            onClick={() => navigate("/dashboard")}
        >
            <ArrowLeft />
        </button>
    )
}