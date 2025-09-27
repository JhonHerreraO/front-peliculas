import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5173", // 👈 cambia al puerto de tu backend
});
