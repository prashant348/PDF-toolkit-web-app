import { useAuth } from "../../libs/authContext"
import LogOutButton from "./components/LogOut"
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
        </div>

    )
}
