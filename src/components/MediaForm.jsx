import { useState, useEffect } from "react";
import api from "../api/axios";

export default function MediaForm({ mediaEdit, onSaved }) {
  const [media, setMedia] = useState({ titulo: "", anio: "" });

  useEffect(() => {
    if (mediaEdit) setMedia(mediaEdit);
  }, [mediaEdit]);

  const handleChange = (e) => {
    setMedia({ ...media, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (media._id) {
      await api.put(`/medias/${media._id}`, media);
    } else {
      await api.post("/medias", media);
    }
    onSaved();
    setMedia({ titulo: "", anio: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="titulo"
        value={media.titulo}
        onChange={handleChange}
        placeholder="Título"
      />
      <input
        name="anio"
        value={media.anio}
        onChange={handleChange}
        placeholder="Año"
      />
      <button type="submit">{media._id ? "Actualizar" : "Crear"}</button>
    </form>
  );
}
