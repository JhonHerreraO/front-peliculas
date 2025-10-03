import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import GestionMenu from "../components/GestionMenu";
import GenerosPage from "../pages/Gestion/GeneroPage";
// import MediaPage from "../pages/gestion/MediaPage";
import TiposPage from "../pages/gestion/TiposPage";
// import DirectoresPage from "../pages/gestion/DirectoresPage";
// import ProductorasPage from "../pages/gestion/ProductorasPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gestion" element={<GestionMenu />} />
      <Route path="/gestion/generos" element={<GenerosPage />} />
      <Route path="/gestion/tipos" element={<TiposPage />} />

      {/* Rutas pendientes:
        <Route path="/gestion/media" element={<MediaPage />} />
        <Route path="/gestion/directores" element={<DirectoresPage />} />
        <Route path="/gestion/productoras" element={<ProductorasPage />} />
      */}
    </Routes>
  );
}

