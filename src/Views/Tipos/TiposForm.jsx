import React, { useState, useEffect } from "react";
import {
  CrearTipos,
  obtenerTipos_ID,
  actualizarTipos,
  eliminarTipos
} from "@/services/TiposServices";

export default function TipoForm({ modo, setModo, id, onTipoCreado }) {
  const [datos, setDatos] = useState({ nombre: "", descripcion: "" });
  const [idLocal, setIdLocal] = useState(id || "");

  useEffect(() => {
    if ((modo === "editar" || modo === "actualizar") && idLocal) {
      obtenerTipos_ID(idLocal)
        .then(({ data }) => {
          setDatos({ nombre: data.nombre, descripcion: data.descripcion });
        })
        .catch(() => {
          alert("No se encontró el tipo con ese ID.");
          setDatos({ nombre: "", descripcion: "" });
        });
    }
  }, [modo, idLocal]);

  const limpiar = () => {
    setDatos({ nombre: "", descripcion: "" });
    setIdLocal("");
    if (setModo) setModo(null);
  };

  const handleCrear = async () => {
    if (!datos.nombre.trim()) return alert("El nombre es obligatorio.");
    await CrearTipos(datos);
    limpiar();
    if (onTipoCreado) onTipoCreado();
  };

  const handleActualizar = async () => {
    if (!idLocal || !datos.nombre.trim()) return alert("Completa los campos.");
    await actualizarTipos(idLocal, datos);
    limpiar();
    if (onTipoCreado) onTipoCreado();
  };

  const handleEliminar = async () => {
    if (!idLocal) return alert("Ingresa un ID válido.");
    await eliminarTipos(idLocal);
    limpiar();
    if (onTipoCreado) onTipoCreado();
  };

    return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5 className="mb-3">
        {modo === "crear" && "Crear Tipo"}
        {modo === "actualizar" && "Actualizar por ID"}
        {modo === "eliminar" && "Eliminar por ID"}
        {modo === "editar" && "Editar Tipo"}
      </h5>

      {(modo === "actualizar" || modo === "eliminar") && (
        <input
          type="text"
          className="form-control mb-3"
          placeholder="ID del tipo"
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
            placeholder="Descripción"
            value={datos.descripcion}
            onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
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
        <button className="btn btn-info" onClick={handleActualizar}>Actualizar Tipo</button>
      )}
    </div>
  );
}


