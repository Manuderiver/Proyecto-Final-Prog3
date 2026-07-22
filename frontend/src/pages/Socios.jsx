import { useEffect, useState } from "react";
import api from "../services/api";

function Socios() {

const [socios, setSocios] = useState([]);

const cargarSocios = async () => {
    try {
    const response = await api.get("/socios");
    setSocios(response.data);
    } catch (error) {
    console.log(error);
    }
};


useEffect(() => {
    cargarSocios();
}, []);


return (
    <div>
    <h1>Socios</h1>

    <table border="1">
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
);
}

export default Socios;