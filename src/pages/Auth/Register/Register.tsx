import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sampleImage from "../../../assets/register-img.jpg"; // reemplaza si tienes una imagen

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contacto: "",
    identificacion: "",
    nacimiento: "",
    apartamento: "",
    torre: "",
    tipoResidente: "",
    password: "",
    confirmarPassword: "",
    aceptar: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;
  
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    navigate("/login");
  };

  return (
    <div className="min-vh-100 d-flex" style={{ backgroundColor: "#f6e7b4" }}>
      {/* Imagen */}
      <div className="d-none d-md-flex justify-content-center align-items-center col-md-6">
        <img
          src={sampleImage}
          alt="registro"
          className="img-fluid"
          style={{ maxWidth: "60%", height: "auto" }}
        />
      </div>

      {/* Formulario */}
      <div className="col-md-4 d-flex align-items-center justify-content-center">
        <div className="p-4 w-100" style={{ maxWidth: "500px" }}>
          <h5 className="text-center" style={{ maxWidth: "500px" }}>
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </h5>
          <h2 className="mb-4 text-center fw-bold">Crea una cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  name="nombres"
                  placeholder="Nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
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
              <div className="col-md-6">
                <input
                  type="text"
                  name="contacto"
                  placeholder="Número de contacto"
                  value={formData.contacto}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  name="identificacion"
                  placeholder="Número de identificación"
                  value={formData.identificacion}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="date"
                  name="nacimiento"
                  placeholder="Fecha de nacimiento"
                  value={formData.nacimiento}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  name="apartamento"
                  placeholder="Número de apartamento"
                  value={formData.apartamento}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <select
                  name="torre"
                  value={formData.torre}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Torre</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={`Torre ${i + 1}`}>
                      Torre {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-12 d-flex justify-content-around">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tipoResidente"
                    value="Propietario"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">Propietario</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tipoResidente"
                    value="Inquilino"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">Inquilino</label>
                </div>
              </div>

              <div className="col-md-6">
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
              <div className="col-md-6">
                <input
                  type="password"
                  name="confirmarPassword"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmarPassword}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="aceptar"
                    checked={formData.aceptar}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">
                    Al crear una cuenta estás aceptando nuestros{" "}
                    <a href="#">términos y condiciones</a>.
                  </label>
                </div>
              </div>

              <div className="col-12 d-grid">
                <button type="submit" className="btn btn-success">
                  Crear usuario
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
