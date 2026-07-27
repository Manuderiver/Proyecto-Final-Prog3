import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
    const response = await api.post("/auth/login", {
        email,
        password,
    });

    if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user || {}));
        navigate("/dashboard");
    } else {
        setError("No se recibió un token válido");
    }
    } catch (err) {
    setError(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
    setLoading(false);
    }
};

return (
    <div style={{ maxWidth: "320px", margin: "50px auto", fontFamily: "sans-serif" }}>
    <h1>Sistema Gimnasio</h1>

    <form onSubmit={handleSubmit}>
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
        </button>
    </form>

    {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    );
}

export default Login;