// src/services/reservationService.ts
import axios from "axios";

const BASE_URL = "http://localhost:8080";

const authHeader = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createReservation = async (reserva: {
  idEspacio: number;
  fechaInicio: string;
  fechaFin: string;
}) => {
  try {
    const payload = {
      userEntity: { id: 1 }, // TODO: reemplazar con el ID real del usuario autenticado
      spaceCommunalEntity: { id: reserva.idEspacio },
      fechaInicio: `${reserva.fechaInicio}:00`, // Asegura formato completo (HH:mm:ss)
      fechaFin: `${reserva.fechaFin}:00`,
      monto: 0,
      numeroConfirmacion: "AUTO",
      estado: "PENDIENTE",
    };

    const response = await axios.post(
      `${BASE_URL}/reservaciones`,
      payload,
      authHeader()
    );

    return response.data;
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    throw error;
  }
};

export const getAllReservations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reservaciones`, authHeader());
    return response.data;
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    throw error;
  }
};

export const deleteReservation = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/reservaciones/${id}`, authHeader());
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    throw error;
  }
};

