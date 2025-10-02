import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
      <div className="container">
        {/* Título estilizado con más porte */}
        <Link className="navbar-brand fw-bolder fs-2" to="/" style={{ letterSpacing: "1px" }}>
          <span className="text-danger">Netflix</span>{" "}
          <span className="text-white">Gratis</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarScroll">
          {/* Menú de navegación con separación */}
          <ul className="navbar-nav mb-2 mb-lg-0 gap-4">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Inicio</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Gestión
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><Link className="dropdown-item" to="/gestion/media">Películas</Link></li>
                <li><Link className="dropdown-item" to="/gestion/generos">Géneros</Link></li>
                <li><Link className="dropdown-item" to="/gestion/tipos">Tipos</Link></li>
                <li><Link className="dropdown-item" to="/gestion/directores">Directores</Link></li>
                <li><Link className="dropdown-item" to="/gestion/productoras">Productoras</Link></li>
              </ul>
            </li>
          </ul>

          {/* Buscador alineado a la derecha */}
          <form className="d-flex ms-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar película..."
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
