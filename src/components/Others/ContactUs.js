import React from "react";
import "./ContactUs.scss";
import emailjs from "emailjs-com";

const ContactUs = () => {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_pe3avrb",
        "template_ge5z9tm",
        e.target,
        "Aug5WajTRTBJCOOM4"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  }

  const contactUsHandler = (event) => {
    alert(
      "Gracias por contactarnos uno nuestros asesores se pondre en contaco contigo."
    );
    sendEmail(event);
  };

  return (
    <>
      <div className="wrapper">
        <form className="contact-us-form" onSubmit={contactUsHandler}>
          <input
            className="contact-us-input-form"
            placeholder="Correo electrónico"
            name="email"
          ></input>
          <button className="btn-red-contact-us" type="submit">
            Contáctanos
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
