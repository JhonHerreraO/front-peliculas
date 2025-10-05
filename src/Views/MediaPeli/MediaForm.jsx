import React, { useState, useEffect } from "react";
import {
  crearMedia,
  obtenerMedia_ID,
  actualizarMedia
} from "@/services/MediaServices";

import { obtenerGeneros } from "@/services/GenerosServices";
import { obtenerDirectores } from "@/services/DirectoresServices";
import { obtenerProductoras } from "@/services/ProductorasServices";
import { obtenerTipos } from "@/services/TiposServices";

export default function MediaForm({ modo, setModo, id, onMediaCreada }) {
  const [datos, setDatos] = useState({
    serial: "",
    titulo: "",
    sinopsis: "",
    url: "",
    imagen: "",
    fecha_estreno: "",
    generos_id: [],
    directores_id: [],
    productoras_id: [],
    tipos_id: ""
  });

  const [idLocal, setIdLocal] = useState(id || "");
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    obtenerGeneros().then(({ data }) => {
      console.log("🎭 Géneros:", data);
      setGeneros(data.filter(g => g.estado === true));
    });

    obtenerDirectores().then(({ data }) => {
      console.log("🎥 Directores:", data);
      setDirectores(data.filter(d => d.estado === true));
    });

    obtenerProductoras().then(({ data }) => {
      console.log("🏢 Productoras:", data);
      setProductoras(data.filter(p => p.estado === true));
    });

    obtenerTipos().then(({ data }) => {
      console.log("📦 Tipos:", data);
      setTipos(data);
    });
  }, []);

  useEffect(() => {
    if ((modo === "editar" || modo === "actualizar") && idLocal) {
      obtenerMedia_ID(idLocal)
        .then(({ data }) => {
          console.log("✏️ Cargando media para edición:", data);
          const fechaFormateada = data.fecha_estreno?.slice(0, 10);
          setDatos({ ...data, fecha_estreno: fechaFormateada });
        })
        .catch(() => alert("No se encontró la producción con ese ID."));
    }
  }, [modo, idLocal]);

  const limpiar = () => {
    setDatos({
      serial: "",
      titulo: "",
      sinopsis: "",
      url: "",
      imagen: "",
      fecha_estreno: "",
      generos_id: [],
      directores_id: [],
      productoras_id: [],
      tipos_id: ""
    });
    setIdLocal("");
    if (setModo) setModo(null);
  };

  const handleGuardar = async () => {
    if (!datos.serial || !datos.titulo || !datos.url) {
      alert("Completa los campos obligatorios.");
      return;
    }

    if (
      !datos.tipos_id ||
      datos.generos_id.length === 0 ||
      datos.directores_id.length === 0 ||
      datos.productoras_id.length === 0
    ) {
      alert("Selecciona tipo, género, director y productora.");
      return;
    }

    const payload = {
      serial: datos.serial,
      titulo: datos.titulo,
      sinopsis: datos.sinopsis,
      url: datos.url,
      imagen: datos.imagen,
      fecha_estreno: datos.fecha_estreno,
      tipos_id: datos.tipos_id,
      generos_id: datos.generos_id,
      directores_id: datos.directores_id,
      productoras_id: datos.productoras_id
    };

    try {
      if (modo === "editar" || modo === "actualizar") {
        console.log("✏️ Actualizando:", payload);
        await actualizarMedia(idLocal, payload);
        alert("✅ Producción actualizada.");
      } else {
        console.log("📤 Creando:", payload);
        await crearMedia(payload);
        alert("✅ Producción creada.");
      }

      limpiar();
      if (onMediaCreada) onMediaCreada();
    } catch (error) {
      console.error("❌ Error al guardar:", error.response?.data || error.message);
      alert("No se pudo guardar la producción. Revisa los campos.");
    }
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5 className="mb-3">
        {modo === "editar" || modo === "actualizar" ? "Editar Producción" : "Crear Producción"}
      </h5>

      <label className="form-label">Serial único <span className="text-danger">*</span></label>
      <input
        type="text"
        className="form-control mb-2"
        value={datos.serial}
        onChange={(e) => setDatos({ ...datos, serial: e.target.value })}
      />

      <label className="form-label">Título <span className="text-danger">*</span></label>
      <input
        type="text"
        className="form-control mb-2"
        value={datos.titulo}
        onChange={(e) => setDatos({ ...datos, titulo: e.target.value })}
      />

      <label className="form-label">Sinopsis</label>
      <textarea
        className="form-control mb-2"
        value={datos.sinopsis}
        onChange={(e) => setDatos({ ...datos, sinopsis: e.target.value })}
      />

      <label className="form-label">URL del video <span className="text-danger">*</span></label>
      <input
        type="text"
        className="form-control mb-2"
        value={datos.url}
        onChange={(e) => setDatos({ ...datos, url: e.target.value })}
      />

      <label className="form-label">Imagen de portada (URL)</label>
      <input
        type="text"
        className="form-control mb-2"
        value={datos.imagen}
        onChange={(e) => setDatos({ ...datos, imagen: e.target.value })}
      />

      <label className="form-label">Fecha de estreno</label>
      <input
        type="date"
        className="form-control mb-3"
        value={datos.fecha_estreno || ""}
        onChange={(e) => setDatos({ ...datos, fecha_estreno: e.target.value })}
      />

      <label className="form-label">Tipo <span className="text-danger">*</span></label>
      <select
        className="form-control mb-2"
        value={datos.tipos_id}
        onChange={(e) => setDatos({ ...datos, tipos_id: e.target.value })}
      >
        <option value="">Selecciona tipo</option>
        {tipos.map(tipo => (
          <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
        ))}
      </select>

      <label className="form-label">Género <span className="text-danger">*</span></label>
      <select
        className="form-control mb-2"
        value={datos.generos_id[0] || ""}
        onChange={(e) => setDatos({ ...datos, generos_id: [e.target.value] })}
      >
        <option value="">Selecciona género</option>
        {generos.map(g => (
          <option key={g._id} value={g._id}>{g.nombre}</option>
        ))}
      </select>

      <label className="form-label">Director <span className="text-danger">*</span></label>
      <select
        className="form-control mb-2"
        value={datos.directores_id[0] || ""}
        onChange={(e) => setDatos({ ...datos, directores_id: [e.target.value] })}
      >
        <option value="">Selecciona director</option>
        {directores.map(d => (
          <option key={d._id} value={d._id}>{d.nombre}</option>
        ))}
      </select>

      <label className="form-label">Productora <span className="text-danger">*</span></label>
      <select
        className="form-control mb-3"
        value={datos.productoras_id[0] || ""}
        onChange={(e) => setDatos({ ...datos, productoras_id: [e.target.value] })}
      >
        <option value="">Selecciona productora</option>
        {productoras.map(p => (
          <option key={p._id} value={p._id}>{p.nombre}</option>
        ))}
      </select>

      <button className="btn btn-primary" onClick={handleGuardar}>
        {modo === "editar" || modo === "actualizar" ? "Actualizar Producción" : "Crear Producción"}
      </button>

      <small className="text-muted mt-2 d-block">
        Los campos marcados con <span className="text-danger">*</span> son obligatorios.
      </small>
    </div>
  );
}
