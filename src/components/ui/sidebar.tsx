import { HomeIcon, CreditCardIcon, MessageCircleIcon, StoreIcon, BuildingIcon, LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí podrías limpiar el almacenamiento y redirigir
    alert("Sesión cerrada");
    navigate("/login");
  };

  return (
    <div className="bg-dark text-white vh-100 p-3 d-flex flex-column" style={{ width: "250px", position: "fixed" }}>
      <h4 className="text-center mb-4">Conjunto Residencial<br />San Joaquín</h4>
      
      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <Link to="/dashboard" className="nav-link text-secondary d-flex align-items-center">
            <HomeIcon className="me-2" size={18} />
            Inicio
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/Payments" className="nav-link text-secondary d-flex align-items-center">
            <CreditCardIcon className="me-2" size={18} />
            Zona de pagos
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/chat" className="nav-link text-secondary d-flex align-items-center">
            <MessageCircleIcon className="me-2" size={18} />
            Chat
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/marketplace" className="nav-link text-secondary d-flex align-items-center">
            <StoreIcon className="me-2" size={18} />
            Marketplace
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/CommonAreas" className="nav-link text-secondary d-flex align-items-center">
            <BuildingIcon className="me-2" size={18} />
            Zonas comunes
          </Link>
        </li>
      </ul>

      <div className="mt-auto">
        <button className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center" onClick={handleLogout}>
          <LogOutIcon className="me-2" size={18} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
