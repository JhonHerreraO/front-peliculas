import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Medias from "./pages/Medias";
import Generos from "./generos/Generos";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home"; 
import GestionMenu from "./components/GestionMenu";

export default function App() {
  return (
    <Router>
      {/* Barra de navegación */}
      <Navbar />

      {/* Aquí debajo puedes poner algo que siempre quieras mostrar */}
      <div style={{ minHeight: "80vh", padding: "1rem" }}>
        {/* Ejemplo: lista de géneros fija */}
        

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Menú de gestión */}
          <Route path="/gestion" element={<GestionMenu />} />
          <Route path="/gestion/generos" element={<Generos />} />
        </Routes>
      </div>

      

      {/* Footer */}
      <Footer />
    </Router>
  );

}
