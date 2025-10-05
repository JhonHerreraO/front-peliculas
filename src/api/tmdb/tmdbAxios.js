// src/services/tmdb/tmdbAxios.js
import axios from "axios";

const tmdbAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "TU_API_KEY"
  }
});

export default tmdbAxios;
