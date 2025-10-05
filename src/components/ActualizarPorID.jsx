import React, { useState, useEffect } from "react";

export default function ActualizarPorID({ 
  titulo = "Actualizar por ID", 
  obtenerPorID, 
  actualizar, 
  campos = [], 
  onActualizado 
}) {
  const [id, setId] = useState("");
  const [datos, setDatos] = useState({});

  useEffect(() => {
    if (id) {
      obtenerPorID(id).then(({ data }) => {
        const nuevosDatos = {};
        campos.forEach(campo => {
          nuevosDatos[campo.name] = data[campo.name] || "";
        });
        setDatos(nuevosDatos);
      });
    }
  }, [id]);

  const handleActualizar = async () => {
    await actualizar(id, datos);
    setId("");
    setDatos({});
    if (onActualizado) onActualizado();
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5>{titulo} por ID</h5>
      <input
        type="text"
        className="form-control mb-2"
        placeholder={`ID del ${titulo.toLowerCase()}`}
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      {campos.map((campo) =>
        campo.type === "textarea" ? (
          <textarea
            key={campo.name}
            className="form-control mb-2"
            placeholder={campo.label}
            value={datos[campo.name] || ""}
            onChange={(e) =>
              setDatos({ ...datos, [campo.name]: e.target.value })
            }
          />
        ) : (
          <input
            key={campo.name}
            type={campo.type || "text"}
            className="form-control mb-2"
            placeholder={campo.label}
            value={datos[campo.name] || ""}
            onChange={(e) =>
              setDatos({ ...datos, [campo.name]: e.target.value })
            }
          />
        )
      )}
      <button className="btn btn-warning" onClick={handleActualizar}>
        Actualizar
      </button>
    </div>
  );
}

