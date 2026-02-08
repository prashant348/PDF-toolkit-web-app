import { useShowPopUp } from "../../store/ShowPopUp"

export default function DeleteAccountButton() {
    const { setShow } = useShowPopUp();
    
    return (
        <button 
            onClick={() => setShow(true)}
            className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
        >
            Delete Account
        </button>
    )
}
