import React from "react";
import { Link } from "react-router-dom";

export default function GestionMenu() {
  const opciones = [
    { nombre: "🎭 Géneros", ruta: "/gestion/generos" },
    { nombre: "🎬 Tipos", ruta: "/gestion/tipos" },
    { nombre: "🎥 Directores", ruta: "/gestion/directores" },
    { nombre: "🏢 Productoras", ruta: "/gestion/productoras" },
    { nombre: "📽️ Medias (Películas / Series)", ruta: "/gestion/media" },
  ];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Panel de Gestión 🎛️</h1>
      <div className="row">
        {opciones.map((item) => (
          <div className="col-md-4 mb-3" key={item.ruta}>
            <Link
              to={item.ruta}
              className="card text-center shadow-sm border-0"
              style={{ textDecoration: "none" }}
            >
              <div className="card-body">
                <h5 className="card-title">{item.nombre}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
