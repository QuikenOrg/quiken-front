import React from 'react'
import './MilesDeGuias.scss'

//Images
import DeliveryGuy from '../../assets/Inicio/Quiken_Miles_Guias_generadas.png'

const MilesDeGuias = () => {
    return (
        <div className="main-wrapper-guias">
            <div className="red-container">
                <img className="delivery-guy-img" src={DeliveryGuy} alt="delivery-guy"></img>
            </div>
            <div className="blue-container">
                <h1 className="numero-guias">1,552,99</h1>
                <h1 className="heading-guias">Miles de guías generadas <br/>diariamente</h1>
            </div>
        </div>
    )
}

export default MilesDeGuias;