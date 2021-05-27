import React from 'react';
import "../App.css";
import NewPost from "./NewPost";
import Activa from './Activa';
import Carrete from './Carrete';
import Search from './Search';
import Upload from './Upload';
import {StoreProvider} from '../store/StoreProvider'


function Instafoto() {

  return (
    <StoreProvider>
        <div className="App">
            <header className="App-header">
                <Activa />
                <Carrete />
                <Search />
                <NewPost />
                <Upload />
            </header> 
        </div> 
    </StoreProvider>           
  );
}

export default Instafoto;
