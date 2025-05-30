import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Dashboard from "../pages/Home/Dashboard";
import MainLayout from "../components/layaouts/MainLayout";
import Chat from "../pages/Chat/Chat";
import CommonAreas from "../pages/commonAreas/commonAreas";
import Marketplace from "../pages/Marketplace/marketPlace";
import Payments from "../pages/Payments/payments";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección desde raíz */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas sin sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas con sidebar dentro del layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/CommonAreas" element={<ProtectedRoute><CommonAreas /></ProtectedRoute>} />
          <Route path="/Marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
          <Route path="/Payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
        </Route>

        {/* Ruta para no encontradas */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
