import { axiosConfig } from "../api/axios";


const obtenerTipos = () => {
  return axiosConfig.get("/tipos", {
    headers: {  
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
};
const obtenerTipos_ID = (id) => {
  return axiosConfig.get(`/tipos/${id}`, {
    headers: {  
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
};

const CrearTipos = (data = {}) => {
  return axiosConfig.post("/tipos", data, {
    headers: {  
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
};

const actualizarTipos = (id, data = {}) => {
  return axiosConfig.put(`/tipos/${id}`, data, {
    headers: {  
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
};


const eliminarTipos = (id) => {
  return axiosConfig.delete(`/tipos/${id}`, {
    headers: {  
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
};




export{
    obtenerTipos,
    obtenerTipos_ID,
    CrearTipos,
    actualizarTipos,
    eliminarTipos
}


