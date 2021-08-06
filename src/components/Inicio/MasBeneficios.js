import React from 'react';
import './MasBeneficios.scss';
import ContactUs from '../Others/ContactUs'
import Almacenamiento from '../../assets/Inicio/Beneficios/Quiken_Solucion_Almacenamiento-10.svg';
import Empaquetado from '../../assets/Inicio/Beneficios/Quiken_Preparacion_Empaquetado-11.svg';
import Devoluciones from '../../assets/Inicio/Beneficios/Quiken_Pedidos_devoluciones-15.svg';
import Precision from '../../assets/Inicio/Beneficios/Quiken_Presicion-12.svg';
import Cumplimiento from '../../assets/Inicio/Beneficios/Quiken_Expertos_Cumplimiento-13.svg';
import Tarifas from '../../assets/Inicio/Beneficios/Quiken_Mejores_tarifas_envio-14.svg';

const MasBeneficios = () => {
    return (
        <div className="mas-beneficios-main-wrapper">
            <h2 className="heading-main-section" >Más Beneficios</h2>
            <div className="row-wrapper">
                <div className="beneficio-column-wrapper">
                    <img className="beneficio-img" src={Almacenamiento}></img>
                    <h3 className="heading-beneficio">Soluciones de almacenamiento</h3>
                    <p className="paragraph-beneficio">No importe el tamaño, tenemos almacenes seguros y protegidos.</p>
                </div>

                <div className="beneficio-column-wrapper">
                    <img className="beneficio-img" src={Empaquetado}></img>
                    <h3 className="heading-beneficio">Preparación y empaquetado</h3>
                    <p className="paragraph-beneficio">Procesamos las órdenes que sean necesarias y empacamos cualquier producto, no importa el tamaño y lo delicado.</p>
                </div>

                <div className="beneficio-column-wrapper">
                    <img className="beneficio-img" src={Devoluciones}></img>
                    <h3 className="heading-beneficio">Procesos de pedidos y devoluciones</h3>
                    <p className="paragraph-beneficio">Procesamos miles de pedidos diarios sin importar la cantidad y nos hacemos cargo de las devoluciones.</p>
                </div>
            </div>

            <div className="row-wrapper">
                <div className="beneficio-column-wrapper">
                    <img className="beneficio-img" src={Precision} ></img>
                    <h3 className="heading-beneficio">99.95% de precisión</h3>
                    <p className="paragraph-beneficio">Con nuestros sistemas y procesos disminuimos le  margen de error al máximo.</p>
                </div>

                <div className="beneficio-column-wrapper">
                    <img className="beneficio-img" src={Cumplimiento} ></img>
                    <h3 className="heading-beneficio">Expertos dedicados al cumplimiento</h3>
                    <p className="paragraph-beneficio">Nuestros ejecutivos lo ayudarán a resolver cualquier problema.</p>
                </div>

                <div className="beneficio-column-wrapper">
                    <img className="beneficio-img" src={Tarifas} ></img>
                    <h3 className="heading-beneficio">Mejores tarifas de envío</h3>
                    <p className="paragraph-beneficio">Contamos con las mejores tarifas de envíos en el mercado.</p>
                </div>
            </div>
        
            <ContactUs/>

        </div>
    )
}

export default MasBeneficios;
