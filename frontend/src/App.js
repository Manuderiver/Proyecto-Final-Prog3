import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Socios from "./pages/Socios";
import Planes from "./pages/Planes";
import Pagos from "./pages/Pagos";
import Asistencias from "./pages/Asistencias";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/socios" element={<Socios />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/asistencias" element={<Asistencias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;