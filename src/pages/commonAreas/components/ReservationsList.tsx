// src/pages/commonAreas/components/ReservationsList.tsx
import React, { useEffect, useState } from "react";
import { getAllReservations, deleteReservation } from "../services/reservationService";

interface Reserva {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  spaceCommunalEntity: {
    id: number;
    nombre: string;
  };
  userEntity: {
    id: number;
    nombre?: string;
  };
}

interface Props {
  espacioId?: number;
}

export function ReservationsList({ espacioId }: Props) {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarReservas = async () => {
    try {
      const data = await getAllReservations();
      const filtradas = espacioId
        ? data.filter((r: Reserva) => r.spaceCommunalEntity.id === espacioId)
        : data;
      setReservas(filtradas);
    } catch (error) {
        console.log(error,error)
      alert("Error al cargar las reservas");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta reserva?")) {
      try {
        await deleteReservation(id);
        alert("Reserva eliminada correctamente");
        cargarReservas();
      } catch (error) {
        console.log(error,error)
        alert("Error al eliminar la reserva");
      }
    }
  };

  useEffect(() => {
    cargarReservas();
  }, [espacioId]);

  if (loading) return <p>Cargando reservas...</p>;

  if (reservas.length === 0) return <p>No hay reservas registradas.</p>;

  return (
    <table className="table table-sm table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Usuario</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {reservas.map((r) => (
          <tr key={r.id}>
            <td>{r.id}</td>
            <td>{new Date(r.fechaInicio).toLocaleString()}</td>
            <td>{new Date(r.fechaFin).toLocaleString()}</td>
            <td>{r.userEntity?.nombre || `ID ${r.userEntity.id}`}</td>
            <td>
              <span className={`badge ${r.estado === "PENDIENTE" ? "bg-warning" : "bg-success"}`}>
                {r.estado}
              </span>
            </td>
            <td>
              <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(r.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
