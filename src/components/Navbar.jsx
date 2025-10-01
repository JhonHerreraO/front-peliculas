import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background: "#333", padding: "1rem" }}>
      <h2 style={{ color: "white", display: "inline-block", marginRight: "2rem" }}>
        🎬 App Películas
      </h2>
      <Link to="/" style={{ color: "white", marginRight: "1rem" }}>Inicio</Link>
      <Link to="/peliculas" style={{ color: "white", marginRight: "1rem" }}>Películas</Link>
      <Link to="/gestion" style={{ color: "white", marginRight: "1rem" }}>Gestión</Link>
      <input
        type="text"
        placeholder="Buscar..."
        style={{ marginLeft: "2rem", padding: "0.3rem" }}
      />
    </nav>
  );
}
