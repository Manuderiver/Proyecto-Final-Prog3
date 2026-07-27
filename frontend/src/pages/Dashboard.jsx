import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <h3>Bienvenido {user?.nombre || "usuario"}</h3>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/socios" style={{ marginRight: "10px" }}>Socios</Link>
        <Link to="/planes" style={{ marginRight: "10px" }}>Planes</Link>
        <Link to="/pagos" style={{ marginRight: "10px" }}>Pagos</Link>
        <Link to="/asistencias">Asistencias</Link>
      </nav>

      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;