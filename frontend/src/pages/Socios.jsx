import { useEffect, useState } from "react";
import api from "../services/api";

function Socios() {
  const [socios, setSocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarSocios = async () => {
    try {
      setLoading(true);
      const response = await api.get("/socios");
      setSocios(response.data);
    } catch (error) {
      setError("No se pudieron cargar los socios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarSocios();
  }, []);

  return (
    <div className="page-shell">
      <div className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Gestión</p>
            <h1>Socios</h1>
            <p>Listado de miembros activos y su información principal.</p>
          </div>
        </div>

        {loading && <p>Cargando...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>DNI</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {socios.map((socio) => (
                  <tr key={socio.id}>
                    <td>{socio.nombre}</td>
                    <td>{socio.apellido}</td>
                    <td>{socio.dni}</td>
                    <td>{socio.email}</td>
                    <td>{socio.telefono}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Socios;