import React, { useState, useEffect } from "react";
import {
  CrearGeneros,
  obtenerGeneros_ID,
  actualizarGeneros,
  eliminarGeneros,
} from "@/Services/GenerosServices";

// 🧾 Componente reutilizable para crear, actualizar, eliminar o editar géneros
export default function GeneroForm({ modo, setModo, id, onGeneroCreado }) {
  // 📌 Estado local para los datos del género
  const [datos, setDatos] = useState({ nombre: "", descripcion: "" });
  const [idLocal, setIdLocal] = useState(id || "");

  // 🔄 Cargar datos si el modo es "editar" o "actualizar"
  useEffect(() => {
    if ((modo === "editar" || modo === "actualizar") && idLocal) {
      obtenerGeneros_ID(idLocal)
        .then(({ data }) => {
          setDatos({ nombre: data.nombre, descripcion: data.descripcion });
        })
        .catch(() => {
          alert("No se encontró el género con ese ID.");
          setDatos({ nombre: "", descripcion: "" });
        });
    }
  }, [modo, idLocal]);

  // 🧹 Limpiar formulario y cerrar modo
  const limpiar = () => {
    setDatos({ nombre: "", descripcion: "" });
    setIdLocal("");
    if (setModo) setModo(null);
  };

  // ✅ Crear nuevo género
  const handleCrear = async () => {
    if (!datos.nombre.trim()) return alert("El nombre es obligatorio.");
    await CrearGeneros(datos);
    limpiar();
    if (onGeneroCreado) onGeneroCreado();
  };

  // ✏️ Actualizar género por ID
  const handleActualizar = async () => {
    if (!idLocal || !datos.nombre.trim()) return alert("Completa los campos.");
    await actualizarGeneros(idLocal, datos);
    limpiar();
    if (onGeneroCreado) onGeneroCreado();
  };

  // 🗑️ Eliminar género por ID
  const handleEliminar = async () => {
    if (!idLocal) return alert("Ingresa un ID válido.");
    await eliminarGeneros(idLocal);
    limpiar();
    if (onGeneroCreado) onGeneroCreado();
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5 className="mb-3">
        {modo === "crear" && "Crear Género"}
        {modo === "actualizar" && "Actualizar por ID"}
        {modo === "eliminar" && "Eliminar por ID"}
        {modo === "editar" && "Editar Género"}
      </h5>

      {/* 🆔 Campo para ID si aplica */}
      {(modo === "actualizar" || modo === "eliminar") && (
        <input
          type="text"
          className="form-control mb-3"
          placeholder="ID del género"
          value={idLocal}
          onChange={(e) => setIdLocal(e.target.value)}
        />
      )}

      {/* 📝 Campos de nombre y descripción si aplica */}
      {(modo === "crear" || modo === "actualizar" || modo === "editar") && (
        <>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nombre"
            value={datos.nombre}
            onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
          />
          <textarea
            className="form-control mb-3"
            placeholder="Descripción"
            value={datos.descripcion}
            onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
          />
        </>
      )}

      {/* 🎯 Botones según modo */}
      {modo === "crear" && (
        <button className="btn btn-primary" onClick={handleCrear}>Crear</button>
      )}
      {modo === "actualizar" && (
        <button className="btn btn-warning" onClick={handleActualizar}>Actualizar</button>
      )}
      {modo === "eliminar" && (
        <button className="btn btn-danger" onClick={handleEliminar}>Eliminar</button>
      )}
      {modo === "editar" && (
        <button className="btn btn-info" onClick={handleActualizar}>Actualizar Género</button>
      )}
    </div>
  );
}

