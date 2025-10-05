import axios from "axios";

const API_URL = "http://localhost:3000/directores";

export const obtenerDirectores = () => axios.get(API_URL);
export const obtenerDirector_ID = (id) => axios.get(`${API_URL}/${id}`);
export const crearDirector = (data) => axios.post(API_URL, data);
export const actualizarDirector = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const eliminarDirector = (id) => axios.delete(`${API_URL}/${id}`);
