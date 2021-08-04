import React, { useState } from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import './RastreaPedido.scss'
import IconoRastreo from '../../assets/Inicio/Icono_rastreo-43.svg'

const RastreaPedido = (props) => {
    
    const [guideTracked, setGuideTracked] = useState("")
    
    const handleInput = (event) => { 
        setGuideTracked(event.target.value)
    }

    return (
        <div className="main-wrapper-div-tracking">
            <RowDiv>
                <TrackingNumberInput className="contact-us-input-form" placeholder="Código de rastreo" onChange={handleInput}></TrackingNumberInput>
                <Link to={`/rastreo/${guideTracked}`}>
                    <PlaceHolderLookUp>
                        <img className="icono-rastreo" src={IconoRastreo}></img>
                    </PlaceHolderLookUp>
                </Link>
            </RowDiv>
        </div>
    )
}

const RowDiv = styled.div`
display: flex;
@media (max-width: 768px) {
    height: 30px;
    /* width: 90%; */
    align-self: center;
    justify-self: center;
  }
`

const TrackingNumberInput = styled.input`
border-radius: 5px;
border: solid 1px;

`

const PlaceHolderLookUp = styled.div`
height: 50px;
width: 50px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center ;
background-color: red;
background-image: url("./");
border-radius: 5px;
border: solid 1px black;
@media (max-width: 768px) {
    height: 30px;
    width: 50px;
    align-self: center;
    justify-self: center;
    
  } 
`

export default RastreaPedido;
