import React from 'react'
import { Link } from 'react-router-dom'
import './NuestrosVehiculos.scss'
//Imagenes Vehiculos
import Motocicleta from '../../assets/Inicio/Nuestros Vehiculos/Quiken_Motocicleta-16.svg'
import Automovil from '../../assets/Inicio/Nuestros Vehiculos/Quiken_Automovil-17.svg'
import Camion from '../../assets/Inicio/Nuestros Vehiculos/Quiken_Camion-19.svg'
import Camioneta from '../../assets/Inicio/Nuestros Vehiculos/Quiken_Camioneta-18.svg'

const NuestrosVehiculos = () => {
    return (
        <div className="main-wrapper-section">
            <div className="main-wrapper-row"> 
                <h3 className="heading-red">Nuestros<br/>Vehiculos</h3>
                
                <Link>
                    <button className="btn-enviar-ahora">¡Enviar ahora!</button>
                </Link>
                
            </div>
                <div className="svgs-wrapper">
                    <div className="icon-column">
                        <img className="svg-image" src={Motocicleta} />
                        <h3 className="heading-vehicle">Motocicleta</h3>
                    </div>
                    <div className="icon-column">
                        <img className="svg-image" src={Automovil} />
                        <h3 className="heading-vehicle">Automóvil</h3>
                    </div>
                    <div className="icon-column">
                        <img className="svg-image" src={Camioneta} />
                        <h3 className="heading-vehicle-camioneta" >Camioneta <br/> (500kg)</h3>
                    </div>

                    <div className="icon-column">
                        <img className="svg-image" src={Camion} />
                        <h3 className="heading-vehicle-camion">Camión <br/> (3.5 Toneladas)</h3>
                    </div>
                
                </div>
        </div>
    )
}

export default NuestrosVehiculos;