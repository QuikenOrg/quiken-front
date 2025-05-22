import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import "./RecargaContact.scss";

const RecargaContact = () => {
  return (
    <div className="recarga-contact-page">
      <Navbar />
      <div className="row">
        <Sidebar />
        <div className="recarga-wrapper">
          <h1 className="title">Recargar saldo</h1>
          <div className="message">
            <br />
            <br />
            Si deseas agregar saldo a tu cuenta, por favor comunícate con nuestro equipo de soporte:
            <ul>
              <br />
              <li>💬 WhatsApp: +52 811 661 8597</li>
              <br />
              <li>✉️ Correo: hola@quiken.mx </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecargaContact;
