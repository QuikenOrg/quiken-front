import React from "react";
import "./Footer.scss";
import ManuableLogoFooter from "../../assets/Inicio/logo-manuable2.png";
import Facebook from "../../assets/Inicio/Iconos de redes sociales/Facebook-45.svg";
import Instagram from "../../assets/Inicio/Iconos de redes sociales/Instagram-47.svg";
import Twitter from "../../assets/Inicio/Iconos de redes sociales/Twitter-46.svg";
import locationIcon from "../../assets/Inicio/Iconos de Contacto/Quiken_ubicacion-48.svg";
import phoneIcon from "../../assets/Inicio/Iconos de Contacto/Quiken_Telefono-49.svg";
import mailIcon from "../../assets/Inicio/Iconos de Contacto/Quiken_Correo-50.svg";
import styled from "styled-components";
import Privacidad from "../../pdf/privacidad.pdf";
import Terminos from "../../pdf/terminos_quiken.pdf";

const Footer = () => {
  return (
    <div className="footer-main-wrapper">
      <div className="logo-links-wrapper">
        <div className="logo-quienes-somos-wrapper">
          <img
            className="img-logo-footer"
            alt="quiken-logo"
            src={ManuableLogoFooter}
          ></img>
          <h3 className="quienes-somos">¿QUIENES SOMOS?</h3>
        </div>
        <div className="copy-icons-wrapper">
          <p className="copy-quiken">
            © 2021 Manuable, Todos los derechos reservados.
          </p>
          <a
            target="_blank"
            href="https://www.facebook.com/Manuable"
            rel="noreferrer"
          >
            <img src={Facebook} className="icon" alt="facebook-icon" />
          </a>

          <a
            target="_blank"
            href="https://www.facebook.com/Manuable"
            rel="noreferrer"
          >
            <img src={Twitter} className="icon" alt="twitter-icon" />
          </a>

          <a
            target="_blank"
            href="https://www.instagram.com/manuable"
            rel="noreferrer"
          >
            <img src={Instagram} className="icon" alt="instagram-icon" />
          </a>
        </div>
      </div>
      <div className="info-wrapper">
        <h2 className="contactanos-heading">CONTÁCTANOS</h2>
        <div className="icon-text-row-wrapper">
          <img src={locationIcon} className="contact-icon" />
          <p className="paragraph-contact">
            Av. Ruiz Cortines No. 3123-A, 3123-B, Mitras Centro, C.P. 64320 Monterrey, Nuevo Nuevo León, México.
          </p>
        </div>
        <div className="icon-text-row-wrapper">
          <img src={phoneIcon} className="contact-icon" alt="phone-icon" />
          <p className="paragraph-contact">(+52) 81 2196 5087</p>
        </div>
        <div className="icon-text-row-wrapper">
          <img src={mailIcon} className="contact-icon" alt="mail-icon" />
          <p className="paragraph-contact">hola@manuable.com</p>
        </div>
        <div
          className="icon-text-row-wrapper"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "5px",
          }}
        >
          <LinkFooter target="_blank">
            Terminos y condiciones
          </LinkFooter>
          <LinkFooter target="_blank">
            Aviso de privacidad
          </LinkFooter>
        </div>
      </div>
    </div>
  );
};

const LinkFooter = styled.a`
  color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 15px;
`;

export default Footer;
