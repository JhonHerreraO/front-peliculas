import React, { useEffect } from "react";
import { obtenerGeneros } from "../services/GenerosServices";

export default function Generos() {
  const listarGeneros = async () => {
    try {
      const { data } = await obtenerGeneros(); // <- Aquí destructuramos la respuesta
      console.log(data); // Aquí ves los géneros en consola
    } catch (error) {
      console.log("Error al listar géneros:", error);
    }
  };

  // useEffect siempre debe ir al nivel superior del componente
  useEffect(() => {
    listarGeneros();
  }, []);

  return <div>Generos</div>;
}

