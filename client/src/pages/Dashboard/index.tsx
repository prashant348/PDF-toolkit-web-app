import { useAuth } from "../../libs/authContext"

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
        </div>

    )
}
