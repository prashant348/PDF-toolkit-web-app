import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { type JSX } from "react";

export default function UnverifiedUserRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (user?.is_verified) return <Navigate to="/dashboard" />;

  return children;
}