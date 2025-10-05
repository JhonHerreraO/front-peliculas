import React, { useState, useEffect } from "react";
import {
  crearDirector,
  obtenerDirector_ID,
  actualizarDirector,
  eliminarDirector
} from "@/services/DirectoresServices";

export default function DirectorForm({ modo, setModo, id, onDirectorCreado }) {
  const [datos, setDatos] = useState({ nombre: "", biografia: "" });
  const [idLocal, setIdLocal] = useState(id || "");

  useEffect(() => {
    if ((modo === "editar" || modo === "actualizar") && idLocal) {
      obtenerDirector_ID(idLocal)
        .then(({ data }) => {
          setDatos({ nombre: data.nombre, biografia: data.biografia });
        })
        .catch(() => {
          alert("No se encontró el director con ese ID.");
          setDatos({ nombre: "", biografia: "" });
        });
    }
  }, [modo, idLocal]);

  const limpiar = () => {
    setDatos({ nombre: "", biografia: "" });
    setIdLocal("");
    if (setModo) setModo(null);
  };

  const handleCrear = async () => {
    if (!datos.nombre.trim()) return alert("El nombre es obligatorio.");
    await crearDirector(datos);
    limpiar();
    if (onDirectorCreado) onDirectorCreado();
  };

  const handleActualizar = async () => {
    if (!idLocal || !datos.nombre.trim()) return alert("Completa los campos.");
    await actualizarDirector(idLocal, datos);
    limpiar();
    if (onDirectorCreado) onDirectorCreado();
  };

  const handleEliminar = async () => {
    if (!idLocal) return alert("Ingresa un ID válido.");
    await eliminarDirector(idLocal);
    limpiar();
    if (onDirectorCreado) onDirectorCreado();
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5 className="mb-3">
        {modo === "crear" && "Crear Director"}
        {modo === "actualizar" && "Actualizar por ID"}
        {modo === "eliminar" && "Eliminar por ID"}
        {modo === "editar" && "Editar Director"}
      </h5>

      {(modo === "actualizar" || modo === "eliminar") && (
        <input
          type="text"
          className="form-control mb-3"
          placeholder="ID del director"
          value={idLocal}
          onChange={(e) => setIdLocal(e.target.value)}
        />
      )}

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
            placeholder="Biografía"
            value={datos.biografia}
            onChange={(e) => setDatos({ ...datos, biografia: e.target.value })}
          />
        </>
      )}

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
        <button className="btn btn-info" onClick={handleActualizar}>Actualizar Director</button>
      )}
    </div>
  );
}
