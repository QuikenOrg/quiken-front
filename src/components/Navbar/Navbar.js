import React from 'react';
import BtnRegistro from './BtnRegistro';
import { Link } from 'react-router-dom';
import "./Navbar.scss";

import QuikenLogo from '../../assets/Inicio/Quiken_Logo_color-03.svg'

const Navbar = () => {
  return (
    <>
      <div className="navbar-main">
        <div className="navbar-logo-placeholder">
          <img src={QuikenLogo} className="quiken-logo" />
        </div>
        
        {/* //Desktop Menu */}
        <div className="navbar-links-wrapper">
          <Link className="navbar-link"to="/">INICIO</Link>
          <Link className="navbar-link" to="/servicios">SERVICIOS</Link>
          <Link className="navbar-link" to="/fulfillment">FULFILLMENT</Link>
          <Link className="navbar-link" to="/rastreo">RASTREO</Link>
          <Link className="navbar-link" to="/contacto">CONTACTO</Link>
          <Link className="navbar-link" to="/signin">
            SIGN IN
          </Link>
          <Link to="/signup">
            <BtnRegistro/>
          </Link>
        </div>
        {/* Mobile Menu */}
        

      </div>
    </>
  );
};

export default Navbar