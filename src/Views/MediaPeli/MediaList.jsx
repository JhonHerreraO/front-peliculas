import React from "react";

export default function MediaList({ medias, onEditar, onEliminar }) {
  if (!medias || medias.length === 0) return <p className="text-center">No hay medias disponibles.</p>;

  return (
    <div className="row">
      {medias.map((media) => (
        <div className="col-md-4 mb-3" key={media._id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{media.titulo}</h5>
              <p className="card-text">{media.descripcion}</p>
              <p className="card-text"><strong>Género:</strong> {media.genero}</p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEditar(media._id)}>Editar</button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    if (window.confirm(`¿Seguro que deseas eliminar "${media.titulo}"?`)) onEliminar(media._id);
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
