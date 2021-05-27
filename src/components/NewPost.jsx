import React from 'react';
import axios from 'axios';
import { useStore, useDispatch } from "../store/StoreProvider";
import {  NEW_POST, HANDLE_NEW_POST } from "../store/actionsTypes";

function NewPost() {
    const store = useStore();
    const dispatch = useDispatch();
    const {activa, newpost} = store;

    const handlepost = (e) =>{
        e.preventDefault();
        console.log(activa._id, newpost)
        const FormData = require("form-data");
        const fd = new FormData();
        fd.append("albumid", activa._id);
        fd.append("albumpost", newpost);
        axios({
                method: "post",
                url: "http://192.168.0.150:3001/update",
                data: fd,
            })
            .then(function(response) {
                console.log(response);
                dispatch({ type: HANDLE_NEW_POST })
            })
            .catch(function(error) {
                console.log(error);
            });

    }
 
    return (
            <form onSubmit={handlepost}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">NewPost</span>
                    <input type="text" 
                        className="form-control" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-lg" 
                        onChange={(e)=>dispatch({type: NEW_POST , payload:e.target.value})}/>
                    <input type="reset" defaultValue="" />    
                </div>
                <button className="btn btn-outline-success">Post</button>
                <hr />
            </form>
    )
}

export default NewPost;
