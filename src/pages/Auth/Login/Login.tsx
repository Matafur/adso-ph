import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sampleImage from "../../../assets/register-img.jpg"; // usa la misma imagen o reemplaza por otra

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login con:", formData);
    navigate("/dashboard"); // ruta temporal hasta que el dashboard esté implementado
  };

  return (
    <div className="min-vh-100 d-flex" style={{ backgroundColor: "#f6e7b4" }}>
      {/* Imagen */}
      <div className="d-none d-md-flex justify-content-center align-items-center col-md-6">
        <img
          src={sampleImage}
          alt="login"
          className="img-fluid"
          style={{ maxWidth: "60%", height: "auto" }}
        />
      </div>

      {/* Formulario */}
      <div className="col-md-4 d-flex align-items-center justify-content-center">
        <div className="p-4 w-100" style={{ maxWidth: "400px" }}>
          <h2 className="text-center fw-bold mb-4">Inicia Sesión</h2>
          <p className="text-end">
            ¿Aún no dispones de una cuenta?{" "}
            <a href="/register" className="text-primary">
              Regístrate aquí
            </a>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={formData.correo}
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
              <a href="#" className="text-primary">
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
