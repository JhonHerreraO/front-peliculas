import React, { useState, useEffect } from "react";
import {
  crearMedia,
  obtenerMedia_ID,
  actualizarMedia,
  eliminarMedia,
  obtenerGeneros,
  obtenerDirectores,
  obtenerProductoras,
  obtenerTipos,
} from "@/Services/MediaServices";

export default function MediaForm({ modo, setModo, id, onMediaCreada }) {
  const [datos, setDatos] = useState({
    serial: "",
    titulo: "",
    sinopsis: "",
    url: "",
    imagen: "",
    fecha_estreno: "",
    generos_id: "",
    directores_id: "",
    productoras_id: "",
    tipos_id: "",
  });
  const [idLocal, setIdLocal] = useState(id || "");

  // Datos para selects
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  // Cargar listas de opciones para selects
  useEffect(() => {
    obtenerGeneros().then(({ data }) => setGeneros(data));
    obtenerDirectores().then(({ data }) => setDirectores(data));
    obtenerProductoras().then(({ data }) => setProductoras(data));
    obtenerTipos().then(({ data }) => setTipos(data));
  }, []);

  // Cargar datos si es editar/actualizar
  useEffect(() => {
    if ((modo === "editar" || modo === "actualizar") && idLocal) {
      obtenerMedia_ID(idLocal)
        .then(({ data }) =>
          setDatos({
            serial: data.serial || "",
            titulo: data.titulo || "",
            sinopsis: data.sinopsis || "",
            url: data.url || "",
            imagen: data.imagen || "",
            fecha_estreno: data.fecha_estreno?.split("T")[0] || "",
            generos_id: data.generos_id?._id || "",
            directores_id: data.directores_id?._id || "",
            productoras_id: data.productoras_id?._id || "",
            tipos_id: data.tipos_id?._id || "",
          })
        )
        .catch(() => {
          alert("No se encontró la media con ese ID.");
          limpiar();
        });
    }
  }, [modo, idLocal]);

  useEffect(() => {
    if (id) setIdLocal(id);
  }, [id]);

  const limpiar = () => {
    setDatos({
      serial: "",
      titulo: "",
      sinopsis: "",
      url: "",
      imagen: "",
      fecha_estreno: "",
      generos_id: "",
      directores_id: "",
      productoras_id: "",
      tipos_id: "",
    });
    setIdLocal("");
    setModo?.(null);
  };

  const validarCampos = () => {
    if (
      !datos.serial.trim() ||
      !datos.titulo.trim() ||
      !datos.url.trim() ||
      !datos.generos_id ||
      !datos.directores_id ||
      !datos.productoras_id ||
      !datos.tipos_id
    ) {
      alert("Todos los campos son obligatorios.");
      return false;
    }
    return true;
  };

  const handleCrear = async () => {
    if (!validarCampos()) return;
    await crearMedia(datos);
    limpiar();
    onMediaCreada?.();
  };

  const handleActualizar = async () => {
    if (!idLocal || !validarCampos()) return;
    await actualizarMedia(idLocal, datos);
    limpiar();
    onMediaCreada?.();
  };

  const handleEliminar = async () => {
    if (!idLocal) return alert("Ingresa un ID válido.");
    await eliminarMedia(idLocal);
    limpiar();
    onMediaCreada?.();
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5 className="mb-3">
        {modo === "crear" && "Crear Media"}
        {modo === "actualizar" && "Actualizar por ID"}
        {modo === "eliminar" && "Eliminar por ID"}
        {modo === "editar" && "Editar Media"}
      </h5>

      {(modo === "actualizar" || modo === "eliminar") && (
        <input
          type="text"
          className="form-control mb-3"
          placeholder="ID de la media"
          value={idLocal}
          onChange={(e) => setIdLocal(e.target.value)}
        />
      )}

      {(modo === "crear" || modo === "actualizar" || modo === "editar") && (
        <>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Serial"
            value={datos.serial}
            onChange={(e) => setDatos({ ...datos, serial: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Título"
            value={datos.titulo}
            onChange={(e) => setDatos({ ...datos, titulo: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Sinopsis"
            value={datos.sinopsis}
            onChange={(e) => setDatos({ ...datos, sinopsis: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="URL"
            value={datos.url}
            onChange={(e) => setDatos({ ...datos, url: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Imagen (URL)"
            value={datos.imagen}
            onChange={(e) => setDatos({ ...datos, imagen: e.target.value })}
          />
          <input
            type="date"
            className="form-control mb-2"
            placeholder="Fecha de estreno"
            value={datos.fecha_estreno}
            onChange={(e) =>
              setDatos({ ...datos, fecha_estreno: e.target.value })
            }
          />

          {/* Dropdown para género */}
          <label>Género</label>
          <select
            className="form-select mb-2"
            value={datos.generos_id}
            onChange={(e) => setDatos({ ...datos, generos_id: e.target.value })}
          >
            <option value="">Selecciona un género</option>
            {generos.map((g) => (
              <option key={g._id} value={g._id}>
                {g.nombre}
              </option>
            ))}
          </select>

          {/* Dropdown para director */}
          <label>Director</label>
          <select
            className="form-select mb-2"
            value={datos.directores_id}
            onChange={(e) =>
              setDatos({ ...datos, directores_id: e.target.value })
            }
          >
            <option value="">Selecciona un director</option>
            {directores.map((d) => (
              <option key={d._id} value={d._id}>
                {d.nombre}
              </option>
            ))}
          </select>

          {/* Dropdown para productora */}
          <label>Productora</label>
          <select
            className="form-select mb-3"
            value={datos.productoras_id}
            onChange={(e) =>
              setDatos({ ...datos, productoras_id: e.target.value })
            }
          >
            <option value="">Selecciona una productora</option>
            {productoras.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombre}
              </option>
            ))}
          </select>

          {/* Dropdown para tipo */}
          <label>Tipo</label>
          <select
            className="form-select mb-3"
            value={datos.tipos_id}
            onChange={(e) => setDatos({ ...datos, tipos_id: e.target.value })}
          >
            <option value="">Selecciona un tipo</option>
            {tipos.map((t) => (
              <option key={t._id} value={t._id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </>
      )}

      {modo === "crear" && (
        <button className="btn btn-primary" onClick={handleCrear}>
          Crear
        </button>
      )}
      {modo === "actualizar" && (
        <button className="btn btn-warning" onClick={handleActualizar}>
          Actualizar
        </button>
      )}
      {modo === "eliminar" && (
        <button className="btn btn-danger" onClick={handleEliminar}>
          Eliminar
        </button>
      )}
      {modo === "editar" && (
        <button className="btn btn-info" onClick={handleActualizar}>
          Actualizar Media
        </button>
      )}
    </div>
  );
}
