

import { axiosConfig } from "../api/axios";

export const obtenerDirectores = () => axiosConfig.get("/directores");
export const obtenerDirector_ID = (id) => axiosConfig.get(`/directores/${id}`);
export const crearDirector = (data) => axiosConfig.post("/directores", data);
export const actualizarDirector = (id, data) => axiosConfig.put(`/directores/${id}`, data);
export const eliminarDirector = (id) => axiosConfig.delete(`/directores/${id}`);
