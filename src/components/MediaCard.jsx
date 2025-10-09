export default function MediaCard({ media }) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={media.imagen || "https://via.placeholder.com/300x400"}
        alt={media.titulo}
        className="w-full h-60 object-cover"
      />
      <div className="p-3">
        <h2 className="text-lg font-semibold">{media.titulo}</h2>
        <p className="text-sm text-gray-600">{media.genero?.nombre}</p>
        <p className="text-sm">{media.tipo}</p>
      </div>
    </div>
  );
}
