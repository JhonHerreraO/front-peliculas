import { axiosConfig } from "../api/axios";

// CRUD de Productora
export const obtenerProductoras = () => axiosConfig.get("/productoras");
export const obtenerProductora_ID = (id) => axiosConfig.get(`/productoras/${id}`);
export const crearProductora = (data) => axiosConfig.post("/productoras", data);
export const actualizarProductora = (id, data) => axiosConfig.put(`/productoras/${id}`, data);
export const eliminarProductora = (id) => axiosConfig.delete(`/productoras/${id}`);
