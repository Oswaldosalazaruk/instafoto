import React from 'react';
import axios from 'axios';
import { useStore, useDispatch } from "../store/StoreProvider";
import {  FILE_NAME, UPLOAD, UPLOAD_SUCCES, UPLOAD_ERROR } from "../store/actionsTypes";

function Upload() {
    const store = useStore();
    const dispatch = useDispatch();
    const {filename} = store;

    const handle_upload = (e) =>{
        e.preventDefault();
        dispatch({ type: UPLOAD });
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
            .then(function(response) {
                console.log(response);
                dispatch({ type: UPLOAD_SUCCES });
            })
            .catch(function(error) {
                console.log(error);
                dispatch({ type: UPLOAD_ERROR });
            });
        
    };

    return (
        <React.Fragment>
            <hr />
            <form onSubmit={handle_upload}>
            <input
                type="file"
                id="foto"
                name="foto"
                accept="image/png, image/jpeg"
                onChange={(e) => dispatch({type: FILE_NAME , payload:e.target.files[0]})}
            />
            <button className="btn btn-outline-success">Subir</button>
            </form>
            <hr />  
        </React.Fragment>
    )
}

export default Upload;
