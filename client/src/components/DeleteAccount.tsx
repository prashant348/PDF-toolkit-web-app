import { useAuth } from "../contexts/authContext";

export default function DeleteAccountButton() {

    const { deleteAccount } = useAuth();

    return (
        <button
            onClick={deleteAccount}
            className="border cursor-pointer"
        >
            Delete Account
        </button>
    )
}
