import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { type JSX } from "react";
import AuthLoader from "./ui/AuthLoader";
export default function GuestRoute({ children }: { children: JSX.Element }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <AuthLoader />;

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return children;
}