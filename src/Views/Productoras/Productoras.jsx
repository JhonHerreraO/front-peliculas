import React, { useEffect, useRef, useState } from "react";
import {
  obtenerProductoras,
  eliminarProductora,
  obtenerProductora_ID,
  actualizarProductora
} from "@/services/ProductorasServices";

import ProductoraForm from "./ProductorasForm";
import ProductorasList from "./ProductorasList";
import ActualizarPorID from "@/components/ActualizarPorID";

export default function Productoras() {
  const [productoras, setProductoras] = useState([]);
  const [editarID, setEditarID] = useState(null);
  const [modo, setModo] = useState(null);
  const formularioRef = useRef(null);

  const cargarProductoras = async () => {
    const { data } = await obtenerProductoras();
    setProductoras(data);
  };

  const handleEliminar = async (id) => {
    if (!id) return alert("ID inválido.");
    await eliminarProductora(id);
    cargarProductoras();
  };

  useEffect(() => {
    cargarProductoras();
  }, []);

  useEffect(() => {
    if (editarID && formularioRef.current) {
      formularioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editarID]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Productoras Registradas</h2>

      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-success me-2" onClick={() => setModo("crear")}>
          Crear Productora
        </button>
        <button className="btn btn-warning me-2" onClick={() => setModo("actualizar")}>
          Actualizar por ID
        </button>
        <button className="btn btn-danger" onClick={() => setModo("eliminar")}>
          Eliminar por ID
        </button>
      </div>

      {modo === "crear" && (
        <ProductoraForm modo="crear" setModo={setModo} onProductoraCreada={cargarProductoras} />
      )}

      {modo === "actualizar" && (
        <ActualizarPorID
          titulo="Productora"
          obtenerPorID={obtenerProductora_ID}
          actualizar={actualizarProductora}
          campos={[
            { name: "nombre", label: "Nombre" },
            { name: "slogan", label: "Slogan" },
            { name: "descripcion", label: "Descripción", type: "textarea" },
            { name: "estado", label: "Estado", type: "select", options: ["Activo", "Inactivo"] }
          ]}
          onActualizado={() => {
            cargarProductoras();
            setModo(null);
          }}
        />
      )}

      {modo === "eliminar" && (
        <ProductoraForm modo="eliminar" setModo={setModo} onProductoraCreada={cargarProductoras} />
      )}

      <ProductorasList
        productoras={productoras}
        onEditar={(id) => setEditarID(id)}
        onEliminar={handleEliminar}
      />

      {editarID && (
        <div className="mt-4" ref={formularioRef}>
          <h4>Editar Productora</h4>
          <ProductoraForm
            id={editarID}
            modo="editar"
            setModo={setModo}
            onProductoraCreada={() => {
              cargarProductoras();
              setEditarID(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
