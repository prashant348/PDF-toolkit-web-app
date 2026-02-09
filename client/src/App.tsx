import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ImagesToPdfPage from "./pages/ImagesToPdfPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import UnverifiedUserRoute from "./components/UnverifiedUserRoute";
import MergePdfsPage from "./pages/mergePdfsPage";
import SplitPdfPage from "./pages/SplitPdfPage";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={
            <GuestRoute>
              <LogInPage />
            </GuestRoute>
          }
          />
          <Route path="/register" element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
          />
          <Route path="/verify-email" element={
            <UnverifiedUserRoute>
              <VerifyEmailPage />
            </UnverifiedUserRoute>
          }
          />
          <Route path="/confirm-email" element={
            <UnverifiedUserRoute>
              <ConfirmEmailPage />
            </UnverifiedUserRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          />
          <Route path="/dashboard/pdf/images-to-pdf" element={
            <ProtectedRoute>
              <ImagesToPdfPage />
            </ProtectedRoute>
          }
          />
          <Route path="/dashboard/pdf/merge-pdfs" element={
            <ProtectedRoute>
              <MergePdfsPage />
            </ProtectedRoute>
          }
          />
          <Route path="/dashboard/pdf/split-pdf" element={
            <ProtectedRoute>
              <SplitPdfPage />
            </ProtectedRoute>
          }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
