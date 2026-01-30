import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ImageToPdfPage from "./pages/ImageToPdfPage";
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
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          />
          <Route path="/dashboard/pdf/image-to-pdf" element={
            <ProtectedRoute>
              <ImageToPdfPage />
            </ProtectedRoute>
          }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
