import React from "react";
import { useState } from 'react';

export default function PackageInfoForm (props) {
  
  const [packageLenght, setPackageLenght] = useState('');
  const [packageWidth, setPackageWidth] = useState('');
  const [packageHeight, setPackageHeight  ] = useState('');
  const [packageWeight, setPackageWeight] = useState('');  
  const [packageDescription, setPackageDescription] = useState('');

  const [packageLenghtError, setPackageLenghtError] = useState('');
  const [packageWidthError, setPackageWidthError] = useState('');
  const [packageHeightError, setPackageHeightError  ] = useState('');
  const [packageWeightError, setPackageWeightError] = useState('');  
  const [packageDescriptionError, setPackageDescriptionError] = useState('');

  const guideCost = 99.00

  const formValidation = () => {
    const packageLenghtError = {};
    const packageWidthError = {};
    const packageHeightError = {};
    const packageWeightError = {};
    const packageDescriptionError = {};
    
    let isValid = true;
    
    //Has Letters Validation
    function hasLetters (lenght) {
      return /^\d+$/.test(lenght)
    }
    
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

    return isValid
  }

  let handlePackageInfoForm = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    
  if (isValid) {
    console.log(
      packageLenght,
      packageWidth,
      packageHeight,
      packageWeight,
      packageDescription)
    props.stepHandler()
  }  
}


  return (
    <div>
      <h2>¿Dimensiones del paquete?</h2>
        <div>
            <div>
              {Object.keys(packageLenghtError).map((key) => {return <div>{packageLenghtError[key]}</div>})}
              <input value={packageLenght} onChange={(event) => setPackageLenght (event.target.value)} type="text" placeholder="Largo (cm)" />
          </div>
                            
          <div>
            {Object.keys(packageWidthError).map((key) => {return <div>{packageWidthError[key]}</div>})}
            <input value={packageWidth} onChange={(event) => setPackageWidth(event.target.value)} type="email" placeholder="Ancho (cm)" />
          </div>                
            
          <div>
            {Object.keys(packageHeightError).map((key) => {return <div>{packageHeightError[key]}</div>})}
            <input value={packageHeight} onChange={(event) => setPackageHeight(event.target.value)} type="text" placeholder="Alto (cm)" />
          </div>
        
            <h4>Peso del paquete que envías</h4>
            
          <div>
            {Object.keys(packageHeightError).map((key) => {return <div>{packageHeightError[key]}</div>})}
            <input value={packageWeight} onChange={(event) => setPackageWeight(event.target.value)} type="text" placeholder="Peso (kg)" />
          </div>
        
            <h4>¿Que envías?</h4>
            
          <div>
            <input value={packageDescription} onChange={(event) => setPackageDescription(event.target.value)} type="text" placeholder="Descripción" />
          </div>
        
          <div>
            <label>Costo de tu Guia</label>
            <br></br>
            <label>{guideCost}.00</label>
        </div>
            
          <button onClick={(event) => handlePackageInfoForm(event)}>Siguiente</button>
        
      </div>
    </div>
  );
}
