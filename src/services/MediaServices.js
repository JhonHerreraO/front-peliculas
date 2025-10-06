import axios from "axios";

const API_URL = "http://localhost:3000"; // Ajusta si tu backend está en otro puerto

// CRUD de Media
export const obtenerMedias = () => axios.get(`${API_URL}/medias`);
export const obtenerMedia_ID = (id) => axios.get(`${API_URL}/medias/${id}`);
export const crearMedia = (data) => axios.post(`${API_URL}/medias`, data);
export const actualizarMedia = (id, data) => axios.put(`${API_URL}/medias/${id}`, data);
export const eliminarMedia = (id) => axios.delete(`${API_URL}/medias/${id}`);

// Funciones para los selects
export const obtenerGeneros = () => axios.get(`${API_URL}/generos`);
export const obtenerDirectores = () => axios.get(`${API_URL}/directores`);
export const obtenerProductoras = () => axios.get(`${API_URL}/productoras`);
export const obtenerTipos = () => axios.get(`${API_URL}/tipos`);
