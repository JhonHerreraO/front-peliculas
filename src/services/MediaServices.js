import { axiosConfig } from "../api/axios";

// CRUD de Media
export const obtenerMedias = () => axiosConfig.get("/medias");
export const obtenerMedia_ID = (id) => axiosConfig.get(`/medias/${id}`);
export const crearMedia = (data) => axiosConfig.post("/medias", data);
export const actualizarMedia = (id, data) => axiosConfig.put(`/medias/${id}`, data);
export const eliminarMedia = (id) => axiosConfig.delete(`/medias/${id}`);

// Funciones para los selects
export const obtenerGeneros = () => axiosConfig.get("/generos");
export const obtenerDirectores = () => axiosConfig.get("/directores");
export const obtenerProductoras = () => axiosConfig.get("/productoras");
export const obtenerTipos = () => axiosConfig.get("/tipos");

