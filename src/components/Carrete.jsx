import React from 'react';
import { useStore, useDispatch } from "../store/StoreProvider";
import {  ACTIVA, NEXT_PAG, PREV_PAG, DIR_ACTUAL, GET_ALBUMS, FETCH_SUCCES, FETCH_ERROR } from "../store/actionsTypes";
import { types } from "../store/types";

function Carrete() {
    const store = useStore();
    const dispatch = useDispatch();
    const {imagenes, pagina, activa, dir_actual} = store;
    const handle_get_data = (e)=>{
        e.preventDefault();
        dispatch({ type: DIR_ACTUAL, payload: e.target.value });
        dispatch({ type: GET_ALBUMS });
        console.log(types[e.target.value]);
        fetch(`http://192.168.0.150:3001/api/albums${types[e.target.value]}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((jsonRes) => dispatch({ type: FETCH_SUCCES, payload: jsonRes }))
            .catch(error => {
                dispatch({ type: FETCH_ERROR, payload: error.data })
            });

    }
    return (
        <React.Fragment>
            <div className="container">
                {pagina.map((imagen) => (
                    <img
                    className="carrete"
                    src={`pictures/${imagen.tag}/${imagen.url}`}
                    width="80px"
                    height="80px"
                    alt="carrete"
                    key={imagen.id}
                    onClick={() => dispatch({type: ACTIVA , payload:imagen.id})}
                    />
                ))}
            </div>

            <div className="container gap-3">
                <button
                    className="btn btn-primary btn-small "
                    onClick={() => dispatch({type: PREV_PAG })}>
                    Anterior
                </button>
                <button
                    className="btn btn-primary btn-small"
                    onClick={() => dispatch({type: NEXT_PAG })}>
                    Siguiente
                </button>
                <label className="title p-3">
                    {activa.id + 1} de {imagenes.length}
                </label>
                <hr />
                <div>
                    <select value={dir_actual} onChange={(e)=>handle_get_data(e)}>
                    {types.map((tipo, index) => (
                        <option key={index} value={index}>
                        {tipo}
                        </option>
                    ))}
                    </select>
                    <p>{types[dir_actual]}</p>
                </div>
                <hr />
            </div>

        </React.Fragment>
    )
}

export default Carrete;
