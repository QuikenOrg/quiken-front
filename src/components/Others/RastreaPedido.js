import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import styled from 'styled-components'
import './RastreaPedido.scss'
import IconoRastreo from '../../assets/Inicio/Icono_rastreo-43.svg'

const RastreaPedido = (props) => {
    
    const history = useHistory()

    const [guideTracked, setGuideTracked] = useState("")
    
    const handleInput = (event) => { 
        let value = event.target.value.replace(/\D/g, '');
        setGuideTracked({inputValue: value})
    }

    const handleClick = () => {
        if (guideTracked.inputValue !== undefined) {
            history.push(`/rastreo/${guideTracked.inputValue}`)
        }
    }



    return (
        <div className="main-wrapper-div-tracking">
            <RowDiv>
                
                <TrackingNumberInput 
                    required
                    className="contact-us-input-form" 
                    placeholder="Código de rastreo" 
                    value={guideTracked.inputValue}
                    onChange={handleInput}>
                </TrackingNumberInput>

                <Link 
                    onClick={handleClick}
                    // to={ guideTracked.inputValue != undefined ?
                    // `/rastreo/${guideTracked.inputValue}`: 
                    // `/rastreo` }
                >
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
  @media (max-width: 350px) {
    height: 30px;
    width: 90%;
    align-self: center;
    justify-self: center;
  }
`

const TrackingNumberInput = styled.input`
border-radius: 5px;
border: solid 1px;
width: 100%;
align-items: center;

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
