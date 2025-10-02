import React, { useState, useEffect } from "react";
import { obtenerGeneros_ID, actualizarGeneros } from "../services/GenerosServices";

export default function ActualizarPorID({ onActualizado }) {
  const [id, setId] = useState("");
  const [datos, setDatos] = useState({ nombre: "", descripcion: "" });

  useEffect(() => {
    if (id) {
      obtenerGeneros_ID(id).then(({ data }) => {
        setDatos({ nombre: data.nombre, descripcion: data.descripcion });
      });
    }
  }, [id]);

  const handleActualizar = async () => {
    await actualizarGeneros(id, datos);
    setId("");
    setDatos({ nombre: "", descripcion: "" });
    if (onActualizado) onActualizado();
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5>Actualizar Género por ID</h5>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="ID del género"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
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
      <button className="btn btn-warning" onClick={handleActualizar}>Actualizar</button>
    </div>
  );
}
