import "./styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
//import hooks
import { useState, useEffect } from "react";
//import context  que creamos
import Contexto from "./Context";
//importacion de las vistas
import Home from "./views/Home";
import Favoritos from "./views/Favoritos";

export default function App() {
  const [fotos, setFotos] = useState([]);
  //API
  const url = "/fotos.json";

  const getFotos = async () => {
    const respuesta = await fetch(url);
    //para limitar los datos de la respuesta usamos las llaves {}, de esta forma solamente obtenemos el array de photos
    let { photos } = await respuesta.json();
    //el metodo map para filtrar nuevamentes los elementos que necesitaremos del array
    photos = photos.map((photo) => ({
      id: photo.id,
      src: photo.src.tiny,
      desc: photo.alt,
      favorito: false,
    }));
    setFotos(photos);
  };

  useEffect(() => {
    getFotos();
  }, []);

  return (
    <div className="App">
      <Contexto.Provider value={{ fotos, setFotos }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </BrowserRouter>
      </Contexto.Provider>
    </div>
  );
}
