import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Buscar() {
  const [termino, setTermino] = useState("");
  const navigate = useNavigate();

  const manejarBusqueda = (e) => {
    e.preventDefault();
    if (termino.trim() !== "") {
      navigate(`/buscar?query=${encodeURIComponent(termino.trim())}`);
    }
  };

  return (
    <form className="d-flex me-3" onSubmit={manejarBusqueda}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Buscar película..."
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
      />
      <button className="btn btn-outline-warning" type="submit">
        Buscar
      </button>
    </form>
  );
}