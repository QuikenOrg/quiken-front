import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import "./CreateGuidePagina.scss";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import CheckoutStripe from "../components/Cart/Checkout";

const CreateGuidePagina = () => {
  //Username for fetching points
  let username = localStorage.getItem("email");

  //Create Guide Sucess
  const [success, setSuccess] = useState(false);

  //Guide Data
  const [apiGuide, setApiGuide] = useState();
  const [hrefFile, setHrefFile] = useState("");

  //Payment and Selected Guide
  // const [selectedGuide, setSelectedGuide] = useState(false)
  const [selectedService, setSelectedService] = useState();
  const [paymentMethod, setPaymentMethod] = useState(null);

  //currentUser (HARDCODED)
  // const [currentUser, setcurrentUser] = useState('')
  const [guideCost, setguideCost] = useState(0);

  //Types of Services
  const [services, setServices] = useState();
  const [loadingQuoteData, setLoadingQuoteData] = useState(true);

  //User Points State
  const [points, setPoints] = useState(100);
  const [isPointsEnough, setIsPointsEnough] = useState(false);
  const [needsReset, setNeedsReset] = useState(false);

  //Origin STATES
  const [fullNameSender, setFullNameSender] = useState("");
  const [emailSender, setEmailSender] = useState("");
  const [phoneNumberSender, setPhoneNumberSender] = useState("");
  const [streetAndNumberSender, setStreetandNumberSender] = useState("");
  const [referenciasSender, setReferenciasSender] = useState("");
  const [colonySender, setColonySender] = useState("");
  const [postalCodeSender, setPostalCodeSender] = useState("");
  const [citySender, setCitySender] = useState("");
  const [mexicoStateSender, setMexicoStateSender] = useState("");

  // Origin Error
  const [fullNameSenderError, setFullNameSenderError] = useState("");
  const [emailSenderError, setEmailSenderError] = useState("");
  const [phoneNumberSenderError, setPhoneNumberSenderError] = useState("");
  const [streetAndNumberSenderError, setStreetandNumberSenderError] =
    useState("");
  const [colonySenderError, setColonySenderError] = useState("");
  const [postalCodeSenderError, setPostalCodeSenderError] = useState("");
  const [citySenderError, setCitySenderError] = useState("");
  const [errorQuote, setErrorQuote] = useState("");

  // "" STATES
  const [fullNameReceiver, setFullNameReceiver] = useState("");
  const [emailReceiver, setEmailReceiver] = useState("");
  const [phoneNumberReceiver, setPhoneNumberReceiver] = useState("");
  const [streetAndNumberReceiver, setStreetandNumberReceiver] = useState("");
  const [referenciasReceiver, setReferenciasReceiver] = useState("");
  const [colonyReceiver, setColonyReceiver] = useState("");
  const [postalCodeReceiver, setPostalCodeReceiver] = useState("");
  const [cityReceiver, setCityReceiver] = useState("");
  const [mexicoStateReceiver, setMexicoStateReceiver] = useState("");

  // To Errors
  const [fullNameReceiverError, setFullNameReceiverError] = useState("");
  const [emailReceiverError, setEmailReceiverError] = useState("");
  const [phoneNumberReceiverError, setPhoneNumberReceiverError] = useState("");
  const [streetAndNumberReceiverError, setStreetandNumberReceiverError] =
    useState("");
  const [colonyReceiverError, setColonyReceiverError] = useState("");
  const [postalCodeReceiverError, setPostalCodeReceiverError] = useState("");
  const [cityReceiverError, setCityReceiverError] = useState("");

  //PACKAGE VALUES
  const [packageLenght, setPackageLenght] = useState("");
  const [packageWidth, setPackageWidth] = useState("");
  const [packageHeight, setPackageHeight] = useState("");
  const [packageWeight, setPackageWeight] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  //PACKAGE ERRORS
  const [packageLenghtError, setPackageLenghtError] = useState("");
  const [packageWidthError, setPackageWidthError] = useState("");
  const [packageHeightError, setPackageHeightError] = useState("");
  const [packageWeightError, setPackageWeightError] = useState("");
  const [packageDescriptionError, setPackageDescriptionError] = useState("");

  //Get User Points
  const requestGetPoints = async (username) => {
    const url = "api/user/getPoints/";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });

    const data = await response.json();
    if (response.status === 200) {
      setPoints(data.data[0].points);
    }
  };

  //Create Guide Function
  const createGuide = async () => {
    await createGuideApi();
  };
  //Step One Guide Creation
  const createGuideApi = async () => {
    const urlApiCreate = `${process.env.REACT_APP_API_URL}/generate`;

    const responseApi = await fetch(urlApiCreate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientDetail: {
          accountName: localStorage.getItem("email"),
          apiKey: localStorage.getItem("api_key"),
        },
        origin: {
          name: fullNameSender,
          company: fullNameSender,
          email: emailSender,
          phone: phoneNumberSender,
          street: streetAndNumberSender,
          ext_number: "col",
          int_number: "",
          district: "",
          city: citySender,
          state: mexicoStateSender,
          country: "MX",
          postalCode: postalCodeSender,
          reference: referenciasSender,
        },
        destination: {
          name: fullNameSender,
          company: fullNameReceiver,
          email: emailReceiver,
          phone: phoneNumberReceiver,
          street: streetAndNumberReceiver,
          ext_number: "col",
          int_number: "",
          district: "",
          city: cityReceiver,
          state: mexicoStateReceiver,
          country: "MX",
          postalCode: postalCodeReceiver,
          reference: referenciasReceiver,
        },
        package: {
          content: "ropa",
          type: 1,
          dimensions: {
            length: 10,
            width: 10,
            height: 25,
          },
          weight: 1,
        },
        shipment: {
          service: selectedService,
        },
        settings: {
          labelFormat: "pdf",
        },
      }),
    });
    const data = await responseApi.json();
    setApiGuide(data);
    createGuideQuiken(data);
  };

  //Step Two Guide Creation
  const createGuideQuiken = async (apiGuide) => {
    let guideStatus = "Activa";
    let trackingNumber = apiGuide.data.trackingNumber;
    let fileUrl = apiGuide.data.fileUrl;
    setHrefFile(fileUrl);

    //Creating Guide in Database:
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      let currentUser = localStorage.getItem("email");
      const { data } = await axios.post(
        "/api/user/createguide",
        {
          currentUser,
          guideCost,
          trackingNumber,
          fileUrl,
          guideStatus,
          fullNameSender,
          emailSender,
          phoneNumberSender,
          streetAndNumberSender,
          referenciasSender,
          colonySender,
          postalCodeSender,
          citySender,
          mexicoStateSender,
          fullNameReceiver,
          emailReceiver,
          phoneNumberReceiver,
          streetAndNumberReceiver,
          referenciasReceiver,
          colonyReceiver,
          postalCodeReceiver,
          cityReceiver,
          mexicoStateReceiver,
          packageLenght,
          packageWidth,
          packageHeight,
          packageWeight,
          packageDescription,
        },
        config
      );
      setSuccess(true);
      alert("Tu guida fue creada exitosamente.");
      // history.push("/userdashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // Guide Cost Function
  const calculateNewGuidePrice = async () => {
    const url = "https://api.quiken.mx/rate";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        clientDetail: {
          accountName: localStorage.getItem("email"),
          apiKey: localStorage.getItem("api_key"),
        },
        origin: {
          name: fullNameSender,
          company: "Default Value",
          email: emailSender,
          phone: phoneNumberSender,
          country: "MX",
          postalCode: postalCodeSender,
        },
        destination: {
          name: fullNameReceiver,
          company: "Default Value",
          email: emailReceiver,
          phone: phoneNumberReceiver,
          country: "MX",
          postalCode: postalCodeReceiver,
        },
        package: {
          content: "ropa",
          type: 1,
          dimensions: {
            length: parseInt(packageLenght),
            width: parseInt(packageWidth),
            height: parseInt(packageHeight),
          },
          weight: parseInt(packageWeight),
        },
      }),
    });
    const data = await response.json();
    if (data.status === "SUCCESS") {
      setServices(data.data.services);
      setLoadingQuoteData(false);
    } else if (data.status === "ERROR") {
      setErrorQuote(data.description);
      setLoadingQuoteData(false);
    }
  };

  const handleSelectGuide = (servicio) => {
    setSelectedService(servicio.code);
    setguideCost(servicio.totalPrice);
  };

  //   Validation Functions
  function hasLetters(phone) {
    return /^\d+$/.test(phone);
  }

  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const formValidation = () => {
    const fullNameSenderError = {};
    const emailSenderError = {};
    const phoneNumberSenderError = {};
    const streetAndNumberSenderError = {};
    const colonySenderError = {};
    const postalCodeSenderError = {};
    const citySenderError = {};
    const fullNameReceiverError = {};
    const emailReceiverError = {};
    const phoneNumberReceiverError = {};
    const streetAndNumberReceiverError = {};
    const colonyReceiverError = {};
    const postalCodeReceiverError = {};
    const cityReceiverError = {};
    const packageLenghtError = {};
    const packageWidthError = {};
    const packageHeightError = {};
    const packageWeightError = {};
    const packageDescriptionError = {};

    let isValid = true;

    //Name Validation Origin
    if (fullNameSender.trim().length < 5) {
      fullNameSenderError.FullNameSenderShort =
        "El nombre complete tiene que tener más de 5 caracteres";
      isValid = false;
    }

    if (fullNameSender.trim().match(/[0-9]/)) {
      fullNameSenderError.FullNameLong = "Favor de ingresar solamente letras";
      isValid = false;
    }

    setFullNameSenderError(fullNameSenderError);

    //REGEX Email Validation

    if (emailIsValid(emailSender) === false) {
      emailSenderError.EmailError = "El email no es valido";
      isValid = false;
    }

    setEmailSenderError(emailSenderError);

    if (phoneNumberSender.trim().length < 10) {
      phoneNumberSenderError.PhoneTooShort =
        "El télefono tiene que tener minimo 10 digitos";
      isValid = false;
    }

    if (hasLetters(phoneNumberSender) === false) {
      phoneNumberSenderError.PhoneTooShort = "Favor de introducir solo numeros";
      isValid = false;
    }

    setPhoneNumberSenderError(phoneNumberSenderError);

    if (streetAndNumberSender.trim().length < 5) {
      streetAndNumberSenderError.FieldToShort =
        "El campo debe tener más de 5 caracteres";
      isValid = false;
    }

    setStreetandNumberSenderError(streetAndNumberSenderError);

    if (colonySender.trim().length < 5) {
      colonySenderError.FieldToShort =
        "El campo debe tener más de 5 caracteres";
      isValid = false;
    }

    setColonySenderError(colonySenderError);

    if (postalCodeSender.trim().length < 4) {
      postalCodeSenderError.FieldTooShort =
        "El campo debe tener min 5 caracteres";
      isValid = false;
    }

    if (postalCodeSender.trim().length > 11) {
      postalCodeSenderError.FieldTooLong =
        "El campo debe tener max 11 caracteres";
      isValid = false;
    }

    setPostalCodeSenderError(postalCodeSenderError);

    if (citySender.trim().length < 5) {
      citySenderError.FieldTooShort = "El campo debe tener min 5 caracteres";
      isValid = false;
    }

    setCitySenderError(citySenderError);

    // To Section Validation

    if (fullNameReceiver.trim().length < 5) {
      fullNameReceiverError.FullNameReceiverShort =
        "El nombre complete tiene que tener más de 5 caracteres";
      isValid = false;
    }

    if (fullNameReceiver.trim().match(/[0-9]/)) {
      fullNameReceiverError.FullNameLong = "Favor de ingresar solamente letras";
      isValid = false;
    }

    setFullNameReceiverError(fullNameReceiverError);

    if (emailIsValid(emailReceiver) === false) {
      emailReceiverError.EmailError = "El email no es valido";
      isValid = false;
    }

    setEmailReceiverError(emailReceiverError);

    if (phoneNumberReceiver.trim().length < 10) {
      phoneNumberReceiverError.PhoneTooShort =
        "El télefono tiene que tener minimo 10 digitos";
      isValid = false;
    }

    if (hasLetters(phoneNumberReceiver) === false) {
      phoneNumberReceiverError.PhoneTooShort =
        "Favor de introducir solo numeros";
      isValid = false;
    }

    setPhoneNumberReceiverError(phoneNumberReceiverError);

    if (streetAndNumberReceiver.trim().length < 5) {
      streetAndNumberReceiverError.FieldToShort =
        "El campo debe tener más de 5 caracteres";
      isValid = false;
    }

    setStreetandNumberReceiverError(streetAndNumberReceiverError);

    if (colonyReceiver.trim().length < 5) {
      colonyReceiverError.FieldToShort =
        "El campo debe tener más de 5 caracteres";
      isValid = false;
    }

    setColonyReceiverError(colonyReceiverError);

    if (postalCodeReceiver.trim().length < 4) {
      postalCodeReceiverError.FieldTooShort =
        "El campo debe tener min 5 caracteres";
      isValid = false;
    }

    if (postalCodeReceiver.trim().length > 11) {
      postalCodeReceiverError.FieldTooLong =
        "El campo debe tener max 11 caracteres";
      isValid = false;
    }

    setPostalCodeReceiverError(postalCodeReceiverError);

    if (cityReceiver.trim().length < 5) {
      cityReceiverError.FieldTooShort = "El campo debe tener min 5 caracteres";
      isValid = false;
    }

    setCityReceiverError(cityReceiverError);

    if (packageLenght.length === 0) {
      packageLenghtError.NoValue = "Favor de ingresar un valor";
    }

    if (hasLetters(packageLenght) === false) {
      packageLenghtError.PackageLenghtLetters =
        "Favor de introducir solo numeros";
      isValid = false;
    }

    setPackageLenghtError(packageLenghtError);

    if (packageWidth.length === 0) {
      packageWidthError.NoValue = "Favor de ingresar un valor";
    }

    if (hasLetters(packageWidth) === false) {
      packageWidthError.PackageWidthLetters =
        "Favor de introducir solo numeros";
      isValid = false;
    }

    setPackageWidthError(packageWidthError);

    if (packageHeight.length === 0) {
      packageHeightError.NoValue = "Favor de ingresar un valor";
    }

    if (hasLetters(packageHeight) === false) {
      packageHeightError.PackageHeightLetters =
        "Favor de introducir solo numeros";
      isValid = false;
    }

    setPackageHeightError(packageHeightError);

    if (packageWeight.length === 0) {
      packageWeightError.NoValue = "Favor de ingresar un valor";
    }

    if (hasLetters(packageWeight) === false) {
      packageWeightError.PackageWeightLetters =
        "Favor de introducir solo numeros";
      isValid = false;
    }

    setPackageWeightError(packageWeightError);

    if (packageDescription.length === 0) {
      packageDescriptionError.NoValue = "Favor de ingresar un valor";
    }

    setPackageDescriptionError(packageDescriptionError);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      await calculateNewGuidePrice();
    } else {
      setLoadingQuoteData(true);
      setServices();
      setguideCost(0);
    }
  };

  const payWithPoints = async (username, guideCost) => {
    const url = "api/user/payWithPoints";

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        guideCost: guideCost,
      }),
    });

    const data = await response.json();
    if (response.status === 200) {
      alert("Tu pago con puntos fue exitoso. Agradecemos tu compra");
      setNeedsReset(true);
      createGuide();
    }
  };

  //Use Effect for Payment With Points
  useEffect(() => {
    setNeedsReset(false);
    requestGetPoints(username);
    setIsPointsEnough(false);
    const difference = points - guideCost;
    if (difference >= 0) {
      setIsPointsEnough(true);
    }
  }, [paymentMethod, points, needsReset]);

  return (
    <>
      <Navbar />
      <div className="main-wrapper-page">
        {/* FIRST TWO SECTIONS */}
        <div className="row-first-two-sections">
          {/* ORIGIN SECTION */}
          <div className="seccion-desde-donde-envias">
            <h1 className="subheading-form-create-guide"> 1. ORIGEN:</h1>
            <div>
              <div>
                {/* <label className="form-label" style={{display:'block'}}>Nombre Completo <span style={{color: "red"}}>*</span></label> */}
                <label className="label-create-guide-form">
                  Nombre Completo
                </label>
                <input
                  className="input-create-guide-form"
                  value={fullNameSender}
                  onChange={(event) => setFullNameSender(event.target.value)}
                  type="text"
                  placeholder="Nombre Completo"
                />
                {Object.keys(fullNameSenderError).map((key) => {
                  return <div>{fullNameSenderError[key]}</div>;
                })}
              </div>

              <div>
                <label className="label-create-guide-form">
                  Correo Electrónico
                </label>
                <input
                  className="input-create-guide-form"
                  value={emailSender}
                  onChange={(event) => setEmailSender(event.target.value)}
                  type="email"
                  placeholder="Correo Electrónico"
                />
              </div>
              {Object.keys(emailSenderError).map((key) => {
                return <div>{emailSenderError[key]}</div>;
              })}

              <div>
                <label className="label-create-guide-form">Teléfono</label>
                <input
                  className="input-create-guide-form"
                  value={phoneNumberSender}
                  onChange={(event) => setPhoneNumberSender(event.target.value)}
                  type="text"
                  placeholder="Teléfono"
                />
                {Object.keys(phoneNumberSenderError).map((key) => {
                  return <div>{phoneNumberSenderError[key]}</div>;
                })}
              </div>

              <div>
                <label className="label-create-guide-form">
                  Calle y Número
                </label>
                <input
                  className="input-create-guide-form"
                  value={streetAndNumberSender}
                  onChange={(event) =>
                    setStreetandNumberSender(event.target.value)
                  }
                  type="text"
                  placeholder="Calle y Número"
                />
              </div>
              {Object.keys(streetAndNumberSenderError).map((key) => {
                return <div>{streetAndNumberSenderError[key]}</div>;
              })}

              <div>
                <label className="label-create-guide-form">Referencia</label>
                <input
                  className="input-create-guide-form"
                  value={referenciasSender}
                  onChange={(event) => setReferenciasSender(event.target.value)}
                  type="text"
                  placeholder="Referencias"
                />
              </div>

              <div>
                <label className="label-create-guide-form">Colonia</label>
                <input
                  className="input-create-guide-form"
                  value={colonySender}
                  onChange={(event) => setColonySender(event.target.value)}
                  type="text"
                  placeholder="Colonia"
                />
              </div>
              {Object.keys(colonySenderError).map((key) => {
                return <div>{colonySenderError[key]}</div>;
              })}

              <div>
                <label className="label-create-guide-form">Código Postal</label>
                <input
                  className="input-create-guide-form"
                  value={postalCodeSender}
                  onChange={(event) => setPostalCodeSender(event.target.value)}
                  type="text"
                  placeholder="Codigo Postal"
                />
              </div>
              {Object.keys(postalCodeSenderError).map((key) => {
                return <div>{postalCodeSenderError[key]}</div>;
              })}

              <div>
                <label className="label-create-guide-form">Ciudad</label>
                <input
                  className="input-create-guide-form"
                  value={citySender}
                  onChange={(event) => setCitySender(event.target.value)}
                  type="text"
                  placeholder="Ciudad"
                />
              </div>
              {Object.keys(citySenderError).map((key) => {
                return <div>{citySenderError[key]}</div>;
              })}

              <div className="field-holder">
                <label className="label-create-guide-form">Estado</label>
                <select
                  className="input-create-guide-form"
                  name="Estado"
                  placeholder="Estado"
                  onChange={(event) => setMexicoStateSender(event.target.value)}
                >
                  <option value="no">Seleccione Estado.</option>
                  {/* <option value="Aguascalientes">Aguascalientes</option>
                        <option value="Baja California">Baja California</option>
                        <option value="Baja California Sur">Baja California Sur</option> */}
                  {/* <option value="Campeche">Campeche</option>
                        <option value="Chiapas">Chiapas</option> */}
                  <option value="CH">Chihuahua</option>
                  <option value="CX">Ciudad de México</option>
                  <option value="CO">Coahuila</option>
                  {/* <option value="Colima">Colima</option> */}
                  <option value="DG">Durango</option>
                  {/* <option value="Estado de México">Estado de México</option> */}
                  <option value="GT">Guanajuato</option>
                  {/* <option value="Guerrero">Guerrero</option> */}
                  <option value="HG">Hidalgo</option>
                  <option value="JL">Jalisco</option>
                  {/* <option value="Michoacán">Michoacán</option>
                        <option value="Morelos">Morelos</option>
                        <option value="Nayarit">Nayarit</option> */}
                  <option value="NL">Nuevo León</option>
                  {/* <option value="Oaxaca">Oaxaca</option>
                        <option value="Puebla">Puebla</option> */}
                  <option value="QT">Querétaro</option>
                  {/* <option value="Quintana Roo">Quintana Roo</option> */}
                  <option value="SL">San Luis Potosí</option>
                  {/* <option value="Sinaloa">Sinaloa</option>
                        <option value="Sonora">Sonora</option>
                        <option value="Tabasco">Tabasco</option> */}
                  <option value="TM">Tamaulipas</option>
                  {/* <option value="Tlaxcala">Tlaxcala</option> */}
                  <option value="VE">Veracruz</option>
                  {/* <option value="Yucatán">Yucatán</option>
                        <option value="Zacatecas">Zacatecas</option> */}
                </select>
              </div>
            </div>
          </div>

          {/* TO SECTION */}
          <div className="seccion-desde-donde-envias">
            <h1 className="subheading-form-create-guide">2. DESTINO:</h1>
            <div>
              <div>
                <label className="label-create-guide-form">
                  Nombre Completo
                </label>
                <input
                  className="input-create-guide-form"
                  value={fullNameReceiver}
                  onChange={(event) => setFullNameReceiver(event.target.value)}
                  type="text"
                  placeholder="Nombre Completo"
                />
              </div>
              {Object.keys(fullNameReceiverError).map((key) => {
                return <div>{fullNameReceiverError[key]}</div>;
              })}

              <div>
                <label className="label-create-guide-form">
                  Correo Electrónico
                </label>
                <input
                  className="input-create-guide-form"
                  value={emailReceiver}
                  onChange={(event) => setEmailReceiver(event.target.value)}
                  type="email"
                  placeholder="Correo Electrónico"
                />
                {Object.keys(emailReceiverError).map((key) => {
                  return <div>{emailReceiverError[key]}</div>;
                })}
              </div>

              <div>
                <label className="label-create-guide-form">Teléfono</label>
                <input
                  className="input-create-guide-form"
                  value={phoneNumberReceiver}
                  onChange={(event) =>
                    setPhoneNumberReceiver(event.target.value)
                  }
                  type="text"
                  placeholder="Teléfono"
                />
                {Object.keys(phoneNumberReceiverError).map((key) => {
                  return <div>{phoneNumberReceiverError[key]}</div>;
                })}
              </div>

              <div>
                <label className="label-create-guide-form">
                  Calle y Número
                </label>
                <input
                  className="input-create-guide-form"
                  value={streetAndNumberReceiver}
                  onChange={(event) =>
                    setStreetandNumberReceiver(event.target.value)
                  }
                  type="text"
                  placeholder="Calle y Número"
                />
                {Object.keys(streetAndNumberReceiverError).map((key) => {
                  return <div>{streetAndNumberReceiverError[key]}</div>;
                })}
              </div>

              <div>
                <label className="label-create-guide-form">Referencias</label>
                <input
                  className="input-create-guide-form"
                  value={referenciasReceiver}
                  onChange={(event) =>
                    setReferenciasReceiver(event.target.value)
                  }
                  type="text"
                  placeholder="Referencias"
                />
              </div>

              <div>
                <label className="label-create-guide-form">Colonia</label>
                <input
                  className="input-create-guide-form"
                  value={colonyReceiver}
                  onChange={(event) => setColonyReceiver(event.target.value)}
                  type="text"
                  placeholder="Colonia"
                />
                {Object.keys(colonyReceiverError).map((key) => {
                  return <div>{colonyReceiverError[key]}</div>;
                })}
              </div>

              <div>
                <label className="label-create-guide-form">Código Postal</label>
                <input
                  className="input-create-guide-form"
                  value={postalCodeReceiver}
                  onChange={(event) =>
                    setPostalCodeReceiver(event.target.value)
                  }
                  type="text"
                  placeholder="Codigo Postal"
                />
                {Object.keys(postalCodeReceiverError).map((key) => {
                  return <div>{postalCodeReceiverError[key]}</div>;
                })}
              </div>

              <div>
                <label className="label-create-guide-form">Ciudad</label>
                <input
                  className="input-create-guide-form"
                  value={cityReceiver}
                  onChange={(event) => setCityReceiver(event.target.value)}
                  type="text"
                  placeholder="Ciudad"
                />
                {Object.keys(cityReceiverError).map((key) => {
                  return <div>{cityReceiverError[key]}</div>;
                })}
              </div>

              <div>
                <label className="label-create-guide-form">Estado</label>
                <select
                  className="input-create-guide-form"
                  name="Estado"
                  placeholder="Estado"
                  onChange={(event) =>
                    setMexicoStateReceiver(event.target.value)
                  }
                >
                  <option value="no">Seleccione Estado.</option>
                  {/* <option value="Aguascalientes">Aguascalientes</option>
                      <option value="Baja California">Baja California</option>
                      <option value="Baja California Sur">Baja California Sur</option> */}
                  {/* <option value="Campeche">Campeche</option>
                      <option value="Chiapas">Chiapas</option> */}
                  <option value="CH">Chihuahua</option>
                  <option value="CX">Ciudad de México</option>
                  <option value="CO">Coahuila</option>
                  {/* <option value="Colima">Colima</option> */}
                  <option value="DG">Durango</option>
                  {/* <option value="Estado de México">Estado de México</option> */}
                  <option value="GT">Guanajuato</option>
                  {/* <option value="Guerrero">Guerrero</option> */}
                  <option value="HG">Hidalgo</option>
                  <option value="JL">Jalisco</option>
                  {/* <option value="Michoacán">Michoacán</option>
                      <option value="Morelos">Morelos</option>
                      <option value="Nayarit">Nayarit</option> */}
                  <option value="NL">Nuevo León</option>
                  {/* <option value="Oaxaca">Oaxaca</option>
                      <option value="Puebla">Puebla</option> */}
                  <option value="QT">Querétaro</option>
                  {/* <option value="Quintana Roo">Quintana Roo</option> */}
                  <option value="SL">San Luis Potosí</option>
                  {/* <option value="Sinaloa">Sinaloa</option>
                      <option value="Sonora">Sonora</option>
                      <option value="Tabasco">Tabasco</option> */}
                  <option value="TM">Tamaulipas</option>
                  {/* <option value="Tlaxcala">Tlaxcala</option> */}
                  <option value="VE">Veracruz</option>
                  {/* <option value="Yucatán">Yucatán</option>
                      <option value="Zacatecas">Zacatecas</option> */}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* THIRD AND FOURTH SECTION */}
        <div className="third-forth-sections">
          {/* PACKAGE SECTION */}
          <div className="seccion-informacion-paquete">
            <h2 className="subheading-form-create-guide">
              3. INFORMACIÓN DEL PAQUETE
            </h2>
            <div>
              <div>
                <label className="label-create-guide-form">Largo (cm)</label>
                <input
                  className="input-create-guide-form"
                  value={packageLenght}
                  onChange={(event) => {
                    setPackageLenght(event.target.value);
                  }}
                  type="text"
                  placeholder="Largo (cm)"
                />
                {Object.keys(packageLenghtError).map((key) => {
                  return <div>{packageLenghtError[key]}</div>;
                })}
              </div>

              <div>
                <label className="label-create-guide-form">Ancho (cm)</label>
                <input
                  className="input-create-guide-form"
                  value={packageWidth}
                  onChange={(event) => {
                    setPackageWidth(event.target.value);
                  }}
                  type="email"
                  placeholder="Ancho (cm)"
                />
                {Object.keys(packageWidthError).map((key) => {
                  return <div>{packageWidthError[key]}</div>;
                })}
              </div>

              <div>
                <label className="label-create-guide-form">Alto (cm)</label>
                <input
                  className="input-create-guide-form"
                  value={packageHeight}
                  onChange={(event) => {
                    setPackageHeight(event.target.value);
                  }}
                  type="text"
                  placeholder="Alto (cm)"
                />
                {Object.keys(packageHeightError).map((key) => {
                  return <div>{packageHeightError[key]}</div>;
                })}
              </div>

              {/* <h4>Peso del paquete que envías</h4> */}

              <div>
                <label className="label-create-guide-form">
                  Peso del paquete (kg)
                </label>
                <input
                  className="input-create-guide-form"
                  value={packageWeight}
                  onChange={(event) => {
                    setPackageWeight(event.target.value);
                  }}
                  type="text"
                  placeholder="Peso del paquete en (kg)"
                />
                {Object.keys(packageWeightError).map((key) => {
                  return <div>{packageWeightError[key]}</div>;
                })}
              </div>

              {/* <h4>¿Que envías?</h4> */}

              <div>
                <label className="label-create-guide-form">
                  Contenido del paquete (Descripción corta)
                </label>
                <input
                  className="input-create-guide-form"
                  value={packageDescription}
                  onChange={(event) => {
                    setPackageDescription(event.target.value);
                  }}
                  type="text"
                  placeholder="Contenido del paquete (Descripción corta)"
                />
                {Object.keys(packageDescriptionError).map((key) => {
                  return <div>{packageDescriptionError[key]}</div>;
                })}
              </div>

              <div className="buttons-wrapper-row">
                <Link to="/userdashboard">
                  <button id="blue" className="btn-create-guide-form">
                    Regresar
                  </button>
                </Link>
                <button
                  className="btn-create-guide-form"
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                >
                  Cotizar
                </button>
              </div>
            </div>
          </div>

          <div className="payment-main-wrapper">
            <div className="payment-section">
              <h1 className="subheading-form-create-guide">
                {" "}
                4. SELECCIONA TU TIPO DE ENVIO:
              </h1>
              <div className="table-holder">
                {loadingQuoteData ? (
                  <div className="cotizar-paragraph">
                    Llena todo los campos y da click en Cotizar!
                  </div>
                ) : (
                  <table>
                    <tr className="table-row-heading">
                      <th></th>
                      <th>Servicio</th>
                      <th>Tiempo Entrega</th>
                      <th>Precio</th>
                    </tr>
                    {services.map((servicio, i) => {
                      return (
                        <tr
                          className="table-data-row"
                          onClick={() => handleSelectGuide(servicio)}
                        >
                          <td>{i + 1}</td>
                          <td>{servicio.type.toUpperCase()}</td>
                          <td>{servicio.estimateDelivery}</td>
                          <td>${servicio.totalPrice}.99</td>
                        </tr>
                      );
                    })}
                  </table>
                )}
              </div>
              <div className="wrapper-guide-cost">
                <div></div>

                <label className="heading-guide-cost">Costo de tu Guia</label>
                <br></br>
                <label className="price-guide-cost">{guideCost}.00</label>
              </div>
              <h1 className="subheading-form-create-guide">
                {" "}
                5. METODO DE PAGO:
              </h1>
              <MetodoDePagoSelectorDiv
                guideCost={guideCost}
                setPaymentMethod={setPaymentMethod}
              />
              {/* <div className="payment-method-section-wrapper">
                    <label className="payment-method-subheading">Selecciona tu forma de pago</label>
                    <select className="payment-method-selector" onChange ={(event) => {
                      setPaymentMethod(event.target.value)
                      console.log(event.target.value);
                      }}>
                      <option value={null}>Escoje Uno</option>
                      <option value="tarjeta">Tarjeta de Credito</option>
                      <option value="puntos">Pagar con Puntos</option>
                    </select>
                  </div> */}

              <PaymentDiv
                username={username}
                isPointsEnough={isPointsEnough}
                points={points}
                payWithPoints={payWithPoints}
                paymentMethod={paymentMethod}
                guideCost={guideCost}
                createGuide={createGuide}
              />
              {/* <CheckoutStripe guideCost={guideCost} createGuide={createGuide}/> */}
              {success ? (
                <div>
                  <h1>Tu guía fue creada exitosamente.</h1>

                  <a href={hrefFile} target="_blank" rel="noreferrer">
                    <button className="btn-create-guide-form">Imprimir</button>
                  </a>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        {/* <div className="buttons-wrapper">
              <button className="btn-contact-form" onClick={(event) => {handleSubmit(event)}}>Siguiente</button>
            </div> */}
      </div>
      <Footer />
    </>
  );
};

const PaymentDiv = (props) => {
  const {
    paymentMethod,
    username,
    guideCost,
    createGuide,
    points,
    isPointsEnough,
    payWithPoints,
  } = props;

  if (paymentMethod === "") {
    return <div>Nothing</div>;
  } else if (paymentMethod === "tarjeta") {
    return (
      <div>
        <h4 className="ingresa-tarjeta-datos-subheading">
          Ingresa tu tarjeta de credito y da click.
        </h4>
        <p className="ingresa-tarjeta-descripcion">
          (Numéro de tarjeta, fecha de expiración, codigo, codigo postal)
        </p>
        <CheckoutStripe guideCost={guideCost} createGuide={createGuide} />
      </div>
    );
  } else if (paymentMethod === "puntos") {
    return (
      <div className="main-wrapper-puntos">
        <div className="div-saldos-holder">
          <div>
            <h1>Saldo Actual:</h1>
            <h1> $ {points}.00</h1>
          </div>
          <div>
            <h1>Costo de Guida:</h1>
            <h1>$ {guideCost}.00</h1>
          </div>
          <div>
            <h1>Saldo Nuevo:</h1>
            <h1>$ {points - guideCost}.00</h1>
          </div>
        </div>

        <div className="buttons-holder">
          {isPointsEnough ? (
            <div>
              <Link to="/recargarsaldo">
                <button>Recargar Saldo</button>
              </Link>
              <button
                style={{ color: "red" }}
                onClick={() => payWithPoints(username, guideCost)}
              >
                Pagar
              </button>
            </div>
          ) : (
            <div>
              <div>
                No cuentas con suficientes puntos. Favor de seleccionar otro
                metodo de pago o recargar puntos.
              </div>
              <Link to="/recargarsaldo">
                <button>Recargar Saldo</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  } else return <></>;
};

const MetodoDePagoSelectorDiv = (props) => {
  const { guideCost, setPaymentMethod } = props;

  if (guideCost > 0) {
    return (
      <div className="payment-method-section-wrapper">
        <label className="payment-method-subheading">
          Selecciona tu forma de pago
        </label>
        <select
          className="payment-method-selector"
          onChange={(event) => {
            setPaymentMethod(event.target.value);
          }}
        >
          <option value={null}>Escoje Uno</option>
          <option value="tarjeta">Tarjeta de Credito</option>
          <option value="puntos">Pagar con Puntos</option>
        </select>
      </div>
    );
  } else {
    return <div>Favor de cotizar una guida para continuar</div>;
  }
};

export default CreateGuidePagina;
