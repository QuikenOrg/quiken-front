import React from "react";
import { Link } from "react-router-dom";

function SubNavbar({ logoutHandler, handleSelectedComponent }) {
  return (
    <div className="sub-navbar">
      <Link className="link-subnavbar" to="/userdashboard">
        Inicio
      </Link>
      <Link className="link-subnavbar">Cotizar</Link>
      <Link className="link-subnavbar">Guias</Link>
      <Link className="link-subnavbar" to="/recargarsaldo">
        Recarga Saldo
      </Link>
      <Link onClick={logoutHandler} className="link-subnavbar">
        Logout
      </Link>
    </div>
  );
}

export default SubNavbar;
