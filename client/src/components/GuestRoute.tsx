import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { type JSX } from "react";

export default function GuestRoute({ children }: { children: JSX.Element }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (user || isAuthenticated) return <Navigate to="/dashboard" />;

  return children;
}