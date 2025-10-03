// 📦 Importaciones necesarias
import React, { useEffect, useState } from "react";

// 🔧 Importa funciones del servicio de géneros (API)
import { obtenerGeneros, eliminarGeneros } from "@/Services/GenerosServices";

// 🎨 Importa componentes visuales
import GenerosList from "./GenerosList";
import GeneroForm from "./GenerosForm";
import ActualizarPorID from "@/components/ActualizarPorID";

// 🧠 Componente principal
export default function Generos() {
  // 📌 Estados para manejar la lista, edición y modo de acción
  const [generos, setGeneros] = useState([]);
  const [editarID, setEditarID] = useState(null);
  const [modo, setModo] = useState(null);

  // 🔄 Método para cargar todos los géneros desde el backend
  const cargarGeneros = async () => {
    const { data } = await obtenerGeneros();
    setGeneros(data);
  };

  // 🗑️ Método para eliminar un género por ID
  const handleEliminar = async (id) => {
    await eliminarGeneros(id);
    cargarGeneros();
  };

  // 🚀 Carga los géneros al montar el componente
  useEffect(() => {
    cargarGeneros();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Géneros Disponibles</h2>

      {/* 🧭 Menú de acciones fijo arriba */}
      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-success me-2" onClick={() => setModo("crear")}>Crear Género</button>
        <button className="btn btn-warning me-2" onClick={() => setModo("actualizar")}>Actualizar por ID</button>
        <button className="btn btn-danger" onClick={() => setModo("eliminar")}>Eliminar por ID</button>
      </div>

      {/* 🧾 Formulario dinámico según modo */}
      {(modo === "crear" || modo === "actualizar" || modo === "eliminar") && (
        <GeneroForm
          modo={modo}
          setModo={setModo}
          onGeneroCreado={cargarGeneros}
        />
      )}

      {/* 🗂️ Listado de géneros con botones individuales */}
      <GenerosList
        generos={generos}
        onEditar={(id) => setEditarID(id)}
        onEliminar={handleEliminar}
      />

      {/* ✏️ Formulario de edición desde una card */}
      {editarID && (
        <div className="mt-4">
          <h4>Editar Género</h4>
          <GeneroForm
            id={editarID}
            modo="editar"
            setModo={setModo}
            onGeneroCreado={() => {
              cargarGeneros();
              setEditarID(null);
            }}
          />
        </div>
      )}
    </div>
  );
}

