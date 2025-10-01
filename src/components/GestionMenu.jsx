import React from "react";
import { Link } from "react-router-dom";

export default function GestionMenu() {
  return (
    <div className="container mt-4">
      <h2>Menú de Gestión</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/gestion/peliculas">Gestión de Películas</Link>
        </li>
        <li className="list-group-item">
          <Link to="/gestion/generos">Gestión de Géneros</Link>
        </li>
        {/* Puedes agregar más luego */}
      </ul>
    </div>
  );
}
