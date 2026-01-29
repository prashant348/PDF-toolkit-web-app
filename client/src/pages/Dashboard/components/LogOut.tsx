import { useAuth } from "../../../libs/authContext";

export default function LogOutButton() {

    const { logout } = useAuth();
    
    return (
        <button
            onClick={logout}
            className="border cursor-pointer"
        >
            Log Out
        </button>
    )
}