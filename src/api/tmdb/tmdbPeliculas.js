// src/services/tmdb/tmdbPeliculas.js
import tmdbAxios from "./tmdbAxios";

export const buscarPeliculas = async (query) => {
  const res = await tmdbAxios.get("/search/movie", {
    params: { query }
  });
  return res.data.results;
};

export const obtenerPeliculaPorID = async (id) => {
  const res = await tmdbAxios.get(`/movie/${id}`);
  return res.data;
};
