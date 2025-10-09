import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "https://back-peliculas-wxsw.onrender.com",
});
