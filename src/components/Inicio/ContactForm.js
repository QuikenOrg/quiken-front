import React, { useState } from "react";
import "./ContactForm.scss";
import "emailjs-com";
import emailjs from "emailjs-com";

const ContactForm = () => {
  // process.env.SENDGRID_API_KEY
  //Mail SendGrid Integration
  function sendContactForm(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_SUPPORT,
        e.target,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {},
        (error) => {}
      );
    alert(
      "Gracias por contactarnos uno nuestros asesores se pondre en contaco contigo."
    );
    e.target.reset();
    setEmail("");
    setPhoneNumber("");
    setSubject("");
    setMessage("");
    setFullName("");
  }

  //General Variables
  let isValid = true;

  //Contact Form States
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  //Contact Form Error States
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  //Helper Functions for Validation
  function hasLetters(lenght) {
    return /^\d+$/.test(lenght);
  }

  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const contactFormValdiation = () => {
    //Error Form Objects
    const fullNameError = {};
    const phoneNumberError = {};
    const emailError = {};
    const subjectError = {};
    const messageError = {};

    //Name Validation
    if (fullName.trim().length < 5) {
      fullNameError.FullNameSenderShort =
        "El nombre complete tiene que tener más de 5 caracteres";
      isValid = false;
    }

    if (fullName.trim().match(/[0-9]/)) {
      fullNameError.FullNameLong = "Favor de ingresar solamente letras";
      isValid = false;
    }
    setFullNameError(fullNameError);

    //Email Validation
    if (emailIsValid(email) === false) {
      emailError.EmailError = "El email no es valido";
      isValid = false;
    }

    setEmailError(emailError);

    //Phone Validation
    if (hasLetters(phoneNumber) === false) {
      phoneNumberError.PhoneTooShort = "Favor de introducir solo numeros";
      isValid = false;
    }

    if (phoneNumber.trim().length < 10) {
      phoneNumberError.PhoneTooShort =
        "El télefono tiene que tener minimo 10 digitos";
      isValid = false;
    }

    setPhoneNumberError(phoneNumberError);

    //Tema Validation
    if (subject.trim().length < 5) {
      subjectError.FieldToShort = "El campo debe tener más de 5 caracteres";
      isValid = false;
    }

    setSubjectError(subjectError);

    if (message.trim().length < 5) {
      messageError.FieldToShort = "El campo debe tener más de 5 caracteres";
      isValid = false;
    }
    setMessageError(messageError);
  };

  const handleContactForm = (e) => {
    e.preventDefault();

    contactFormValdiation();

    if (isValid) {
      sendContactForm(e);
    }
  };

  return (
    <>
      <form
        className="main-wrapper-contact-form"
        onSubmit={(event) => handleContactForm(event)}
      >
        {/* //Nombre Completo Field */}
        <div className="contact-form-field-wrapper">
          <label className="label-form">
            Nombre Completo<span> *</span>
          </label>
          <input
            className="contact-form-input"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            type="text"
            name="name"
            placeholder="Juan Gonzalez"
          />
          {Object.keys(fullNameError).map((key) => {
            return <div className="error-message">{fullNameError[key]}</div>;
          })}
        </div>

        <div className="row-div-contact-form">
          {/* //Telefono Field */}
          <div className="row-div-small-input-placeholder">
            <label className="label-form">
              Teléfono<span> *</span>
            </label>
            <input
              className="contact-form-input-small"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              type="text"
              name="phone"
              placeholder="81568180"
            />
            {Object.keys(phoneNumberError).map((key) => {
              return (
                <div className="error-message">{phoneNumberError[key]}</div>
              );
            })}
          </div>
          {/* //Email Field */}
          <div className="row-div-small-input-placeholder">
            <label className="label-form">
              Correo<span> *</span>
            </label>
            <input
              className="contact-form-input-small"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              name="email"
              placeholder="juangonzalez@gmail.com"
            />
            {Object.keys(emailError).map((key) => {
              return <div className="error-message">{emailError[key]}</div>;
            })}
          </div>
        </div>

        {/* //Subject Fields */}
        <div className="contact-form-field-wrapper">
          <label className="label-form">
            Tema<span> *</span>
          </label>
          <input
            className="contact-form-input"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            type="text"
            name="subject"
            placeholder="Información sobre envios locales"
          />
          {Object.keys(subjectError).map((key) => {
            return <div className="error-message">{subjectError[key]}</div>;
          })}
        </div>
        {/* //Subject Mensaje Field        */}
        <div className="contact-form-field-wrapper">
          <label className="label-form">
            Mensaje<span> *</span>
          </label>
          <input
            className="contact-form-input-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            type="text"
            name="message"
            placeholder="Información sobre envios locales"
          />
          {Object.keys(messageError).map((key) => {
            return <div className="error-message">{messageError[key]}</div>;
          })}
        </div>
        <p className="sub-paragraph-form">
          Campos marcados con <span> *</span> son requeridos
        </p>
        <button className="btn-contact-form" type="submit">
          Enviar
        </button>
      </form>
    </>
  );
};

export default ContactForm;
