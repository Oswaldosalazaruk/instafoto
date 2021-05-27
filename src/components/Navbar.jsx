import React from "react";
import {types} from '../store/types';

function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">InstaFoto</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
       

        <li className="nav-item dropdown">
          <a className="nav-link active dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Album
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            {types.map((tipo, index) => <li key={index}><a className="dropdown-item" href="/">{tipo}</a></li>)}  


          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar;
