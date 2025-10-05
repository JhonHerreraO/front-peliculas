import React, { useEffect, useRef, useState } from "react";

// 🔧 Servicios del backend
import {
  obtenerDirectores,
  eliminarDirector,
  obtenerDirector_ID,
  actualizarDirector
} from "@/services/DirectoresServices";

// 🎨 Componentes visuales
import DirectorForm from "./DirectoresForm";
import DirectoresList from "./DirectoresList";
import ActualizarPorID from "@/components/ActualizarPorID";

// 🧠 Componente principal
export default function Directores() {
  const [directores, setDirectores] = useState([]);
  const [editarID, setEditarID] = useState(null);
  const [modo, setModo] = useState(null);
  const formularioRef = useRef(null);

  // 🔄 Cargar todos los directores
  const cargarDirectores = async () => {
    const { data } = await obtenerDirectores();
    setDirectores(data);
  };

  // 🗑️ Eliminar director por ID
  const handleEliminar = async (id) => {
    if (!id) return alert("ID inválido.");
    await eliminarDirector(id);
    cargarDirectores();
  };

  // 🚀 Cargar al montar
  useEffect(() => {
    cargarDirectores();
  }, []);

  // 🧭 Scroll automático al editar
  useEffect(() => {
    if (editarID && formularioRef.current) {
      formularioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editarID]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Directores Registrados</h2>

      {/* 🧭 Menú de acciones */}
      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-success me-2" onClick={() => setModo("crear")}>
          Crear Director
        </button>
        <button className="btn btn-warning me-2" onClick={() => setModo("actualizar")}>
          Actualizar por ID
        </button>
        <button className="btn btn-danger" onClick={() => setModo("eliminar")}>
          Eliminar por ID
        </button>
      </div>

      {/* 🧾 Formulario dinámico */}
      {modo === "crear" && (
        <DirectorForm modo="crear" setModo={setModo} onDirectorCreado={cargarDirectores} />
      )}

      {modo === "actualizar" && (
        <ActualizarPorID
          titulo="Director"
          obtenerPorID={obtenerDirector_ID}
          actualizar={actualizarDirector}
          campos={[
            { name: "nombre", label: "Nombre" },
            { name: "biografia", label: "Biografía", type: "textarea" }
          ]}
          onActualizado={() => {
            cargarDirectores();
            setModo(null);
          }}
        />
      )}

      {modo === "eliminar" && (
        <DirectorForm modo="eliminar" setModo={setModo} onDirectorCreado={cargarDirectores} />
      )}

      {/* 🗂️ Listado de directores */}
      <DirectoresList
        directores={directores}
        onEditar={(id) => setEditarID(id)}
        onEliminar={handleEliminar}
      />

      {/* ✏️ Formulario de edición desde card */}
      {editarID && (
        <div className="mt-4" ref={formularioRef}>
          <h4>Editar Director</h4>
          <DirectorForm
            id={editarID}
            modo="editar"
            setModo={setModo}
            onDirectorCreado={() => {
              cargarDirectores();
              setEditarID(null);
            }}
          />
        </div>
      )}
    </div>
  );
}

