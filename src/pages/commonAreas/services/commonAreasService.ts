import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Función que obtiene el token del localStorage y lo incluye en los headers
const authHeader = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCommonAreas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/espacio-comunal`, authHeader());
    return response.data;
  } catch (error) {
    console.error("Error al obtener los espacios comunes:", error);
    return [];
  }
};

export const createCommonArea = async (espacio: {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/espacio-comunal`, espacio, authHeader());
    return response.data;
  } catch (error) {
    console.error("Error al crear el espacio comun:", error);
    throw error;
  }
};

export const updateCommonArea = async (
  id: number,
  espacio: {
    nombre: string;
    descripcion: string;
    estado: string;
  }
) => {
  try {
    const response = await axios.put(`${BASE_URL}/espacio-comunal/${id}`, espacio, authHeader());
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el espacio comun:", error);
    throw error;
  }
};

export const deleteCommonArea = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/espacio-comunal/${id}`, authHeader());
  } catch (error) {
    console.error("Error al eliminar el espacio comun:", error);
    throw error;
  }
};
