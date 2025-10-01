import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Mi App</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Inicio */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>

            {/* Películas */}
            <li className="nav-item">
              <Link className="nav-link" to="/peliculas">Películas</Link>
            </li>

            {/* Dropdown Gestión */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="gestionDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Gestión
              </a>
              <ul className="dropdown-menu" aria-labelledby="gestionDropdown">
                <li>
                  <Link className="dropdown-item" to="/gestion/generos">
                    Gestión de Géneros
                  </Link>
                </li>
                {/* Agregar más servicios aquí cuando estén listos */}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

