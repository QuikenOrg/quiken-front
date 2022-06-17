import React from "react";
import { useState } from 'react';

export default function WhereFromForm (props) {
  
  //Input Value State
  const [fullNameSender, setFullNameSender] = useState('');
  const [emailSender, setEmailSender] = useState('');
  const [phoneNumberSender, setPhoneNumberSender] = useState('');
  const [streetAndNumberSender, setStreetandNumberSender] = useState('');  
  const [referenciasSender, setReferenciasSender] = useState('');
  const [colonySender, setColonySender] = useState('');
  const [postalCodeSender, setPostalCodeSender] = useState('');
  const [citySender, setCitySender] = useState('');
  const [mexicoStateSender, setMexicoStateSender] = useState('');

  const [fullNameSenderError, setFullNameSenderError] = useState('');
  const [emailSenderError, setEmailSenderError] = useState('');
  const [phoneNumberSenderError, setPhoneNumberSenderError] = useState('');
  const [streetAndNumberSenderError, setStreetandNumberSenderError] = useState('');
  const [colonySenderError, setColonySenderError] = useState('');
  const [postalCodeSenderError, setPostalCodeSenderError] = useState('');
  const [citySenderError, setCitySenderError] = useState('');

  const formValidation = () => {
    const fullNameSenderError = {};
    const emailSenderError = {};
    const phoneNumberSenderError = {};
    const streetAndNumberSenderError = {};
    const colonySenderError = {};
    const postalCodeSenderError = {};
    const citySenderError = {}
    

    let isValid = true;
    
    //Name Validation
    if (fullNameSender.trim().length < 5) {
      fullNameSenderError.FullNameSenderShort = "El nombre complete tiene que tener más de 5 caracteres";
      isValid = false;
      console.log("name too short")
    }

    if (fullNameSender.trim().match(/[0-9]/)) {
      fullNameSenderError.FullNameLong = "Favor de ingresar solamente letras";
      isValid = false;
    }

    setFullNameSenderError(fullNameSenderError)

    //REGEX Email validation
    function emailIsValid (email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    
    if (emailIsValid(emailSender) == false) {
      emailSenderError.EmailError = "El email no es valido"
      isValid = false;
      console.log("The email is not valid")
    }

    setEmailSenderError(emailSenderError)
    
    if (phoneNumberSender.trim().length < 10) {
      phoneNumberSenderError.PhoneTooShort = "El télefono tiene que tener minimo 10 digitos"
      console.log("el telefono es muy corto")
      isValid = false;
    }
    
    function hasLetters (phone) {
      return /^\d+$/.test(phone)
    }

    if (hasLetters(phoneNumberSender) == false) {
      phoneNumberSenderError.PhoneTooShort = "Favor de introducir solo numeros"
      isValid = false;
    }

    setPhoneNumberSenderError(phoneNumberSenderError)

    if (streetAndNumberSender.trim().length < 5) {
      streetAndNumberSenderError.FieldToShort = "El campo debe tener más de 5 caracteres";
      isValid = false;
    }

    setStreetandNumberSenderError(streetAndNumberSenderError)

    if (colonySender.trim().length < 5) {
      colonySenderError.FieldToShort = "El campo debe tener más de 5 caracteres";
      isValid = false;
    }

    setColonySenderError(colonySenderError)

    if (postalCodeSender.trim().length < 4) {
      postalCodeSenderError.FieldTooShort = "El campo debe tener min 5 caracteres";
      isValid = false;
    }

    if (postalCodeSender.trim().length > 11) {
      postalCodeSenderError.FieldTooLong = "El campo debe tener max 11 caracteres";
      isValid = false;
    }
    
    setPostalCodeSenderError(postalCodeSenderError)

    if (citySender.trim().length < 5) {
      citySenderError.FieldTooShort = "El campo debe tener min 5 caracteres";
      isValid = false;
    }

    setCitySenderError(citySenderError)

    return isValid
  }

  let handleWhereFromFormSubtmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    
    if (isValid) {
    
    console.log(
        fullNameSender,
        emailSender,
        phoneNumberSender,
        streetAndNumberSender,
        referenciasSender,
        colonySender,
        postalCodeSender,
        citySender,
        mexicoStateSender
    );
    props.stepHandler()
  }  
}

  return (
    <div>
      <h1>¿Desde Dónde Envías?</h1>
        <div>
        <div>
          {Object.keys(fullNameSenderError).map((key) => {return <div>{fullNameSenderError[key] }</div>})}
          <input value={fullNameSender}
            onChange= {event => setFullNameSender(event.target.value)}
            type="text" placeholder="Nombre Completo" />
            </div>
                            
        <div>
            {Object.keys(emailSenderError).map((key) => { return <div>{emailSenderError[key]}</div> })}  
            <input value={emailSender} onChange={(event) => setEmailSender(event.target.value)} type="email" placeholder="Correo Electrónico" />
            </div>                
            
        <div>
            {Object.keys(phoneNumberSenderError).map((key) => {return <div>{phoneNumberSenderError[key] }</div>})}
            <input value={phoneNumberSender} onChange={(event) => setPhoneNumberSender(event.target.value)} type="text" placeholder="Teléfono" />
        </div>
        
        <div>
            {Object.keys(streetAndNumberSenderError).map((key) => {return <div>{streetAndNumberSenderError[key] }</div>})}
            <input value={streetAndNumberSender} onChange={(event) => setStreetandNumberSender(event.target.value)} type="text" placeholder="Calle y Número" />
            </div>
        
        <div>
              <input value={referenciasSender} onChange={(event) => setReferenciasSender(event.target.value)} type="text" placeholder="Referencias" />
            </div>
            
        <div>
        {Object.keys(colonySenderError).map((key) => {return <div>{colonySenderError[key] }</div>})}
              <input value={colonySender} onChange={(event) => setColonySender(event.target.value)} type="text" placeholder="Colonia" />
            </div>
        
        <div>
        {Object.keys(postalCodeSenderError).map((key) => {return <div>{postalCodeSenderError[key] }</div>})}
              <input value={postalCodeSender} onChange={(event) => setPostalCodeSender(event.target.value)} type="text" placeholder="Codigo Postal" />
            </div>

        <div>
        {Object.keys(citySenderError).map((key) => {return <div>{citySenderError[key] }</div>})}
              <input value={citySender} onChange={(event) => setCitySender(event.target.value)} type="text" placeholder="Ciudad" />
            </div>

        <div>
            <select name="Estado" placeholder="Estado" onChange ={(event) => setMexicoStateSender(event.target.value)}>
              <option value="no">Seleccione Estado.</option>
              <option value="Aguascalientes">Aguascalientes</option>
              <option value="Baja California">Baja California</option>
              <option value="Baja California Sur">Baja California Sur</option>
              <option value="Campeche">Campeche</option>
              <option value="Chiapas">Chiapas</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="CDMX">Ciudad de México</option>
              <option value="Coahuila">Coahuila</option>
              <option value="Colima">Colima</option>
              <option value="Durango">Durango</option>
              <option value="Estado de México">Estado de México</option>
              <option value="Guanajuato">Guanajuato</option>
              <option value="Guerrero">Guerrero</option>
              <option value="Hidalgo">Hidalgo</option>
              <option value="Jalisco">Jalisco</option>
              <option value="Michoacán">Michoacán</option>
              <option value="Morelos">Morelos</option>
              <option value="Nayarit">Nayarit</option>
              <option value="Nuevo León">Nuevo León</option>
              <option value="Oaxaca">Oaxaca</option>
              <option value="Puebla">Puebla</option>
              <option value="Querétaro">Querétaro</option>
              <option value="Quintana Roo">Quintana Roo</option>
              <option value="San Luis Potosí">San Luis Potosí</option>
              <option value="Sinaloa">Sinaloa</option>
              <option value="Sonora">Sonora</option>
              <option value="Tabasco">Tabasco</option>
              <option value="Tamaulipas">Tamaulipas</option>
              <option value="Tlaxcala">Tlaxcala</option>
              <option value="Veracruz">Veracruz</option>
              <option value="Yucatán">Yucatán</option>
              <option value="Zacatecas">Zacatecas</option>
          </select>
        </div>
        <button onClick={ (event) => handleWhereFromFormSubtmit(event)}>Siguiente</button>
      
      </div>
    </div>
  );
}

