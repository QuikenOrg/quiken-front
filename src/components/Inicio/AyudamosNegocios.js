import React from 'react'
import './AyudamosNegocios.scss'
import Shopify from '../../assets/Inicio/Integraciones/Quiken_Shopify-22.svg'
import WooComerce from '../../assets/Inicio/Integraciones/Woocommerce-23.svg'
import MercadoLibre from '../../assets/Inicio/Integraciones/Mercado_Libre-24.svg'
import Amazon from '../../assets/Inicio/Integraciones/Amazon-25.svg'



const AyudamosNegocios = () => {
    return (
        <>
            <div className="main-wrapper-negocios">
                <p className="paragraph-section">Ayudamos a los negocios a enfocarse en sus tareas más
                importantes, <span>disminuyendo costos extra de nómina, rentas y
                    mantenimiento.</span></p>
                <img></img>
            </div>
            <div>
                <h2 className="heading-blue">Nuestro sistema de gestión de almacén se integran
                <br/>con los siguientes ecommerces:</h2>
                <div className="row-wrapper-icons">
                    <img src={Shopify} className="image-integraciones" ></img>
                    <img src={WooComerce} className="image-integraciones" ></img>
                    <img src={MercadoLibre} className="image-integraciones" ></img>
                    <img src={Amazon} className="image-integraciones" ></img>
                    <img></img>
                </div>
            </div>
        </>
    )
}

export default AyudamosNegocios
