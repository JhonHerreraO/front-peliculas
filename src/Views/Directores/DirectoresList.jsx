import React from "react";

export default function DirectoresList({ directores, onEditar, onEliminar }) {
  if (!directores || directores.length === 0) {
    return <p className="text-muted">No hay directores disponibles.</p>;
  }

  return (
    <div className="row">
      {directores.map((director) => (
        <div key={director._id} className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{director.nombre}</h5>
              <p className="card-text">{director.biografia}</p>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => onEditar(director._id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (confirm("¿Eliminar este director?")) {
                      onEliminar(director._id);
                    }
                  }}
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
