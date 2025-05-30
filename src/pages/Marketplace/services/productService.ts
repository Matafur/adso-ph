import axios from 'axios';

const API_URL = 'http://localhost:8080/productos';

export interface Comentario {
  id: number;
  contenido: string;
  positivo: boolean;
}

export interface Producto {
  id?: number;
  name: string;
  description: string;
  imagenUrl?: string;
  imagenBase64?: string;
  active: string;
  price: number;
  comentarios?: Comentario[];
}

const getAll = async (token?: string): Promise<Producto[]> => {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getById = async (id: number, token?: string): Promise<Producto> => {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

const create = async (producto: Producto, token?: string): Promise<Producto> => {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
  console.log('Producto a enviar:', producto);
  const response = await axios.post(API_URL, producto, config);
  return response.data;
};

const remove = async (id: number, token?: string): Promise<void> => {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
  await axios.delete(`${API_URL}/${id}`, config);
};

export const productService = {
  getAll,
  getById,
  create,
  remove,
};
