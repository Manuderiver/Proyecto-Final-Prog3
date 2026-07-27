import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Socios from "./pages/Socios";
import Planes from "./pages/Planes";
import Pagos from "./pages/Pagos";
import Asistencias from "./pages/Asistencias";

import "./App.css";

function App() {
  const isAuthenticated = () => Boolean(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/socios" element={isAuthenticated() ? <Socios /> : <Navigate to="/" />} />
        <Route path="/planes" element={isAuthenticated() ? <Planes /> : <Navigate to="/" />} />
        <Route path="/pagos" element={isAuthenticated() ? <Pagos /> : <Navigate to="/" />} />
        <Route path="/asistencias" element={isAuthenticated() ? <Asistencias /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;