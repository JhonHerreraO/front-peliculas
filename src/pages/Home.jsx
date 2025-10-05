import React, { useEffect, useState, useContext } from "react";
import { obtenerMedias } from "@/services/MediaServices";
import { obtenerGeneros } from "@/services/GenerosServices";
import MediaList from "@/Views/MediaPeli/MediaList";
import { BusquedaContext } from "@/components/BusquedaContex";
import { buscarPeliculas } from "@/api/tmdb/tmdbPeliculas";

export default function Home() {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(""); 
  const [generoSeleccionado, setGeneroSeleccionado] = useState("");
  const { termino } = useContext(BusquedaContext);
  const [peliculasExternas, setPeliculasExternas] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const { data: todasMedias } = await obtenerMedias();
      const { data: todosGeneros } = await obtenerGeneros();
      const externas = await buscarPeliculas("batman");

      setMedias(todasMedias);
      setGeneros(todosGeneros);
      setPeliculasExternas(externas);
    };
    cargarDatos();
  }, []);

  const filtradas = medias.filter((m) => {
    const sinFiltros = !tipoSeleccionado && !generoSeleccionado && !termino;

    const coincideTipo = tipoSeleccionado
      ? m.tipo?.nombre?.toLowerCase() === tipoSeleccionado.toLowerCase()
      : true;

    const coincideGenero = generoSeleccionado
      ? m.genero?._id === generoSeleccionado
      : true;

    const coincideBusqueda = termino
      ? m.titulo?.toLowerCase().includes(termino.toLowerCase())
      : true;

    return sinFiltros || (coincideTipo && coincideGenero && coincideBusqueda);
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🎬 Catálogo de Producciones</h2>

      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn me-2 ${tipoSeleccionado === "" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setTipoSeleccionado("")}
        >
          Todos
        </button>
        <button
          className={`btn me-2 ${tipoSeleccionado === "Película" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setTipoSeleccionado("Película")}
        >
          Películas
        </button>
        <button
          className={`btn ${tipoSeleccionado === "Serie" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setTipoSeleccionado("Serie")}
        >
          Series
        </button>
      </div>

      <div className="mb-4 text-center">
        <label className="me-2">Filtrar por género:</label>
        <select
          value={generoSeleccionado}
          onChange={(e) => setGeneroSeleccionado(e.target.value)}
          className="form-select w-auto d-inline-block"
        >
          <option value="">Todos</option>
          {generos.map((g) => (
            <option key={g._id} value={g._id}>
              {g.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Pintar cards con MediaList */}
      <MediaList medias={filtradas} peliculasExternas={peliculasExternas} />
    </div>
    
  );
  
}

