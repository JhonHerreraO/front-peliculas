import React, { useState, useEffect } from "react";
import {
  crearProductora,
  obtenerProductora_ID,
  actualizarProductora,
  eliminarProductora
} from "@/services/ProductorasServices";

export default function ProductoraForm({ modo, setModo, id, onProductoraCreada }) {
  const [datos, setDatos] = useState({
    nombre: "",
    slogan: "",
    descripcion: "",
    estado: "Activo"
  });
  const [idLocal, setIdLocal] = useState(id || "");

  useEffect(() => {
    if ((modo === "editar" || modo === "actualizar") && idLocal) {
      obtenerProductora_ID(idLocal)
        .then(({ data }) => {
          setDatos({
            nombre: data.nombre,
            slogan: data.slogan,
            descripcion: data.descripcion,
            estado: data.estado ? "Activo" : "Inactivo"
          });
        })
        .catch(() => {
          alert("No se encontró la productora con ese ID.");
          setDatos({ nombre: "", slogan: "", descripcion: "", estado: "Activo" });
        });
    }
  }, [modo, idLocal]);

  const limpiar = () => {
    setDatos({ nombre: "", slogan: "", descripcion: "", estado: "Activo" });
    setIdLocal("");
    if (setModo) setModo(null);
  };

  const handleCrear = async () => {
    if (!datos.nombre.trim()) return alert("El nombre es obligatorio.");

    const payload = {
      ...datos,
      estado: datos.estado === "Activo"
    };

    await crearProductora(payload);
    limpiar();
    if (onProductoraCreada) onProductoraCreada();
  };

  const handleActualizar = async () => {
    if (!idLocal || !datos.nombre.trim()) return alert("Completa los campos.");

    const payload = {
      ...datos,
      estado: datos.estado === "Activo"
    };

    await actualizarProductora(idLocal, payload);
    limpiar();
    if (onProductoraCreada) onProductoraCreada();
  };

  const handleEliminar = async () => {
    if (!idLocal) return alert("Ingresa un ID válido.");
    await eliminarProductora(idLocal);
    limpiar();
    if (onProductoraCreada) onProductoraCreada();
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5 className="mb-3">
        {modo === "crear" && "Crear Productora"}
        {modo === "actualizar" && "Actualizar por ID"}
        {modo === "eliminar" && "Eliminar por ID"}
        {modo === "editar" && "Editar Productora"}
      </h5>

      {(modo === "actualizar" || modo === "eliminar") && (
        <input
          type="text"
          className="form-control mb-3"
          placeholder="ID de la productora"
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
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Slogan"
            value={datos.slogan}
            onChange={(e) => setDatos({ ...datos, slogan: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Descripción"
            value={datos.descripcion}
            onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
          />
          <select
            className="form-control mb-3"
            value={datos.estado}
            onChange={(e) => setDatos({ ...datos, estado: e.target.value })}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
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
        <button className="btn btn-info" onClick={handleActualizar}>Actualizar Productora</button>
      )}
    </div>
  );
}
