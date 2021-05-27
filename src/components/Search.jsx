import React from 'react';
import { useStore, useDispatch } from "../store/StoreProvider";
import {  SEARCH } from "../store/actionsTypes";

function Search() {
    const store = useStore();
    const dispatch = useDispatch();
    const { filtro } = store;
    return (
    <React.Fragment>
        <div className="input-group mb-2">
        <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
        <input
        className="form-control"
        type="search"
        placeholder={filtro}
        aria-label="Sizing example input" 
        aria-describedby="inputGroup-sizing-default" 
        onChange={(e) => dispatch({type: SEARCH , payload:e.target.value})}
        />
        </div>
        <button className="btn btn-outline-success" >Buscar</button>  
        <hr />      
    </React.Fragment>
    );
}

export default Search;
