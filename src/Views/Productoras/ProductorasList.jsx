import React from "react";

export default function ProductorasList({ productoras, onEditar, onEliminar }) {
  if (!productoras || productoras.length === 0) {
    return <p className="text-muted">No hay productoras registradas.</p>;
  }

  return (
    <div className="row">
      {productoras.map((prod) => (
        <div key={prod._id} className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{prod.nombre}</h5>
              <p className="card-text">{prod.descripcion}</p>
              <small className="text-muted d-block mb-2">{prod.slogan}</small>
              <span className={`badge ${prod.estado === "Activo" ? "bg-success" : "bg-secondary"}`}>
                {prod.estado}
              </span>
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => onEditar(prod._id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (confirm("¿Eliminar esta productora?")) {
                      onEliminar(prod._id);
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
