import { useAuth } from "../../contexts/authContext";

export default function LogOutButton() {
    const { logout } = useAuth();
    
    return (
        <button 
            onClick={logout}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
        >
            Log Out
        </button>
    )
}