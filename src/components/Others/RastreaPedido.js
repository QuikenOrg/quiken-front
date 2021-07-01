import React from 'react'
import styled from 'styled-components'
import './RastreaPedido.scss'

const RastreaPedido = (props) => {
    return (
        <div>
            <RowDiv>
                <TrackingNumberInput className="contact-us-input-form" placeholder="Código de rastreo"></TrackingNumberInput>
                <PlaceHolderLookUp/>
            </RowDiv>
        </div>
    )
}

const RowDiv = styled.div`
display: flex;
`

const TrackingNumberInput = styled.input`
border-radius: 5px;
border: none;

`

const PlaceHolderLookUp = styled.div`
height: 50px;
width: 50px;
background-color: red;
`

export default RastreaPedido;
