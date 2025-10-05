
import React, { useEffect, useRef, useState } from "react";


import {
  obtenerTipos,
  eliminarTipos,
  obtenerTipos_ID,
  actualizarTipos
} from "@/services/TiposServices";


import TipoForm from "./TiposForm";
import TiposList from "./TiposList";
import ActualizarPorID from "@/components/ActualizarPorID";


export default function Tipos() {
 
  const [tipos, setTipos] = useState([]);
  const [editarID, setEditarID] = useState(null);
  const [modo, setModo] = useState(null);

 
  const formularioRef = useRef(null);

  
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


  useEffect(() => {
    if (editarID && formularioRef.current) {
      formularioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editarID]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Tipos Disponibles</h2>

      {/* 🧭 Menú de acciones fijo arriba */}
      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-success me-2" onClick={() => setModo("crear")}>
          Crear Tipo
        </button>
        <button className="btn btn-warning me-2" onClick={() => setModo("actualizar")}>
          Actualizar por ID
        </button>
        <button className="btn btn-danger" onClick={() => setModo("eliminar")}>
          Eliminar por ID
        </button>
      </div>

      {/* 🧾 Formulario dinámico según modo */}
      {modo === "crear" && (
        <TipoForm
          modo="crear"
          setModo={setModo}
          onTipoCreado={cargarTipos}
        />
      )}

      {modo === "actualizar" && (
        <ActualizarPorID
          titulo="Tipo"
          obtenerPorID={obtenerTipos_ID}
          actualizar={actualizarTipos}
          campos={[
            { name: "nombre", label: "Nombre" },
            { name: "descripcion", label: "Descripción", type: "textarea" }
          ]}
          onActualizado={() => {
            cargarTipos();
            setModo(null);
          }}
        />
      )}

      {modo === "eliminar" && (
        <TipoForm
          modo="eliminar"
          setModo={setModo}
          onTipoCreado={cargarTipos}
        />
      )}

      {/* 🗂️ Listado de tipos con botones individuales */}
      <TiposList
        tipos={tipos}
        onEditar={(id) => setEditarID(id)}
        onEliminar={handleEliminar}
      />

      {/* ✏️ Formulario de edición desde una card */}
      {editarID && (
        <div className="mt-4" ref={formularioRef}>
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
