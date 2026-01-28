import ProtectedRoute from "../../components/ProtectedRoute"
import { useAuth } from "../../libs/authContext"

export default function Dashboard()  {

    const { user } = useAuth()

    return (
        <ProtectedRoute >
            <div>
                <div>
                    Protected Route Dashboard
                </div>
                <div>
                    Welcome, {user?.email}
                </div>
            </div>
        </ProtectedRoute>
    )
}
