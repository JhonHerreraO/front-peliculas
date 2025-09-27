import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Medias from "./pages/Medias";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ margin: "1rem" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Inicio</Link>
        <Link to="/medias">Medias</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Bienvenido a la App de Películas 🎬</h1>} />
        <Route path="/medias" element={<Medias />} />
      </Routes>
    </BrowserRouter>
  );
}
