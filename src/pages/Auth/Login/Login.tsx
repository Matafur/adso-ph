import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sampleImage from "../../../assets/register-img.jpg";
import image2 from "../../../assets/San Joaquin.jpg";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al hacer login");

      const data = await response.json();
      if (data.status && data.token) {
        localStorage.setItem("authToken", data.token);
        navigate("/dashboard");
      } else {
        alert("Credenciales incorrectas o respuesta inválida.");
      }
    } catch {
      alert("Credenciales incorrectas o respuesta inválida.");
    }
  };

  return (
    <div className="login-container d-flex min-vh-100">
      {/* Sección izquierda: Carrusel */}
      <div className="carousel-section d-none d-md-block">
        <div
          id="carouselLogin"
          className="carousel slide h-100"
          data-bs-ride="carousel"
          data-bs-interval="3000"
          data-bs-pause="false"
        >
          <div className="carousel-inner h-100">
            <div className="carousel-item active h-100">
              <img src={sampleImage} className="d-block w-100 h-100" alt="Imagen 1" />
            </div>
            <div className="carousel-item h-100">
              <img src={image2} className="d-block w-100 h-100" alt="Imagen 2" />
            </div>
          </div>
        </div>
      </div>

      {/* Sección derecha: Formulario */}
      <div className="form-section d-flex align-items-center justify-content-center bg-white">
        <div className="p-5 w-100" style={{ maxWidth: "400px" }}>
          <h2 className="text-center fw-bold mb-4">Inicia Sesión</h2>
          <p className="text-center mb-3">
            ¿Aún no dispones de una cuenta?{" "}
            <a href="/register" className="text-primary fw-semibold">
              Regístrate aquí
            </a>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 text-center">
              <a href="#" className="text-primary small">
                ¿Olvidaste la contraseña?
              </a>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
