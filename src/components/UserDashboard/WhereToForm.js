import React from "react";
import { useState } from 'react';

export default function WhereToForm(props) {
  
  //Input Value State
  const [fullNameReceiver, setFullNameReceiver] = useState('');
  const [emailReceiver, setEmailReceiver] = useState('');
  const [phoneNumberReceiver, setPhoneNumberReceiver] = useState('');
  const [streetAndNumberReceiver, setStreetandNumberReceiver] = useState('');  
  const [referenciasReceiver, setReferenciasReceiver] = useState('');
  const [colonyReceiver, setColonyReceiver] = useState('');
  const [postalCodeReceiver, setPostalCodeReceiver] = useState('');
  const [cityReceiver, setCityReceiver] = useState('');
  const [mexicoStateReceiver, setMexicoStateReceiver] = useState('');

  const [fullNameReceiverError, setFullNameReceiverError] = useState('');
  const [emailReceiverError, setEmailReceiverError] = useState('');
  const [phoneNumberReceiverError, setPhoneNumberReceiverError] = useState('');
  const [streetAndNumberReceiverError, setStreetandNumberReceiverError] = useState('');
  const [colonyReceiverError, setColonyReceiverError] = useState('');
  const [postalCodeReceiverError, setPostalCodeReceiverError] = useState('');
  const [cityReceiverError, setCityReceiverError] = useState('');

  const formValidation = () => {
    const fullNameReceiverError = {};
    const emailReceiverError = {};
    const phoneNumberReceiverError = {};
    const streetAndNumberReceiverError = {};
    const colonyReceiverError = {};
    const postalCodeReceiverError = {};
    const cityReceiverError = {}
    

    let isValid = true;
    
    //Name Validation
    if (fullNameReceiver.trim().length < 5) {
      fullNameReceiverError.FullNameReceiverShort = "El nombre complete tiene que tener más de 5 caracteres";
      isValid = false;
      console.log("name too short")
    }

    if (fullNameReceiver.trim().match(/[0-9]/)) {
      fullNameReceiverError.FullNameLong = "Favor de ingresar solamente letras";
      isValid = false;
    }

    setFullNameReceiverError(fullNameReceiverError)

    //REGEX Email validation
    function emailIsValid (email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    
   

    
    return isValid
  }

  let handleWhereFromFormSubtmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    
  if (isValid) {
    console.log(
        fullNameReceiver,
        emailReceiver,
        phoneNumberReceiver,
        streetAndNumberReceiver,
        referenciasReceiver,
        colonyReceiver,
        postalCodeReceiver,
        cityReceiver,
        mexicoStateReceiver
      );
    props.stepHandler();  
  }  
}

  return (
    <div>
      <h1>¿Hacia Dónde Envías?</h1>
        <div>
        <div>
            {Object.keys(fullNameReceiverError).map((key) => {return <div>{fullNameReceiverError[key] }</div>})}
            <input value={fullNameReceiver}
            onChange= {event => setFullNameReceiver(event.target.value)}
            type="text" placeholder="Nombre Completo" />
            </div>
                            
          <div>
            {Object.keys(emailReceiverError).map((key) => { return <div>{emailReceiverError[key]}</div> })}  
            <input value={emailReceiver} onChange={(event) => setEmailReceiver(event.target.value)} type="email" placeholder="Correo Electrónico" />
          </div>                
            
          <div>
            {Object.keys(phoneNumberReceiverError).map((key) => {return <div>{phoneNumberReceiverError[key] }</div>})}
            <input value={phoneNumberReceiver} onChange={(event) => setPhoneNumberReceiver(event.target.value)} type="text" placeholder="Teléfono" />
          </div>
        
          <div>
              {Object.keys(streetAndNumberReceiverError).map((key) => {return <div>{streetAndNumberReceiverError[key] }</div>})}
              <input  value={streetAndNumberReceiver} onChange={(event) => setStreetandNumberReceiver(event.target.value)} type="text" placeholder="Calle y Número" />
          </div>
        
          <div>
              <input  value={referenciasReceiver} onChange={(event) => setReferenciasReceiver(event.target.value)} type="text" placeholder="Referencias" />
           </div>
            
        <div>
            {Object.keys(colonyReceiverError).map((key) => {return <div>{colonyReceiverError[key] }</div>})}
            <input value={colonyReceiver} onChange={(event) => setColonyReceiver(event.target.value)} type="text" placeholder="Colonia" />
          </div>
        
          <div>
            {Object.keys(postalCodeReceiverError).map((key) => {return <div>{postalCodeReceiverError[key] }</div>})}
            <input value={postalCodeReceiver} onChange={(event) => setPostalCodeReceiver(event.target.value)} type="text" placeholder="Codigo Postal" />
          </div>

          <div>
            {Object.keys(cityReceiverError).map((key) => {return <div>{cityReceiverError[key] }</div>})}
            <input value={cityReceiver} onChange={(event) => setCityReceiver(event.target.value)} type="text" placeholder="Ciudad" />
          </div>

          <div>
            <select name="Estado" placeholder="Estado" onChange ={(event) => setMexicoStateReceiver(event.target.value)}>
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