import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ContactForm from "../components/Inicio/ContactForm";
import Footer from "../components/Footer/Footer";
import ContactoSra from "../assets/Contacto/Contacto.png";
import "./ContactoPagina.scss";
import QuikenContacto from "../assets/Inicio/Quiken_Contacto.png";
import FloatingWhatsApp from "../components/Others/WhatsappBtn";
import { Helmet } from "react-helmet";

const ContactoPagina = () => {
  return (
    <>
      <Helmet>
        <title>Quiken Contacto</title>
        <meta
          name="description"
          content="Servicios de paqueteria y fulfilment en México"
        />
        <meta
          name="keywords"
          content="Envios, Paqueteria, ecommerce, delivery"
        />
      </Helmet>
      <Navbar />
      <FloatingWhatsApp />
      <h1 className="main-heading-contacto">
        ¿Eres una empresa o quieres que te ayudemos a crecer?
      </h1>
      <div className="row-div-contact-page">
        <ContactForm />
        <img
          className="image-contacto-contact-page"
          alt="quiken-contacto"
          src={QuikenContacto}
        ></img>
      </div>
      <img
        src={ContactoSra}
        alt="imagen-muchacha"
        className="quiken-contact-image"
      />
      <Footer />
    </>
  );
};

export default ContactoPagina;
