import { Input } from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../components/Context/UserContext';
import { Loading } from '../utilities/Loading';

const GuideCreator = ({
  user
  }
) => {
  
  const history = useHistory()
  const { handleLogout, openInNewTab } = useContext(UserContext)

    //Username for fetching points
  let username = localStorage.getItem('email')

  //Create Guide Sucess
  const [success, setSuccess] = useState(false)
  
  //Guide Data
  const [apiGuide, setApiGuide] = useState()
  
  //Payment and Selected Guide
  // const [selectedGuide, setSelectedGuide] = useState(false)
  const [selectedService, setSelectedService] = useState()

  //currentUser (HARDCODED)
  // const [currentUser, setcurrentUser] = useState('')
  const [guideCost, setguideCost] = useState(0)

  //Types of Services
  const [services, setServices] = useState()
  const [loadingQuoteData, setLoadingQuoteData] = useState(true)
  const [showSpinner, setShowSpinner] = useState(true)

  //User Points State
  const [points, setPoints] = useState(100);
  const [isPointsEnough, setIsPointsEnough] = useState(false)
  const [needsReset, setNeedsReset] = useState(false)

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
  const [errorQuote, setErrorQuote] = useState("")

    // STATES
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
  
  useEffect(() => {
    setShowSpinner(false)
  }, [])
  
  //Step One Guide Creation
  const createGuideApi = async () => {
    setShowSpinner(true)
    console.log("hitting btn")
    const urlApiCreate = `${process.env.REACT_APP_API_URL}/generate`;
    const responseApi = await fetch(urlApiCreate, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        "clientDetail": {
          "accountName": localStorage.getItem('email'),
          "apiKey": localStorage.getItem('api_key')
        },
        "origin": {
          "name": fullNameSender,
          "company": fullNameSender,
          "email": emailSender,
          "phone": phoneNumberSender,
          "street": streetAndNumberSender,
          "ext_number": "col",
          "int_number": "",
          "district": "",
          "city": citySender,
          "state": mexicoStateSender,
          "country": "MX",
          "postalCode": postalCodeSender,
          "reference": referenciasSender
        },
        "destination": {
          "name": fullNameReceiver,
          "company": fullNameReceiver,
          "email": emailReceiver,
          "phone": phoneNumberReceiver,
          "street": streetAndNumberReceiver,
          "ext_number": "col",
          "int_number": "",
          "district": "",
          "city": cityReceiver,
          "state": mexicoStateReceiver,
          "country": "MX",
          "postalCode": postalCodeReceiver,
          "reference": referenciasReceiver
        },
        "package": {
          "content": packageDescription,
          "type": 1,
          "dimensions": {
            "length": parseInt(packageLenght),
            "width": parseInt(packageWidth),
            "height": parseInt(packageHeight)
          },
          "weight": parseInt(packageWeight)
        },
        "shipment": {
          "service": selectedService
        },
        "settings": {
          "labelFormat": "pdf"
        }
      })
    });

    const data = await responseApi.json()
    console.log(data)
    if (data.status === "SUCCESS") {
      alert("Tu guia fue creada exitosamnte.")
      openInNewTab(data.data.fileUrl)
      setShowSpinner(false)
      history.push("/newdashboard")
    }
    setApiGuide(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSpinner(true)
    const isValid = formValidation();
    if (isValid) {
      await calculateNewGuidePrice() 
    }
    setShowSpinner(false)
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
        
        if (emailIsValid(emailSender) === false) {
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
        
    
        if (hasLetters(phoneNumberSender) === false) {
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
        
        if (emailIsValid(emailReceiver) === false) {
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
    
          if (hasLetters(phoneNumberReceiver) === false) {
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
          
          if (packageLenght.length === 0) {
            packageLenghtError.NoValue = "Favor de ingresar un valor"
          }
      
          if (hasLetters(packageLenght) === false) {
            console.log("solo numeros")
            packageLenghtError.PackageLenghtLetters = "Favor de introducir solo numeros"
            isValid = false;
          }
      
          setPackageLenghtError(packageLenghtError)
      
          if (packageWidth.length === 0) {
            packageWidthError.NoValue = "Favor de ingresar un valor"
          }
      
          if (hasLetters(packageWidth) === false) {
            console.log("solo numeros")
            packageWidthError.PackageWidthLetters = "Favor de introducir solo numeros"
            isValid = false;
          }
      
          setPackageWidthError(packageWidthError)
          
          if (packageHeight.length === 0) {
            packageHeightError.NoValue = "Favor de ingresar un valor"
          }
      
          if (hasLetters(packageHeight) === false) {
            console.log("solo numeros")
            packageHeightError.PackageHeightLetters = "Favor de introducir solo numeros"
            isValid = false;
          }
      
          setPackageHeightError(packageHeightError)
      
          if (packageWeight.length === 0) {
            packageWeightError.NoValue = "Favor de ingresar un valor"
          }
      
          if (hasLetters(packageWeight) === false) {
            console.log("solo numeros")
            packageWeightError.PackageWeightLetters = "Favor de introducir solo numeros"
            isValid = false;
          }
      
          setPackageWeightError(packageWeightError)
          
          if (packageDescription.length === 0) {
            packageDescriptionError.NoValue = "Favor de ingresar un valor"
          }
      
          setPackageDescriptionError(packageDescriptionError)
    
        return isValid
    }

    // Guide Cost Function
  const calculateNewGuidePrice = () => {
    setShowSpinner(true)
    console.log("FETCH QUOTE GUIDE")
    const url = `${process.env.REACT_APP_API_URL}/rate`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify({
          "clientDetail": {
             "accountName": localStorage.getItem("email"),
             "apiKey": localStorage.getItem("api_key")
           },
           "origin": {
             "name": fullNameSender,
             "company": "Default Value",
             "email": emailSender,
             "phone": phoneNumberSender,
             "country": "MX",
             "postalCode": postalCodeSender
           },
           "destination": {
             "name": fullNameReceiver,
             "company": "Default Value",
             "email": emailReceiver,
             "phone": phoneNumberReceiver,
             "country": "MX",
             "postalCode": postalCodeReceiver
           },
           "package": {
             "content": packageDescription,
             "type": 1,
             "dimensions": {
               "length": parseInt(packageLenght),
               "width": parseInt(packageWidth),
               "height": parseInt(packageHeight)
             },
             "weight": parseInt(packageWeight)
           }
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
      console.log(data)
      if (data.status === "SUCCESS") {
        console.log(data.data.services, 'DATA DATA SERVICES');
        setServices(data.data.services)
        console.log("QUOTED GUIDE")
        setLoadingQuoteData(false) 
      }
        
      if (data.status === "ERROR") {
        if (data.description == "Authentication failed") {
          handleLogout()
          history.push("/signin")
        }
        if (data.description == 'Invalid postal code') {
          console.log("codigo postal invalido")
          window.alert("Codigo postal invalido. Revisa que ambos codigos postales sean correctos. Si el error persiste revisa con nuestros accesores que tengamos covertura en el area.")
        }
      }
      setShowSpinner(false)
    })
      .catch((error) => {
        if (error.status === "ERROR") {
        console.log("getting Error", error.description)
        console.log("este pdedit")
        setErrorQuote(error.description)
        setShowSpinner(false)
      }
    })
  }

  function hasLetters (phone) {
    return /^\d+$/.test(phone)
  }

  function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSelectGuide = (servicio) => {
    setSelectedService(servicio.code)
    console.log(servicio.code)
    setguideCost(servicio.totalPrice)
    console.log("selected guide")
  }

  if (showSpinner) return (<MainDiv><Loading/></MainDiv>)

    return (
        <MainDiv>                    
        <h1>{ errorQuote ? errorQuote : "" }</h1>
        <SectionWrapper>              
          {/* ORIGIN SECTION */}
          <SubsectionWrapper>
          <SubsectionHeading> 1. ORIGEN:</SubsectionHeading>
              
              <LabelInputWrapper>
              {/* <label className="form-label" style={{display:'block'}}>Nombre Completo <span style={{color: "red"}}>*</span></label> */}
                <LabelStyled >Nombre Completo</LabelStyled>
                <InputStyled value={fullNameSender}
                    onChange= {event => setFullNameSender(event.target.value)}
                    type="text" placeholder="Nombre Completo" />
                {Object.keys(fullNameSenderError).map((key) => {return <div>{fullNameSenderError[key] }</div>})}
              </LabelInputWrapper>
                                  
              <LabelInputWrapper>
                  <LabelStyled>Correo Electrónico</LabelStyled>
                  <InputStyled value={emailSender} onChange={(event) => setEmailSender(event.target.value)} type="email" placeholder="Correo Electrónico" />
                  {Object.keys(emailSenderError).map((key) => { return <div>{emailSenderError[key]}</div> })}  
              </LabelInputWrapper>                
                  
              <LabelInputWrapper>
                  <LabelStyled >Teléfono</LabelStyled>
                  <InputStyled value={phoneNumberSender} onChange={(event) => setPhoneNumberSender(event.target.value)} type="text" placeholder="Teléfono" />
                  {Object.keys(phoneNumberSenderError).map((key) => {return <div>{phoneNumberSenderError[key] }</div>})}
              </LabelInputWrapper>
              
              <LabelInputWrapper>
                  <LabelStyled >Calle y Número</LabelStyled>
                  <InputStyled value={streetAndNumberSender} onChange={(event) => setStreetandNumberSender(event.target.value)} type="text" placeholder="Calle y Número" />
                  {Object.keys(streetAndNumberSenderError).map((key) => {return <div>{streetAndNumberSenderError[key] }</div>})}
              </LabelInputWrapper>
              
              <LabelInputWrapper>
                  <LabelStyled >Referencia</LabelStyled>
                  <InputStyled value={referenciasSender} onChange={(event) => setReferenciasSender(event.target.value)} type="text" placeholder="Referencias" />
              </LabelInputWrapper>
                  
              <LabelInputWrapper>
                  <LabelStyled >Colonia</LabelStyled>
                  <InputStyled value={colonySender} onChange={(event) => setColonySender(event.target.value)} type="text" placeholder="Colonia" />
                  {Object.keys(colonySenderError).map((key) => {return <div>{colonySenderError[key] }</div>})}
              </LabelInputWrapper>
              
              <LabelInputWrapper>
                  <LabelStyled >Código Postal</LabelStyled>
                  <InputStyled value={postalCodeSender} onChange={(event) => setPostalCodeSender(event.target.value)} type="text" placeholder="Codigo Postal" />
                  {Object.keys(postalCodeSenderError).map((key) => {return <div>{postalCodeSenderError[key] }</div>})}
              </LabelInputWrapper>

              <LabelInputWrapper>
                  <LabelStyled >Ciudad</LabelStyled>
                  <InputStyled value={citySender} onChange={(event) => setCitySender(event.target.value)} type="text" placeholder="Ciudad" />
                  {Object.keys(citySenderError).map((key) => {return <div>{citySenderError[key] }</div>})}
              </LabelInputWrapper>

              <LabelInputWrapper className="field-holder">
                  <LabelStyled >Estado</LabelStyled>
                  <select placeholder="Estado" onChange ={(event) => setMexicoStateSender(event.target.value)}>
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
              </LabelInputWrapper>
          </SubsectionWrapper>

          {/* TO SECTION */}
          <SubsectionWrapper>
            <SubsectionHeading>2. DESTINO:</SubsectionHeading>
              <LabelInputWrapper >
                  <LabelStyled>Nombre Completo</LabelStyled>
                  <InputStyled
                  value={fullNameReceiver}
                  onChange= {event => setFullNameReceiver(event.target.value)}
                  type="text" placeholder="Nombre Completo" />
                  {Object.keys(fullNameReceiverError).map((key) => {return <div>{fullNameReceiverError[key] }</div>})}
              </LabelInputWrapper>
                                  
              <LabelInputWrapper>
                  <LabelStyled>Correo Electrónico</LabelStyled>
                  <InputStyled value={emailReceiver} onChange={(event) => setEmailReceiver(event.target.value)} type="email" placeholder="Correo Electrónico" />
                  {Object.keys(emailReceiverError).map((key) => { return <div>{emailReceiverError[key]}</div> })}  
              </LabelInputWrapper>                
                  
              <LabelInputWrapper>
                  <LabelStyled>Teléfono</LabelStyled>
                  <InputStyled value={phoneNumberReceiver} onChange={(event) => setPhoneNumberReceiver(event.target.value)} type="text" placeholder="Teléfono" />
                  {Object.keys(phoneNumberReceiverError).map((key) => {return <div>{phoneNumberReceiverError[key] }</div>})}
              </LabelInputWrapper>
              
              <LabelInputWrapper>
                  <LabelStyled>Calle y Número</LabelStyled>
                  <InputStyled value={streetAndNumberReceiver} onChange={(event) => setStreetandNumberReceiver(event.target.value)} type="text" placeholder="Calle y Número" />
                  {Object.keys(streetAndNumberReceiverError).map((key) => {return <div>{streetAndNumberReceiverError[key] }</div>})}
              </LabelInputWrapper>
              
              <LabelInputWrapper>
                  <LabelStyled>Referencias</LabelStyled>
                  <InputStyled value={referenciasReceiver} onChange={(event) => setReferenciasReceiver(event.target.value)} type="text" placeholder="Referencias" />
              </LabelInputWrapper>
                  
              <LabelInputWrapper>
                  <LabelStyled>Colonia</LabelStyled>
                  <InputStyled value={colonyReceiver} onChange={(event) => setColonyReceiver(event.target.value)} type="text" placeholder="Colonia" />
                  {Object.keys(colonyReceiverError).map((key) => {return <div>{colonyReceiverError[key] }</div>})}
              </LabelInputWrapper>
              
              <LabelInputWrapper>
                <LabelStyled>Código Postal</LabelStyled>
                  <InputStyled value={postalCodeReceiver} onChange={(event) => setPostalCodeReceiver(event.target.value)} type="text" placeholder="Codigo Postal" />
                  {Object.keys(postalCodeReceiverError).map((key) => {return <div>{postalCodeReceiverError[key] }</div>})}
              </LabelInputWrapper>

              <LabelInputWrapper>
                  <LabelStyled>Ciudad</LabelStyled>
                  <InputStyled value={cityReceiver} onChange={(event) => setCityReceiver(event.target.value)} type="text" placeholder="Ciudad" />
                  {Object.keys(cityReceiverError).map((key) => {return <div>{cityReceiverError[key] }</div>})}
              </LabelInputWrapper>

              <LabelInputWrapper>
                  <LabelStyled>Estado</LabelStyled>
                  <select name="Estado" placeholder="Estado" onChange ={(event) => setMexicoStateReceiver(event.target.value)}>
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
              </LabelInputWrapper>
          </SubsectionWrapper>
          
          {/* TO PACKAGE INFO */}
          <SubsectionWrapper>
          <SubsectionHeading>3. INFORMACIÓN DEL PAQUETE</SubsectionHeading>
              
              <LabelInputWrapper>
                  <LabelStyled >Largo (cm)</LabelStyled>
                  <InputStyled value={packageLenght} 
                  onChange={(event) => {
                    setPackageLenght(event.target.value)
                  }} 
                  type="text" placeholder="Largo (cm)" 
                  />
                  {Object.keys(packageLenghtError).map((key) => {return <div>{packageLenghtError[key]}</div>})}
              </LabelInputWrapper>
                                  
              <LabelInputWrapper>
                  <LabelStyled >Ancho (cm)</LabelStyled>
                  <InputStyled value={packageWidth} 
                  onChange={(event) => {
                    setPackageWidth(event.target.value)
                  }} 
                  type="email" placeholder="Ancho (cm)" />
                  {Object.keys(packageWidthError).map((key) => {return <div>{packageWidthError[key]}</div>})}
              </LabelInputWrapper>                
                  
              <LabelInputWrapper>
                  <LabelStyled >Alto (cm)</LabelStyled >
                  <InputStyled value={packageHeight} 
                  onChange={(event) => {
                    setPackageHeight(event.target.value)
                  }} 
                  type="text" placeholder="Alto (cm)" />
                  {Object.keys(packageHeightError).map((key) => {return <div>{packageHeightError[key]}</div>})}
              </LabelInputWrapper>
              
                  {/* <h4>Peso del paquete que envías</h4> */}
                  
              <LabelInputWrapper>
                  <LabelStyled>Peso del paquete (kg)</LabelStyled>
                  <InputStyled value={packageWeight} 
                  onChange={(event) => {
                    setPackageWeight(event.target.value)
                  }}
                  type="text" placeholder="Peso del paquete en (kg)" />
                  {Object.keys(packageWeightError).map((key) => {return <div>{packageWeightError[key]}</div>})}
              </LabelInputWrapper>
              
                  {/* <h4>¿Que envías?</h4> */}
                  
              <LabelInputWrapper>
                  <LabelStyled>Contenido del paquete (Descripción corta)</LabelStyled>
                  <InputStyled value={packageDescription} 
                  onChange={(event) => {
                    setPackageDescription(event.target.value)}
                    } 
                    type="text" placeholder="Contenido del paquete (Descripción corta)" />
                    {Object.keys(packageDescriptionError).map((key) => {return <div>{packageDescriptionError[key]}</div>})}
              </LabelInputWrapper>
            
            <div className="buttons-wrapper-row">
              <Link to="/userdashboard">
                {/* <button id="blue" className="btn-create-guide-form" >Regresar</button> */}
              </Link>
                  <button className="btn-create-guide-form" onClick={(event) => {handleSubmit(event)}}>Cotizar</button>
            </div>
              
            
          </SubsectionWrapper>
          
          {/* PAYMENT */}
          <SubsectionWrapper>
            <div className="payment-section">
            <SubsectionHeading> 
              4. SELECCIONA TU TIPO DE ENVIO:
            </SubsectionHeading>
            <div className="table-holder">{ loadingQuoteData ? <div className="cotizar-paragraph">Llena todo los campos y da click en Cotizar!</div>:
              <table>
                <tr className="table-row-heading">
                  <th></th>
                  <th>Servicio</th>
                  <th>Tiempo Entrega</th>
                  <th>Precio</th>
                </tr>
                {
                  services.map((servicio, i) => {
                    return (
                    <tr className="table-data-row" onClick={() => handleSelectGuide(servicio)}>
                      <td>{i+1}</td>
                      <td>{servicio.type.toUpperCase()}</td>
                      <td>{servicio.estimateDelivery}</td>
                      <td>${servicio.totalPrice}.99</td>
                    </tr>)
                  })}
              
              </table>  
              }  
            
            </div>

            <div className="wrapper-guide-cost">
                  <div>
                    
                  </div>

                  <label className="heading-guide-cost">Costo de tu Guia</label>
                  <br></br>
                  <label className="price-guide-cost" >{guideCost}.00</label>
            </div>

            <div className="wrapper-guide-cost">
                  <div>
                  </div>
                  <label className="heading-guide-cost">Saldo Disponible</label>
                  <br></br>
                  <label className="price-guide-cost" >{user.balance}</label>
            </div>
            
            { selectedService ? 
                guideCost < user.balance ? 
                <PayBtn onClick={() => createGuideApi() }>Pagar</PayBtn> :
                <>
                  <PayBtn disabled >Pagar</PayBtn>
                  <h2>Cuentas con saldo insuficiente</h2>
                </>
              : 
              <></>
            }
            
              
            </div>
          </SubsectionWrapper>

        </SectionWrapper>

        
      </MainDiv>
    )
}

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  width: 100%;
` 

const PayBtn = styled.button`
  color: white;
  background-color: #EE1F42;
  height: 55px;
  width: 200px;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 800;
  margin-top: 10px;
  border: none;
  border-radius: 20px;
  align-self: center ;
  justify-self: center ;
`

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 20px;
`

const SubsectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  min-width: 250px;
  height: 100% ;
`

const SubsectionHeading = styled.h1`
  font-size: 22spx;
  color: #EE1F42;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  
`

const LabelInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 5px;
  font-size: 12px;
  color: #245188;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
`

const LabelStyled = styled.label`
  display: flex;
  flex-direction: column;
`

const InputStyled = styled.input`
  display: flex;
  flex-direction: column;
  height: 10px;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  height: 14px;
  color: #1f2430;
  font-weight: 500;
`

export default GuideCreator;