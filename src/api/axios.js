import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "http://localhost:3000", // 👈 cambia al puerto de tu backend
});
