export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 mt-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Logo o nombre */}
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold">🎬 Netflix Gratis</h5>
            <p className="small mb-0">Tu catálogo de películas favorito</p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <a href="/" className="text-light text-decoration-none me-3">Inicio</a>
            <a href="#contacto" className="text-light text-decoration-none">Contacto</a>
          </div>

          {/* Redes sociales */}
          <div className="col-md-4 text-center text-md-end">
            <a href="https://facebook.com" className="text-light me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://instagram.com" className="text-light me-3">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://twitter.com" className="text-light">
              <i className="bi bi-twitter-x"></i>
            </a>
          </div>
        </div>

        <hr className="border-light my-3" />

        <div className="text-center small">
          © 2025 Netflix Gratis. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
