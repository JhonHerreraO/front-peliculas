import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Medias from "./pages/Medias";
import Generos from "./generos/Generos";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home"; 


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
          <Route path="/peliculas" element={<Medias />} />
          <Route path="/gestion" element={<Generos />} />
        </Routes>
      </div>

      <Generos />

      {/* Footer */}
      <Footer />
    </Router>
  );

}
