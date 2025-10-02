import React from "react";

export default function GenerosList({ generos, onEditar, onEliminar }) {
  return (
    <div className="row">
      {generos.map((genero) => (
        <div className="col-md-4 mb-3" key={genero._id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{genero.nombre}</h5>
              <p className="card-text">{genero.descripcion}</p>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => onEditar(genero._id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onEliminar(genero._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
