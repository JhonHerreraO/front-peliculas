import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import GestionMenu from "../components/GestionMenu";
import GenerosPage from "../pages/Gestion/GeneroPage";
import MediaPage from "../pages/Gestion/MediaPage";
import TiposPage from "../pages/Gestion/TiposPage";
import DirectoresPage from "../pages/Gestion/DirectoresPage";
import ProductorasPage from "../pages/Gestion/ProductorasPage";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gestion" element={<GestionMenu />} />
      <Route path="/gestion/generos" element={<GenerosPage />} />
      <Route path="/gestion/tipos" element={<TiposPage />} />
      <Route path="/gestion/directores" element={<DirectoresPage />} />
      <Route path="/gestion/productoras" element={<ProductorasPage />} />
      <Route path="/gestion/media" element={<MediaPage />} />
     

      
    </Routes>
  );
}

