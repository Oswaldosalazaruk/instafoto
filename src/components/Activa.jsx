import React from 'react';
import { useStore } from "../store/StoreProvider";

const Activa = ()=> {
    const store = useStore();
    const {activa} = store;
    return (
        <div>
            <img
            src={`pictures/${activa.tag}/${activa.url}`}
            className="card card-body p-2"
            width="700px"
            alt="logo"
            />
            <label className="container">{activa.post}</label>    
        </div>
    )
}

export default Activa;