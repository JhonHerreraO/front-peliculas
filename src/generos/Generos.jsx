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
  <ul>
    {generos.map(genero =>(<li key={genero._id}>
      {genero.nombre}-
      {genero.descripcion}</li> )
    )}
    </ul>
  )
}

