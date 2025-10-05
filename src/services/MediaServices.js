import axios from "axios";

const API_URL = "http://localhost:3000/medias"; 


export const obtenerMedias = () => axios.get(API_URL);

export const obtenerMedia_ID = (id) => axios.get(`${API_URL}/${id}`);

export const crearMedia = (data) => axios.post(API_URL, data);

export const actualizarMedia = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const eliminarMedia = (id) => axios.delete(`${API_URL}/${id}`);

export const buscarProduccionesLocales = async (query) => {
  const res = await axios.get(`/medias?search=${query}`);
  return res.data;
};
