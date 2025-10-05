import React, { useContext } from "react";
import { BusquedaContext } from "../../components/BusquedaContex";

export default function MediaList({ medias, peliculasExternas = [], onEditar, onEliminar }) {
  const { termino } = useContext(BusquedaContext);

  const filtradas = termino
    ? medias.filter(media =>
        media.titulo.toLowerCase().includes(termino.toLowerCase())
      )
    : medias;

  return (
    <>
      <div className="row">
        {filtradas.length === 0 ? (
          <p className="text-muted">No se encontraron producciones que coincidan.</p>
        ) : (
          filtradas.map((media) => (
            <div key={media._id} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                {media.imagen && (
                  <img src={media.imagen} className="card-img-top" alt={media.titulo} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{media.titulo}</h5>
                  <p className="card-text">{media.sinopsis}</p>
                  <small className="text-muted d-block mb-2">
                    Estreno: {media.fecha_estreno?.substring(0, 10)}
                  </small>
                  <div className="d-flex justify-content-end">
                    {onEditar && (
                      <button className="btn btn-sm btn-info me-2" onClick={() => onEditar(media._id)}>
                        Editar
                      </button>
                    )}
                    {onEliminar && (
                      <button className="btn btn-sm btn-danger" onClick={() => {
                        if (confirm("¿Eliminar esta producción?")) {
                          onEliminar(media._id);
                        }
                      }}>
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🎥 Películas externas */}
      {peliculasExternas.length > 0 && (
        <>
          <h4 className="mt-5 mb-3 text-center">🎥 Películas desde TMDB</h4>
          <div className="row">
            {peliculasExternas.map((p) => (
              <div key={p.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${p.poster_path}`}
                    alt={p.title}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="card-text">{p.overview}</p>
                    <p className="text-muted">📅 {p.release_date}</p>
                    <a
                      href={`https://www.themoviedb.org/movie/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      Ver en TMDB
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
