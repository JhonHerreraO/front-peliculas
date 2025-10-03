import React, { useEffect, useState } from "react";
import {
  obtenerTipos,
  eliminarTipos
} from "@/services/TiposServices";
import TiposList from "./TiposList";
import TipoForm from "./TiposForm";

export default function Tipos() {
  const [tipos, setTipos] = useState([]);
  const [editarID, setEditarID] = useState(null);
  const [modo, setModo] = useState(null);

  const cargarTipos = async () => {
    const { data } = await obtenerTipos();
    setTipos(data);
  };

  const handleEliminar = async (id) => {
    await eliminarTipos(id);
    cargarTipos();
  };

  useEffect(() => {
    cargarTipos();
  }, []);

    return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Tipos Disponibles</h2>

      {/* Menú de acciones */}
      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-success me-2" onClick={() => setModo("crear")}>Crear Tipo</button>
        <button className="btn btn-warning me-2" onClick={() => setModo("actualizar")}>Actualizar por ID</button>
        <button className="btn btn-danger" onClick={() => setModo("eliminar")}>Eliminar por ID</button>
      </div>

      {/* Formulario dinámico */}
      {(modo === "crear" || modo === "actualizar" || modo === "eliminar") && (
        <TipoForm
          modo={modo}
          setModo={setModo}
          onTipoCreado={cargarTipos}
        />
      )}

      {/* Listado de tipos */}
      <TiposList
        tipos={tipos}
        onEditar={(id) => setEditarID(id)}
        onEliminar={handleEliminar}
      />

      {/* Formulario de edición desde card */}
      {editarID && (
        <div className="mt-4">
          <h4>Editar Tipo</h4>
          <TipoForm
            id={editarID}
            modo="editar"
            setModo={setModo}
            onTipoCreado={() => {
              cargarTipos();
              setEditarID(null);
            }}
          />
        </div>
      )}
    </div>
  );
}

