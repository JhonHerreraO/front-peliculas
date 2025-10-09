import React, { useEffect, useState } from "react";
import { obtenerMedias } from "@/services/MediaServices";

export default function Home() {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const { data } = await obtenerMedias(); // backend ya devuelve objetos completos
        setMedias(data);
      } catch (error) {
        console.error("Error al cargar las películas:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) return <p className="text-center mt-5">Cargando películas...</p>;
  if (!medias || medias.length === 0)
    return <p className="text-center mt-5 text-secondary">No hay películas disponibles.</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">🎬 Catálogo de Películas</h1>

      <div className="row">
        {medias.map((media, index) => (
          <div key={media._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm" style={{ cursor: "pointer" }}>
              
              {/* Imagen clickeable para collapse */}
              <img
                src={media.imagen || "https://via.placeholder.com/300x400?text=Sin+imagen"}
                className="card-img-top"
                alt={media.titulo}
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${index}`}
                aria-expanded="false"
                aria-controls={`collapse-${index}`}
                style={{ height: "400px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{media.titulo}</h5>

                {/* Información colapsable */}
                <div className="collapse mt-3" id={`collapse-${index}`}>
                  <p><strong>Sinopsis:</strong> {media.sinopsis || "Sin descripción disponible."}</p>
                  <p><strong>Director:</strong> {media.director?.nombre || "No disponible"}</p>
                  <p><strong>Género:</strong> {media.genero?.nombre || "No disponible"}</p>
                  <p><strong>Productora:</strong> {media.productora?.nombre || "No disponible"}</p>
                  <p><strong>Tipo:</strong> {media.tipo?.nombre || "No disponible"}</p>
                </div>

                {/* Botón siempre visible */}
                {media.url && (
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-2"
                  >
                    🎥 Ver película
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
