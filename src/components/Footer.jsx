export default function Footer() {
  return (
    <footer style={{ background: "#333", color: "#fff", padding: "1rem", textAlign: "center" }}>
      <p>© {new Date().getFullYear()} Mi App Películas. Todos los derechos reservados.</p>
    </footer>
  );
}
