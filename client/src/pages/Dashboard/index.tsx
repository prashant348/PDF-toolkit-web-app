import { useAuth } from "../../contexts/authContext"
import LogOutButton from "../../components/LogOutButton"
import ImagesToPdfPageButton from "../../components/ImagesToPdfPageButton"
import DeleteAccountButton from "../../components/DeleteAccount"

export default function Dashboard() {

    const { user } = useAuth()

    return (

        <div>
            <div>
                Protected Route Dashboard
            </div>
            <div>
                Welcome, {user?.email}
            </div>
            <LogOutButton />
            <DeleteAccountButton />
            <ImagesToPdfPageButton />
        </div>

    )
}
