// src/pages/commonAreas/CommonAreas.tsx
import React, { useEffect, useState } from "react";
import {
  getCommonAreas,
  createCommonArea,
  deleteCommonArea,
} from "./services/commonAreasService";
import { createReservation } from "./services/reservationService";
import { ReservationsList } from "./components/ReservationsList";

interface CommonArea {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
}

export default function CommonAreas() {
  const [espacios, setEspacios] = useState<CommonArea[]>([]);
  const [nuevoEspacio, setNuevoEspacio] = useState<Partial<CommonArea>>({
    nombre: "",
    descripcion: "",
    estado: "DISPONIBLE",
  });
  const [reservaModal, setReservaModal] = useState(false);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState<CommonArea | null>(null);
  const [mostrarReservasId, setMostrarReservasId] = useState<number | null>(null);
  const [reserva, setReserva] = useState({
    fechaInicio: "",
    fechaFin: "",
  });

  useEffect(() => {
    cargarEspacios();
  }, []);

  const cargarEspacios = async () => {
    try {
      const data = await getCommonAreas();
      setEspacios(data);
    } catch (error) {
      console.error("Error cargando espacios comunes", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoEspacio({ ...nuevoEspacio, [name]: value });
  };

  const handleCrear = async () => {
    if (!nuevoEspacio.nombre || !nuevoEspacio.descripcion) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    try {
      await createCommonArea(nuevoEspacio as CommonArea);
      setNuevoEspacio({ nombre: "", descripcion: "", estado: "DISPONIBLE" });
      cargarEspacios();
    } catch (error) {
      console.error("Error al crear espacio", error);
    }
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar este espacio?")) return;
    try {
      await deleteCommonArea(id);
      cargarEspacios();
    } catch (error) {
      console.error("Error al eliminar espacio", error);
    }
  };

  const abrirModalReserva = (espacio: CommonArea) => {
    setEspacioSeleccionado(espacio);
    setReserva({ fechaInicio: "", fechaFin: "" });
    setReservaModal(true);
  };

  const confirmarReserva = async () => {
    if (!reserva.fechaInicio || !reserva.fechaFin || !espacioSeleccionado) {
      alert("Todos los campos son obligatorios para la reserva.");
      return;
    }
    try {
      await createReservation({
        idEspacio: espacioSeleccionado.id,
        fechaInicio: reserva.fechaInicio,
        fechaFin: reserva.fechaFin,
      });
      alert("Reserva creada con éxito");
      setReservaModal(false);
    } catch (error) {
      alert("Error al crear la reserva");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Áreas Comunes</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5>Crear Nueva Área Común</h5>
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                name="nombre"
                value={nuevoEspacio.nombre}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Nombre"
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="descripcion"
                value={nuevoEspacio.descripcion}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Descripción"
              />
            </div>
            <div className="col-md-3">
              <select
                name="estado"
                value={nuevoEspacio.estado}
                onChange={handleChange}
                className="form-select mb-2"
              >
                <option value="DISPONIBLE">DISPONIBLE</option>
                <option value="NO DISPONIBLE">NO DISPONIBLE</option>
              </select>
            </div>
            <div>
              <button className="btn btn-sm btn-primary" onClick={handleCrear}>
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {espacios.map((espacio) => (
          <div className="col-md-6 mb-4" style={{ width: "-webkit-fill-available" }} key={espacio.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{espacio.nombre}</h5>
                <p className="card-text">{espacio.descripcion}</p>
                <span className={`badge ${espacio.estado === "DISPONIBLE" ? "bg-success" : "bg-secondary"}`}>
                  {espacio.estado}
                </span>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleEliminar(espacio.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => abrirModalReserva(espacio)}
                >
                  Reservar
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() =>
                    setMostrarReservasId(
                      mostrarReservasId === espacio.id ? null : espacio.id
                    )
                  }
                >
                  {mostrarReservasId === espacio.id ? "Ocultar Reservas" : "Ver Reservas"}
                </button>
              </div>
              {mostrarReservasId === espacio.id && (
                <div className="p-3 border-top">
                  <ReservationsList espacioId={espacio.id} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {reservaModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reservar: {espacioSeleccionado?.nombre}</h5>
                <button type="button" className="btn-close" onClick={() => setReservaModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Fecha y Hora de Inicio</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={reserva.fechaInicio}
                    onChange={(e) => setReserva({ ...reserva, fechaInicio: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Fecha y Hora de Fin</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={reserva.fechaFin}
                    onChange={(e) => setReserva({ ...reserva, fechaFin: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setReservaModal(false)}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={confirmarReserva}>
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
