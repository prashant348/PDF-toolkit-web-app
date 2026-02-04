
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { type JSX } from "react";
import { PDFProvider } from "../contexts/pdfContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    // pdf services should be only available to authenticated users
    <PDFProvider> 
      {children}
    </PDFProvider>
  );
}
