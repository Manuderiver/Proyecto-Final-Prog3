import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

        const response = await api.post("/auth/login", {
        email,
        password,
        });

        localStorage.setItem(
        "token",
        response.data.token
        );

        localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
        );

        navigate("/dashboard");

    } catch (err) {

        setError(
        err.response?.data?.error ||
        "Error al iniciar sesión"
        );

    }

    };

    return (

    <div>

        <h1>Sistema Gimnasio</h1>

        <form onSubmit={handleSubmit}>

        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
        />

        <br/>

        <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />

        <br/>

        <button>
        Ingresar
        </button>

    </form>

    {error && <p>{error}</p>}

    </div>

    );

}

export default Login;