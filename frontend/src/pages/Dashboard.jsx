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
    <div className="page-shell">
      <div className="dashboard-shell">
        <div className="topbar">
          <div>
            <p className="eyebrow">Panel principal</p>
            <h1>Hola, {user?.nombre || "usuario"}</h1>
            <p>Gestioná socios, planes, pagos y asistencias desde un solo lugar.</p>
          </div>

          <button className="button secondary" onClick={handleLogout}>Cerrar sesión</button>
        </div>

        <div className="cards-grid">
          <Link className="feature-card" to="/socios">
            <h3>Socios</h3>
            <p>Administrá la base de miembros del gimnasio.</p>
          </Link>

          <Link className="feature-card" to="/planes">
            <h3>Planes</h3>
            <p>Revisá y organizá los planes disponibles.</p>
          </Link>

          <Link className="feature-card" to="/pagos">
            <h3>Pagos</h3>
            <p>Controlá los movimientos y pagos registrados.</p>
          </Link>

          <Link className="feature-card" to="/asistencias">
            <h3>Asistencias</h3>
            <p>Mantené el registro de entradas y asistencias.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;