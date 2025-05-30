import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sampleImage from "../../../assets/register-img.jpg";
import image2 from "../../../assets/San Joaquin.jpg";

export default function Register() {
  const navigate = useNavigate();

  // Estado para los datos del formulario
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

  // Estado para mostrar error
  const [error, setError] = useState<string | null>(null);

  // Maneja cambios en inputs y selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? (target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Maneja el submit del formulario
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  if (formData.password !== formData.confirmarPassword) {
    setError("Las contraseñas no coinciden");
    return;
  }

  const formatDateToDDMMYYYY = (isoDate: string) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  const formattedDate = formatDateToDDMMYYYY(formData.nacimiento);
  console.log("Fecha original:", formData.nacimiento);
  console.log("Fecha formateada:", formattedDate);

  const payload = {
    password: formData.password,
    email: formData.correo,
    nombres: formData.nombres,
    appellidos: formData.apellidos,
    numumeroDocumento: formData.identificacion,
    fechaNacimiento: formattedDate,
    telefono: formData.contacto,
    datosApartmento: {
      id: 9007199254740991,
      ciudad: "string",
      numeroApartamento: formData.apartamento,
      numeroTorre: formData.torre,
    },
  };

  try {
    const res = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.message || "Error en el registro");
      return;
    }

    const data = await res.json();
    console.log("Registro exitoso:", data);

    navigate("/login");
  } catch (error) {
    setError("Error de conexión con el servidor");
    console.error(error);
  }
};


  return (
    <div className="min-vh-100 d-flex" style={{ backgroundColor: "#ffffff" }}>
      {/* Imagen */}
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

      {/* Formulario */}
      <div className="col-md-4 d-flex align-items-center justify-content-center">
        <div className="p-4 w-100" style={{ maxWidth: "500px" }}>
          <h5 className="text-center" style={{ maxWidth: "500px" }}>
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </h5>
          <h2 className="mb-4 text-center fw-bold">Crea una cuenta</h2>

          {/* Mostrar error si existe */}
          {error && <div className="alert alert-danger">{error}</div>}

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
                    checked={formData.tipoResidente === "Propietario"}
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
                    checked={formData.tipoResidente === "Inquilino"}
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
