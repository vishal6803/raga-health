import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

export default function App() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Done checking
    });

    return () => unsubscribe(); // Cleanup
  }, [setUser, setLoading]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
