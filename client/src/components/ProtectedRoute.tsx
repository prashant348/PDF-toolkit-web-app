import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { apiGet } from "../libs/api";

interface ProtectedRouteProps {
    children: React.ReactNode
}

interface User {
    id: string
    email: string
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        apiGet<User>("/auth/me").then((res) => {
            console.log("res", res)
            setAuthenticated(true)
        }).catch((err) => {
            console.log("err: ", err)
            setAuthenticated(false)
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    if (loading) return <p>Loading...</p>

    if (!authenticated) return <Navigate to={"/login"} />

    return children;

}
