import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./InicioPagina.scss";
import ContactUs from "../components/Others/ContactUs";
import MapInicio from "../components/Inicio/MapInicio";
import MilesDeGuias from "../components/Inicio/MilesDeGuias";
import ContactForm from "../components/Inicio/ContactForm";
import NuestrosVehiculos from "../components/Inicio/NuestrosVehiculos";
import MasBeneficios from "../components/Inicio/MasBeneficios";
import AyudamosNegocios from "../components/Inicio/AyudamosNegocios";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet";

//Images
import imgServicioOne from "../assets/Inicio/Servicios/Quiken_Paqueteria_Local.png";
import imgServicioTwo from "../assets/Inicio/Servicios/Quiken_Envios_Nacionales_Internacionales.png";
import imgServicioThree from "../assets/Inicio/Servicios/Quiken_Fulfillment.png";
import imgServicioFour from "../assets/Inicio/Servicios/Quiken_Suministros.png";
import QuikenContacto from "../assets/Inicio/Quiken_Contacto.png";
import RastreaPedido from "../components/Others/RastreaPedido";
import WhatsAppBtn from "../components/Others/WhatsappBtn";

const InicioPagina = () => {
  return (
    <>
      <Helmet>
        <title>Quiken Paqueteria y Envíos</title>
        <meta
          name="description"
          content="Servicios de paqueteria y fulfilment en México"
        />
        <meta
          name="keywords"
          content="Envios, Paqueteria, ecommerce, delivery"
        />
      </Helmet>
      <WhatsAppBtn />
      <Navbar />
      <div className="hero-image-wrapper">
        <div className="hero-text-wrapper">
          <h1 className="main-title-heading">ENVÍOS</h1>
          <h1 className="main-title-heading">EFICIENTES</h1>
          <p className="main-title-subheading">
            La mejor calidad y profesionalismo en servicios de entrega local y
            nacional para negocios
          </p>
        </div>
      </div>

      <div className="background-rastrea">
        <RastreaPedido />
      </div>

      <h1 className="section-heading">Conoce nuestros servicios</h1>

      <div className="row-wrapper-inicio">
        <div className="servicio-wrapper">
          <div className="wrapper-50">
            <h2 className="heading-servicio">Paqueteria Local</h2>
            <p className="paragraph-servicio">
              Con entregas del mismo día y día siguiente (24-36 hrs) en Nuevo
              León, Ciudad de México, Léon y Querétaro.
            </p>
            <div className="link-holder-wrapper">
              <Link className="link-servicio" to="/servicios">
                Conoce más
              </Link>
            </div>
            <img
              className="imagen-servicio1"
              alt="imagen-servicio"
              src={imgServicioOne}
            />
          </div>
        </div>

        <div className="servicio-wrapper">
          <div className="wrapper-50">
            <h2 className="heading-servicio">
              Envíos Nacionales e Internacionales
            </h2>
            <p className="paragraph-servicio">
              Usa nuestra amplia cobertura para entregar velozmente todos tus
              paquetes en México o cualquier parte del mundo a través de
              nuestros aliados.
            </p>
            <div className="link-holder-wrapper">
              <Link className="link-servicio" to="/servicios">
                Conoce más
              </Link>
            </div>
            <img
              className="imagen-servicio"
              alt="imagen-servicio"
              src={imgServicioTwo}
            />
          </div>
        </div>
      </div>

      <div className="row-wrapper-inicio">
        <div className="servicio-wrapper">
          <div className="wrapper-50">
            <h2 className="heading-servicio">Fulfillment</h2>
            <p className="subheading-servicio">(Almacenaje y Pick&Pack)</p>
            <p className="paragraph-servicio">
              Almacenamiento con más de 10,000 mts2 de almacenamiento en México
              y Estados Unidos.
            </p>
            <div className="link-holder-wrapper">
              <Link className="link-servicio" to="/fulfillment">
                Conoce más
              </Link>
            </div>
            <img
              className="imagen-servicio"
              alt="imagen-servicio"
              src={imgServicioThree}
            />
          </div>
        </div>

        <div className="servicio-wrapper">
          <div className="wrapper-50">
            <h2 className="heading-servicio">Suministros/Embalaje</h2>
            <p className="paragraph-servicio">
              Personaliza tus cajas y sobres con tu logo, lleva tu marca a todos
              lados!
            </p>
            <div className="link-holder-wrapper">
              <Link className="link-servicio" to="/servicios">
                Conoce más
              </Link>
            </div>
            <img
              className="imagen-servicio"
              alt="imagen-servicio"
              src={imgServicioFour}
            />
          </div>
        </div>
      </div>

      {/* Contact Us Form */}
      <ContactUs />

      <MapInicio />

      <MilesDeGuias />

      <NuestrosVehiculos />

      <MasBeneficios />

      <AyudamosNegocios />

      <div className="alignment-div">
        <h2 className="heading-contact">¡Empieza ahora!</h2>
        <h3 className="subheading-contact-form">
          Ponte en contacto con un representate de <span>Qüiken</span>
        </h3>
      </div>

      <div className="wrapper-contact-form-image">
        <ContactForm />
        <img
          className="image-contacto"
          alt="imagen-contacto"
          src={QuikenContacto}
        ></img>
      </div>
      <Footer />
    </>
  );
};

export default InicioPagina;
