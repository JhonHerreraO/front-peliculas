import React from "react";

export default function TiposList({ tipos, onEditar, onEliminar }) {
  if (!tipos || tipos.length === 0) {
    return <p className="text-muted">No hay tipos disponibles.</p>;
  }

  return (
    <div className="row">
      {tipos.map((tipo) => (
        <div key={tipo._id} className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{tipo.nombre}</h5>
              <p className="card-text">{tipo.descripcion}</p>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => onEditar(tipo._id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (confirm("¿Estás seguro de que quieres eliminar este tipo?")) {
                      onEliminar(tipo._id);
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

