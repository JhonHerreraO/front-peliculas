import React, { useEffect, useRef, useState } from "react";
import {
  obtenerMedias,
  eliminarMedia,
  obtenerMedia_ID,
  actualizarMedia
}from "@/services/MediaServices";


import MediaForm from "./MediaForm";
import MediaList from "./MediaList";
import ActualizarPorID from "@/components/ActualizarPorID";

export default function Media() {
  const [medias, setMedias] = useState([]);
  const [editarID, setEditarID] = useState(null);
  const [modo, setModo] = useState(null);
  const formularioRef = useRef(null);

  const cargarMedias = async () => {
    const { data } = await obtenerMedias();
    setMedias(data);
  };

  const handleEliminar = async (id) => {
    if (!id) return alert("ID inválido.");
    await eliminarMedia(id);
    cargarMedias();
  };

  useEffect(() => {
    cargarMedias();
  }, []);

  useEffect(() => {
    if (editarID && formularioRef.current) {
      formularioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editarID]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Películas y Series</h2>

      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-success me-2" onClick={() => setModo("crear")}>
          Crear Producción
        </button>
        <button className="btn btn-warning me-2" onClick={() => setModo("actualizar")}>
          Actualizar por ID
        </button>
        <button className="btn btn-danger" onClick={() => setModo("eliminar")}>
          Eliminar por ID
        </button>
      </div>

      {modo === "crear" && (
        <MediaForm modo="crear" setModo={setModo} onMediaCreada={cargarMedias} />
      )}

      {modo === "actualizar" && (
        <ActualizarPorID
          titulo="Media"
          obtenerPorID={obtenerMedia_ID}
          actualizar={actualizarMedia}
          campos={[
            { name: "titulo", label: "Título" },
            { name: "sinopsis", label: "Sinopsis", type: "textarea" },
            { name: "url", label: "URL" },
            { name: "imagen", label: "Imagen" },
            { name: "fecha_estreno", label: "Fecha de estreno", type: "date" }
          ]}
          onActualizado={() => {
            cargarMedias();
            setModo(null);
          }}
        />
      )}

      {modo === "eliminar" && (
        <MediaForm modo="eliminar" setModo={setModo} onMediaCreada={cargarMedias} />
      )}

      <MediaList
        medias={medias}
        onEditar={(id) => setEditarID(id)}
        onEliminar={handleEliminar}
      />

      {editarID && (
        <div className="mt-4" ref={formularioRef}>
          <h4>Editar Producción</h4>
          <MediaForm
            id={editarID}
            modo="editar"
            setModo={setModo}
            onMediaCreada={() => {
              cargarMedias();
              setEditarID(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
