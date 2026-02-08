import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { type JSX } from "react";
import AuthLoader from "./ui/AuthLoader";
export default function UnverifiedUserRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <AuthLoader />;

  if (user?.is_verified) return <Navigate to="/dashboard" />;

  return children;
}