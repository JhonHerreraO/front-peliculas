import { axiosConfig } from "../api/axios";


const obtenerGeneros = () => {
  return axiosConfig.get("/generos", {
    headers: {  
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
};
const obtenerGeneros_ID = (id) => {
  return axiosConfig.get(`/generos/${id}`, {
    headers: {  
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
};

const CrearGeneros = (data = {}) => {
  return axiosConfig.post("/generos", data, {
    headers: {  
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
};

const actualizarGeneros = (id, data = {}) => {
  return axiosConfig.put(`/generos/${id}`, data, {
    headers: {  
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
};


const eliminarGeneros = (id) => {
  return axiosConfig.delete(`/generos/${id}`, {
    headers: {  
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
};




export{
    obtenerGeneros,
    obtenerGeneros_ID,
    CrearGeneros,
    actualizarGeneros,
    eliminarGeneros
}



