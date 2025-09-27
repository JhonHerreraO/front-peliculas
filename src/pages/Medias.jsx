import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Medias() {
  const [medias, setMedias] = useState([]);
  const [form, setForm] = useState({ titulo: "", descripcion: "" });
  const [editingId, setEditingId] = useState(null);

  // Cargar lista inicial
  useEffect(() => {
    fetchMedias();
  }, []);

  const fetchMedias = async () => {
    try {
      const res = await api.get("/medias");
      setMedias(res.data);
    } catch (err) {
      console.error("Error cargando medias:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/medias/${editingId}`, form);
      } else {
        await api.post("/medias", form);
      }
      setForm({ titulo: "", descripcion: "" });
      setEditingId(null);
      fetchMedias();
    } catch (err) {
      console.error("Error guardando media:", err);
    }
  };

  const handleEdit = (media) => {
    setForm({ titulo: media.titulo, descripcion: media.descripcion });
    setEditingId(media._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/medias/${id}`);
      fetchMedias();
    } catch (err) {
      console.error("Error eliminando media:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>CRUD de Medias</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
        {editingId && (
          <button type="button" onClick={() => setEditingId(null)}>
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla */}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((m) => (
            <tr key={m._id}>
              <td>{m.titulo}</td>
              <td>{m.descripcion}</td>
              <td>
                <button onClick={() => handleEdit(m)}>Editar</button>
                <button onClick={() => handleDelete(m._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
