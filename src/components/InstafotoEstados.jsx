import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import { types } from "../store/types";
import axios from "axios";
// import { FETCH_ERROR, FETCH_SUCCES, GET_ALBUMS } from "../store/actionsTypes";
// import { useStore, useDispatch } from "../store/StoreProvider";

function Instafoto() {
  const [imagenes, setImagenes] = useState([]);
  const [indice, setIndice] = useState(0);
  const [pagina, setPagina] = useState([]);
  const [activa, setActiva] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [filename, setFilename] = useState("");
  const [newpost, setNewpost] = useState("");
  const [dir_actual, setDir_actual] = useState(0);
  // const store = useStore();
  // const dispatch = useDispatch();
  // SOLICITAR DATOS AL SERVIDOR API QUE SIRVE EN EL PUERTO 3001 CON EXPRESS
  useEffect(() => {
    console.log("solicitando datos ", `/api/albums${types[dir_actual]}`);
    fetch(`http://192.168.0.150:3001/api/albums${types[dir_actual]}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setImagenes(jsonRes));
  }, [dir_actual]);

  // POR CADA VEZ QUE CAMBIA DE PAGINA O SE CAMBIA LA DATA SOLICITADA AL SERVIDOR SE CARGA EN ARREGLO PAGINA
  useEffect(() => {
    function search(rows) {
      return rows.filter(
        (row) => row.post.toLowerCase().indexOf(filtro.toLowerCase()) > -1
      );
    }
    setPagina(search(imagenes.slice(indice, indice + 9)));
  }, [imagenes, indice, filtro]);

  // POR CADA VEZ QUE CAMBIA LA PAGINA SE COLOCA LA PRIMERA IMAGEN DEL CARRETE EN IMAGEN ACTIVA
  useEffect(() => {
    setActiva(pagina[0]);
  }, [pagina]);

  // COLOCA EN IMAGEN ACTIVA LA IMAGEN SELECCIONADA
  const handlepic = (id) => {
    const act = imagenes.find((imagen) => imagen.id === id);
    setActiva(act);
    setNewpost(act.post);
  };
  // CARGA EN EL SERVIDOR LA IMAGEN LOCAL SELECCIONADA POR EL EXPLORADOR
  const handleUpload = (event) => {
    event.preventDefault();
    const FormData = require("form-data");
    const fd = new FormData();
    fd.append("files", filename);
    fd.append("fileid", filename.size);
    fd.append("filename", filename.name);

    axios({
      method: "post",
      url: "http://192.168.0.150:3001/upload",
      data: fd,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setDir_actual(e.target.value);
    setIndice(0);
  };
  // ACTUALIZA EL POST EN EL SERVIDOR
  const handlePost = (e) => {
    e.preventDefault();
    const FormData = require("form-data");
    const fd = new FormData();
    fd.append("albumid", activa._id);
    fd.append("albumpost", newpost);

    axios({
      method: "post",
      url: "http://192.168.0.150:3001/update",
      data: fd,
    })
      .then(function (response) {
        console.log(response);
        setNewpost(activa.post);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // LIMPIA EL FILTRO O EN EL FUTURO UTILIZAR PARA TRAER IMAGENES DEL SERVIDOR CON DICHO FILTRO
  const handleFiltro = () => {
    setIndice(0);
    // setImagenes(search(rawdata))
  };

  const handleSiguiente = () => {
    if (indice < imagenes.length - 9) {
      setIndice(indice + 9);
      //setPagina(imagenes.slice(indice, indice+9))
    } else {
      setIndice(0);
      // setPagina(imagenes.slice(indice, indice+9))
    }
  };
  const handleAnterior = () => {
    if (indice > 9) {
      setIndice(indice - 9);
      // setPagina(imagenes.slice(indice, indice+9))
    } else {
      setIndice(imagenes.length - 9);
      // setPagina(imagenes.slice(indice, indice+9))
    }
  };

  // const handle_get_data = () => {
  //   dispatch({ type: GET_ALBUMS });
  //   fetch("http://192.168.0.150:3001/api/albums/Ipad_varias_2009")
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((jsonRes) => dispatch({type: FETCH_SUCCES, payload:jsonRes}))
  //     .catch(error=>{
  //       dispatch({type: FETCH_ERROR, payload:error.data})
  //     })
  // };

  return (
    <div className="App">
      <header className="App-header">
        {activa ? (
          <img
            src={`pictures/${activa.tag}/${activa.url}`}
            className="card card-body p-2"
            width="700px"
            alt="logo"
          />
        ) : (
          <img
            src="pictures/Ipad_varias_2009/DSC01579.JPG"
            className="card card-body p-2"
            width="700px"
            alt="logo"
          />
        )}
        <label>{activa?.post}</label>

        <div className="container">
          {pagina.map((imagen) => (
            <img
              className="carrete"
              src={`pictures/${imagen.tag}/${imagen.url}`}
              width="80px"
              height="80px"
              alt="carrete"
              key={imagen.id}
              onClick={() => handlepic(imagen.id)}
            />
          ))}
        </div>

        <div className="container gap-3">
          <button
            className="btn btn-primary btn-small "
            onClick={handleAnterior}
          >
            Anterior
          </button>
          <button
            className="btn btn-primary btn-small"
            onClick={handleSiguiente}
          >
            Siguiente
          </button>
          <label className="title p-3">
            {activa?.id + 1} de {imagenes.length}
          </label>
          <hr />
          <div>
            <select value={dir_actual} onChange={handleSelect}>
              {types.map((tipo, index) => (
                <option key={index} value={index}>
                  {tipo}
                </option>
              ))}
            </select>
            <p>{types[dir_actual]}</p>
          </div>

          <hr />

          <input
            className="form-control me-2"
            type="search"
            placeholder={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <button className="btn btn-outline-success" onClick={handleFiltro}>
            Buscar
          </button>       
          <hr />
          <form onSubmit={handlePost}>
            <input
              className="form-control me-2"
              type="text"
              onChange={(e) => setNewpost(e.target.value)}
            />
            <input type="reset" defaultValue="" />
            <button className="btn btn-outline-success">Post</button>
          </form>
          <hr />
          <form onSubmit={handleUpload}>
            <input
              type="file"
              id="foto"
              name="foto"
              accept="image/png, image/jpeg"
              onChange={(e) => setFilename(e.target.files[0])}
            />
            <button className="btn btn-outline-success">Subir</button>
          </form>
          <hr />
        </div>
      </header>
    </div>
  );
}

export default Instafoto;
