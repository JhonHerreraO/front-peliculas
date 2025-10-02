import React from "react";
import { Link } from "react-router-dom";
import Buscar from "./Buscar";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo o nombre de la app */}
        <Link className="navbar-brand" to="/">Peliculas</Link>

        {/* Botón hamburguesa para móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            {/* Inicio */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>

            {/* Dropdown Gestión */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                id="gestionDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Gestión
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="gestionDropdown">
                <li>
                  <Link className="dropdown-item" to="/gestion/generos">
                    Géneros
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/gestion/directores">
                    Directores
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/gestion/productoras">
                    Productoras
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/gestion/tipos">
                    Tipos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/gestion/media">
                    Películas
                  </Link>
                </li>
              </ul>
              {/* Botón de búsqueda */}
                <Buscar /> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


