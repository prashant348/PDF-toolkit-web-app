import ProtectedRoute from "../../components/ProtectedRoute"
export default function Dashboard()  {
    return (
        <ProtectedRoute >
            <div>
                Protected Route Dashboard
            </div>
        </ProtectedRoute>
    )
}
