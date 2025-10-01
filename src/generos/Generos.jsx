import React, { useEffect, useState } from "react";
import { obtenerGeneros } from "../services/GenerosServices";


export default function Generos() {
  const [generos, setGeneros] = useState([]);

  const listarGeneros = async () => {
    try {
      const { data } = await obtenerGeneros(); // <- Aquí destructuramos la respuesta
      setGeneros(data); // <- Actualizamos el estado con los datos recibidos
      console.log(data); // Aquí ves los géneros en consola
    } catch (error) {
      console.log("Error al listar géneros:", error);
    }
  };

  // useEffect siempre debe ir al nivel superior del componente
  useEffect(() => {
    listarGeneros();
  }, []);

   return (
  <div>
    <ul>
      {generos.map((genero) => (
        <li key={genero._id}>
          {genero.nombre} - {genero.descripcion}
        </li>
      ))}
    </ul>

    <div className="container mt-4">
      <h2 className="mb-4 text-center">Géneros Disponibles</h2>
      <div className="row">
        {generos.map((genero) => (
          <div className="col-md-4 mb-3" key={genero._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{genero.nombre}</h5>
                <p className="card-text">{genero.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

