import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios'
import './CreateGuidePagina.scss'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom';
import Checkout from '../components/Cart/Checkout'

const CreateGuidePagina = () => {
  
  let history = useHistory();
  //General Values
  let isValid = false;

  //Set current user with local storage

  //currentUser (HARDCODED)
  const [currentUser, setcurrentUser] = useState('')
  const [guideCost, setguideCost] = useState(0)

    //Origin STATES
  const [fullNameSender, setFullNameSender] = useState('');
  const [emailSender, setEmailSender] = useState('');
  const [phoneNumberSender, setPhoneNumberSender] = useState('');
  const [streetAndNumberSender, setStreetandNumberSender] = useState('');  
  const [referenciasSender, setReferenciasSender] = useState('');
  const [colonySender, setColonySender] = useState('');
  const [postalCodeSender, setPostalCodeSender] = useState('');
  const [citySender, setCitySender] = useState('');
  const [mexicoStateSender, setMexicoStateSender] = useState('');
    // Origin Error
  const [fullNameSenderError, setFullNameSenderError] = useState('');
  const [emailSenderError, setEmailSenderError] = useState('');
  const [phoneNumberSenderError, setPhoneNumberSenderError] = useState('');
  const [streetAndNumberSenderError, setStreetandNumberSenderError] = useState('');
  const [colonySenderError, setColonySenderError] = useState('');
  const [postalCodeSenderError, setPostalCodeSenderError] = useState('');
  const [citySenderError, setCitySenderError] = useState('');

    // To STATES
  const [fullNameReceiver, setFullNameReceiver] = useState('');
  const [emailReceiver, setEmailReceiver] = useState('');
  const [phoneNumberReceiver, setPhoneNumberReceiver] = useState('');
  const [streetAndNumberReceiver, setStreetandNumberReceiver] = useState('');  
  const [referenciasReceiver, setReferenciasReceiver] = useState('');
  const [colonyReceiver, setColonyReceiver] = useState('');
  const [postalCodeReceiver, setPostalCodeReceiver] = useState('');
  const [cityReceiver, setCityReceiver] = useState('');
  const [mexicoStateReceiver, setMexicoStateReceiver] = useState('');
  
  // To Errors
  const [fullNameReceiverError, setFullNameReceiverError] = useState('');
  const [emailReceiverError, setEmailReceiverError] = useState('');
  const [phoneNumberReceiverError, setPhoneNumberReceiverError] = useState('');
  const [streetAndNumberReceiverError, setStreetandNumberReceiverError] = useState('');
  const [colonyReceiverError, setColonyReceiverError] = useState('');
  const [postalCodeReceiverError, setPostalCodeReceiverError] = useState('');
  const [cityReceiverError, setCityReceiverError] = useState('');
  

  //PACKAGE SECTION

  //PACKAGE VALUES
  const [packageLenght, setPackageLenght] = useState('');
  const [packageWidth, setPackageWidth] = useState('');
  const [packageHeight, setPackageHeight  ] = useState('');
  const [packageWeight, setPackageWeight] = useState('');  
  const [packageDescription, setPackageDescription] = useState('');
    //PACKAGE ERRORS
  const [packageLenghtError, setPackageLenghtError] = useState('');
  const [packageWidthError, setPackageWidthError] = useState('');
  const [packageHeightError, setPackageHeightError  ] = useState('');
  const [packageWeightError, setPackageWeightError] = useState('');  
  const [packageDescriptionError, setPackageDescriptionError] = useState('');

// Guide Cost Function
const calculateNewGuidePrice = () => {
  const result = 3 * packageLenght * packageWidth * packageHeight / 4000
  if (result !== NaN) {
    let finalResult = parseInt(result)
    if (finalResult < 100) {
      finalResult = 99
    }
    setguideCost(finalResult)
    console.log(guideCost)
  } 

}


//   Validation Functions
  function hasLetters (phone) {
    return /^\d+$/.test(phone)
  }

  function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
      fullNameSenderError.FullNameSenderShort = "El nombre complete tiene que tener más de 5 caracteres";
      isValid = false;
      console.log("name too short")
    }

    if (fullNameSender.trim().match(/[0-9]/)) {
      fullNameSenderError.FullNameLong = "Favor de ingresar solamente letras";
      isValid = false;
    }

    setFullNameSenderError(fullNameSenderError)

    //REGEX Email Validation 
    
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

    // To Section Validation

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
    
    if (emailIsValid(emailReceiver) == false) {
        emailReceiverError.EmailError = "El email no es valido"
        isValid = false;
        console.log("The email is not valid")
      }
  
      setEmailReceiverError(emailReceiverError)
      
    if (phoneNumberReceiver.trim().length < 10) {
        phoneNumberReceiverError.PhoneTooShort = "El télefono tiene que tener minimo 10 digitos"
        console.log("el telefono es muy corto")
        isValid = false;
      }

      if (hasLetters(phoneNumberReceiver) == false) {
        phoneNumberReceiverError.PhoneTooShort = "Favor de introducir solo numeros"
        isValid = false;
      }
  
      setPhoneNumberReceiverError(phoneNumberReceiverError)
  
      if (streetAndNumberReceiver.trim().length < 5) {
        streetAndNumberReceiverError.FieldToShort = "El campo debe tener más de 5 caracteres";
        isValid = false;
      }
  
      setStreetandNumberReceiverError(streetAndNumberReceiverError)
  
      if (colonyReceiver.trim().length < 5) {
        colonyReceiverError.FieldToShort = "El campo debe tener más de 5 caracteres";
        isValid = false;
      }
  
      setColonyReceiverError(colonyReceiverError)
  
      if (postalCodeReceiver.trim().length < 4) {
        postalCodeReceiverError.FieldTooShort = "El campo debe tener min 5 caracteres";
        isValid = false;
      }
  
      if (postalCodeReceiver.trim().length > 11) {
        postalCodeReceiverError.FieldTooLong = "El campo debe tener max 11 caracteres";
        isValid = false;
      }
      
      setPostalCodeReceiverError(postalCodeReceiverError)
  
      if (cityReceiver.trim().length < 5) {
        cityReceiverError.FieldTooShort = "El campo debe tener min 5 caracteres";
        isValid = false;
      }
  
      setCityReceiverError(cityReceiverError)
      
      if (packageLenght.length == 0) {
        packageLenghtError.NoValue = "Favor de ingresar un valor"
      }
  
      if (hasLetters(packageLenght) == false) {
        console.log("solo numeros")
        packageLenghtError.PackageLenghtLetters = "Favor de introducir solo numeros"
        isValid = false;
      }
  
      setPackageLenghtError(packageLenghtError)
  
      if (packageWidth.length == 0) {
        packageWidthError.NoValue = "Favor de ingresar un valor"
      }
  
      if (hasLetters(packageWidth) == false) {
        console.log("solo numeros")
        packageWidthError.PackageWidthLetters = "Favor de introducir solo numeros"
        isValid = false;
      }
  
      setPackageWidthError(packageWidthError)
      
      if (packageHeight.length == 0) {
        packageHeightError.NoValue = "Favor de ingresar un valor"
      }
  
      if (hasLetters(packageHeight) == false) {
        console.log("solo numeros")
        packageHeightError.PackageHeightLetters = "Favor de introducir solo numeros"
        isValid = false;
      }
  
      setPackageHeightError(packageHeightError)
  
      if (packageWeight.length == 0) {
        packageWeightError.NoValue = "Favor de ingresar un valor"
      }
  
      if (hasLetters(packageWeight) == false) {
        console.log("solo numeros")
        packageWeightError.PackageWeightLetters = "Favor de introducir solo numeros"
        isValid = false;
      }
  
      setPackageWeightError(packageWeightError)
      
      if (packageDescription.length == 0) {
        packageDescriptionError.NoValue = "Favor de ingresar un valor"
      }
  
      setPackageDescriptionError(packageDescriptionError)

    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = formValidation();
    
    if (isValid) {
    
    let guideStatus = "Activa"
    //Creating Guide in Database:
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      let currentUser = localStorage.getItem('email')
      console.log(currentUser)
      const { data } = await axios.post(
        "/api/user/createguide",
        {
          currentUser,
          guideCost,
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
          packageDescription
        },
        config
      );

      history.push("/userdashboard");
    } catch (error) {
      console.log(error)
    }
    
    
    //GUIDE CONSOLE LOG
    console.log(
        'FullnameSender: ',fullNameSender,<br/>,
        'EmailSender: ',emailSender, <br/>, 
        'PhoneNumberSender ',phoneNumberSender, <br/>,
        'streetAndNumberSender',streetAndNumberSender, <br/>,
        'referenciasSender',referenciasSender, <br/>,
        'colonySender',colonySender, <br/>,
        'postalCodeSender',postalCodeSender, <br/>,
        'citySender',citySender, <br/>,
        'mexicoStateSender',mexicoStateSender, <br/>,
        'fullNameReceiver',fullNameReceiver, <br/>,
        'emailReceiver',emailReceiver, <br/>,
        'phoneNumberReceiver',phoneNumberReceiver, <br/>,
        'streetAndNumberReceiver',streetAndNumberReceiver, <br/>,
        'referenciasReceiver',referenciasReceiver, <br/>,
        'colonyReceiver',colonyReceiver, <br/>,
        'postalCodeReceiver',postalCodeReceiver, <br/>,
        'cityReceiver',cityReceiver, <br/>,
        'mexicoStateReceiver',mexicoStateReceiver, <br/>,
        'packageLenght',packageLenght, <br/>,
        'packageWidth', packageWidth, <br/>,
        'packageHeight', packageHeight, <br/>,
        'packageWeight', packageWeight, <br/>,
        'packageDescription',packageDescription,<br/>,
    );
  }  
}

    return (
      <>
        <Navbar/>
        <div className="main-wrapper-page">                    
            
            {/* ORIGIN SECTION */}
            <div>
            <h1 className="subheading-form-create-guide">¿Desde Dónde Envías?</h1>
                <div>
                <div>
                {/* <label className="form-label" style={{display:'block'}}>Nombre Completo <span style={{color: "red"}}>*</span></label> */}
                <input className="input-create-guide-form" value={fullNameSender}
                    onChange= {event => setFullNameSender(event.target.value)}
                    type="text" placeholder="Nombre Completo" />
                {Object.keys(fullNameSenderError).map((key) => {return <div>{fullNameSenderError[key] }</div>})}
                    </div>
                                    
                <div>
                    <input className="input-create-guide-form" value={emailSender} onChange={(event) => setEmailSender(event.target.value)} type="email" placeholder="Correo Electrónico" />
                    </div>                
                    {Object.keys(emailSenderError).map((key) => { return <div>{emailSenderError[key]}</div> })}  
                    
                <div>
                    <input className="input-create-guide-form" value={phoneNumberSender} onChange={(event) => setPhoneNumberSender(event.target.value)} type="text" placeholder="Teléfono" />
                    {Object.keys(phoneNumberSenderError).map((key) => {return <div>{phoneNumberSenderError[key] }</div>})}
                </div>
                
                <div>
                    <input className="input-create-guide-form" value={streetAndNumberSender} onChange={(event) => setStreetandNumberSender(event.target.value)} type="text" placeholder="Calle y Número" />
                    </div>
                    {Object.keys(streetAndNumberSenderError).map((key) => {return <div>{streetAndNumberSenderError[key] }</div>})}
                
                <div>
                    <input className="input-create-guide-form" value={referenciasSender} onChange={(event) => setReferenciasSender(event.target.value)} type="text" placeholder="Referencias" />
                    </div>
                    
                <div>
                    <input className="input-create-guide-form" value={colonySender} onChange={(event) => setColonySender(event.target.value)} type="text" placeholder="Colonia" />
                    </div>
                {Object.keys(colonySenderError).map((key) => {return <div>{colonySenderError[key] }</div>})}
                
                <div>
                    <input className="input-create-guide-form" value={postalCodeSender} onChange={(event) => setPostalCodeSender(event.target.value)} type="text" placeholder="Codigo Postal" />
                    </div>
                {Object.keys(postalCodeSenderError).map((key) => {return <div>{postalCodeSenderError[key] }</div>})}

                <div>
                    <input className="input-create-guide-form" value={citySender} onChange={(event) => setCitySender(event.target.value)} type="text" placeholder="Ciudad" />
                    </div>
                {Object.keys(citySenderError).map((key) => {return <div>{citySenderError[key] }</div>})}

                <div>
                    <select className="input-create-guide-form" name="Estado" placeholder="Estado" onChange ={(event) => setMexicoStateSender(event.target.value)}>
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
            
            </div>
            </div>

            {/* TO SECTION */}
            <div>
            <h1 className="subheading-form-create-guide">¿Hacia Dónde Envías?</h1>
                <div>
                <div>
                    <input className="input-create-guide-form"
                    value={fullNameReceiver}
                    onChange= {event => setFullNameReceiver(event.target.value)}
                    type="text" placeholder="Nombre Completo" />
                    </div>
                    {Object.keys(fullNameReceiverError).map((key) => {return <div>{fullNameReceiverError[key] }</div>})}
                                    
                <div>
                    <input className="input-create-guide-form" value={emailReceiver} onChange={(event) => setEmailReceiver(event.target.value)} type="email" placeholder="Correo Electrónico" />
                    {Object.keys(emailReceiverError).map((key) => { return <div>{emailReceiverError[key]}</div> })}  
                </div>                
                    
                <div>
                    <input className="input-create-guide-form" value={phoneNumberReceiver} onChange={(event) => setPhoneNumberReceiver(event.target.value)} type="text" placeholder="Teléfono" />
                    {Object.keys(phoneNumberReceiverError).map((key) => {return <div>{phoneNumberReceiverError[key] }</div>})}
                </div>
                
                <div>
                    <input  className="input-create-guide-form" value={streetAndNumberReceiver} onChange={(event) => setStreetandNumberReceiver(event.target.value)} type="text" placeholder="Calle y Número" />
                    {Object.keys(streetAndNumberReceiverError).map((key) => {return <div>{streetAndNumberReceiverError[key] }</div>})}
                </div>
                
                <div>
                    <input  className="input-create-guide-form" value={referenciasReceiver} onChange={(event) => setReferenciasReceiver(event.target.value)} type="text" placeholder="Referencias" />
                </div>
                    
                <div>
                    <input className="input-create-guide-form" value={colonyReceiver} onChange={(event) => setColonyReceiver(event.target.value)} type="text" placeholder="Colonia" />
                    {Object.keys(colonyReceiverError).map((key) => {return <div>{colonyReceiverError[key] }</div>})}
                </div>
                
                <div>
                    <input className="input-create-guide-form" value={postalCodeReceiver} onChange={(event) => setPostalCodeReceiver(event.target.value)} type="text" placeholder="Codigo Postal" />
                    {Object.keys(postalCodeReceiverError).map((key) => {return <div>{postalCodeReceiverError[key] }</div>})}
                </div>

                <div>
                    <input className="input-create-guide-form" value={cityReceiver} onChange={(event) => setCityReceiver(event.target.value)} type="text" placeholder="Ciudad" />
                    {Object.keys(cityReceiverError).map((key) => {return <div>{cityReceiverError[key] }</div>})}
                </div>

                <div>
                    <select className="input-create-guide-form" name="Estado" placeholder="Estado" onChange ={(event) => setMexicoStateReceiver(event.target.value)}>
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
                
                </div>
            </div>
            
            {/* PACKAGE SECTION */}
            <div>
            <h2 className="subheading-form-create-guide">¿Dimensiones del paquete?</h2>
                <div>
                    <div>
                    <input className="input-create-guide-form" value={packageLenght} onChange={(event) => {
                      setPackageLenght(event.target.value)
                      calculateNewGuidePrice()
                      
                    }} 
                    type="text" placeholder="Largo (cm)" />
                    {Object.keys(packageLenghtError).map((key) => {return <div>{packageLenghtError[key]}</div>})}
                </div>
                                    
                <div>
                    <input className="input-create-guide-form" value={packageWidth} 
                    onKeyDown={calculateNewGuidePrice}
                    onChange={(event) => {
                      setPackageWidth(event.target.value)
                      calculateNewGuidePrice();
                    }} 
                    type="email" placeholder="Ancho (cm)" />
                    {Object.keys(packageWidthError).map((key) => {return <div>{packageWidthError[key]}</div>})}
                </div>                
                    
                <div>
                    <input className="input-create-guide-form" value={packageHeight} 
                    onChange={(event) => {
                      setPackageHeight(event.target.value)
                      calculateNewGuidePrice();
                    }} 
                    type="text" placeholder="Alto (cm)" />
                    {Object.keys(packageHeightError).map((key) => {return <div>{packageHeightError[key]}</div>})}
                </div>
                
                    {/* <h4>Peso del paquete que envías</h4> */}
                    
                <div>
                    <input className="input-create-guide-form" value={packageWeight} 
                    onChange={(event) => {
                      setPackageWeight(event.target.value)
                      calculateNewGuidePrice();
                    }}
                     type="text" placeholder="Peso del paquete en (kg)" />
                    {Object.keys(packageWeightError).map((key) => {return <div>{packageWeightError[key]}</div>})}
                </div>
                
                    {/* <h4>¿Que envías?</h4> */}
                    
                <div>
                    <input className="input-create-guide-form" value={packageDescription} onChange={(event) => {
                      calculateNewGuidePrice();
                      setPackageDescription(event.target.value)}
                      } type="text" placeholder="Contenido del paquete (Descripción corta)" />
                      {Object.keys(packageDescriptionError).map((key) => {return <div>{packageDescriptionError[key]}</div>})}
                </div>
                
                <div className="wrapper-guide-cost">
                    <label className="heading-guide-cost">Costo de tu Guia</label>
                    <br></br>
                    <label className="price-guide-cost" >{guideCost}.00</label>
                </div>
                
            </div>
            </div>
            
            <div className="buttons-wrapper">
              <Link>
                <button id="blue" className="btn-contact-form" >Regresar</button>
              </Link>
              <button className="btn-contact-form" onClick={(event) => {handleSubmit(event)}}>Siguiente</button>
            </div>
            <Checkout/>
        </div>
        <Footer/>
      </>
    )
}

export default CreateGuidePagina;