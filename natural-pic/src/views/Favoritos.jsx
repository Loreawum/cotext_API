import { useContext } from "react";
import Contexto from "../Context";

export default function Favoritos() {
  const { fotos, setFotos } = useContext(Contexto);
  const favoritas = fotos.filter((foto) => foto.favorito).length;

  return (
    <div>
      <h1>Fotos favoritas</h1>
      <div className="p-3 galeria grid-columns-4">
        {favoritas == 0 ? (
          <p>No hay fotos favoritas</p>
        ) : (
          fotos
            .filter((foto) => foto.favorito)
            .map((foto, i) => <img src={foto.src} alt={i} />)
        )}
      </div>
    </div>
  );
}
