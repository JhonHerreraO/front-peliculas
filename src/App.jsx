import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/appRoutes.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BusquedaProvider from "./components/BusquedaContex.jsx";

export default function App() {
  return (
    <BusquedaProvider> {/* ← envuelve toda la app */}
      <Router>
        <Navbar />
        <div style={{ minHeight: "80vh", padding: "1rem" }}>
          <AppRoutes />
        </div>
        <Footer />
      </Router>
    </BusquedaProvider>
  );
}



