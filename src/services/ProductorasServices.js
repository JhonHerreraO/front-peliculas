import axios from "axios";

const API_URL = "http://localhost:3000/productoras";

export const obtenerProductoras = () => axios.get(API_URL);
export const obtenerProductora_ID = (id) => axios.get(`${API_URL}/${id}`);
export const crearProductora = (data) => axios.post(API_URL, data);
export const actualizarProductora = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const eliminarProductora = (id) => axios.delete(`${API_URL}/${id}`);
