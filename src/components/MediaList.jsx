import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MediaList({ onEdit, reload }) {
  const [medias, setMedias] = useState([]);

  const loadData = async () => {
    const res = await api.get("/medias");
    setMedias(res.data);
  };

  useEffect(() => {
    loadData();
  }, [reload]);

  const handleDelete = async (id) => {
    await api.delete(`/medias/${id}`);
    loadData();
  };

  return (
    <div>
      <h2>Lista de Películas</h2>
      <ul>
        {medias.map((m) => (
          <li key={m._id}>
            {m.titulo} ({m.anio})
            <button onClick={() => onEdit(m)}>Editar</button>
            <button onClick={() => handleDelete(m._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
