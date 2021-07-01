import React from 'react'
import './MapInicio.scss'

//images
import imgMap from '../../assets/Inicio/Quiken_Presencia_Nacional_Internacional.png'

const MapInicio = () => {
    return (
        <div className="main-wrapper-map">
            <div className="text-wrapper">
                <h2 className="heading-map-section">Presencia Nacional e Internacional</h2>
                
                <div className="states-wrapper">
                    <div className="state-row">
                        <p className="state-name">Nuevo León</p>
                    </div>

                    <div className="state-row">
                        <p className="state-name">Coahuila</p>
                    </div>

                    <div className="state-row">
                        <p className="state-name">Durango</p>
                    </div>

                    <div className="state-row">
                        <p className="state-name">Tamaulipas</p>
                    </div>

                    <div className="state-row">
                        <p className="state-name">San Luis Potosi</p>
                    </div>

                    <div className="state-row">
                        <p className="state-name">Norte de Veracruz</p>
                    </div>

                    <div className="state-row">
                        <p className="state-name">Ciudad de México</p>
                    </div>

                    <div className="state-row">
                        <p className="state-name">Querataro</p>
                    </div>

                    <div className="state-row">
                        <p className="state-name">Guanjuato</p>
                    </div>

                    <div className="state-row">
                        <p className="state-name">Chihuahua</p>
                    </div>

                    <div className="state-row">
                        <p className="state-name">Dallas, Texas</p>
                    </div>

                </div>
            </div>
            <div className="img-wrapper">
                <img className="map-image" src={imgMap}></img>
            </div>
        </div>
    )
}

export default MapInicio
