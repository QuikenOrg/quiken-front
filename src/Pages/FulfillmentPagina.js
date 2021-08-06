import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import './FulfillmentPagina.scss';
import BtnMail from '../components/Others/BtnMail'
import Footer from '../components/Footer/Footer'
import Integraciones from '../assets/fulfilment/Imagenes/Integraciones.png'
import ContactUs from '../components/Others/ContactUs'

import DevolucionesImg from '../assets/fulfilment/Imagenes/Fulfillment_Devoluciones.png'
import PickPackImg from '../assets/fulfilment/Imagenes/Fulfillment_Pick_Pack.png'

import Almacenamos from '../assets/fulfilment/Imagenes/Almacenamos-09.svg'
import Recibimos from '../assets/fulfilment/Imagenes/Fulfillment_Recibimos_compras_clientes-10.svg'
import Empacamos from '../assets/fulfilment/Imagenes/Fulfillment_Empacamos-11.svg'
import Entregamos from '../assets/fulfilment/Imagenes/Fulfillment_Quiken_Entregamos-12.svg'
import AbriendoPaquete from '../assets/fulfilment/Imagenes/Solo-sin-fondo.png'

import FloatingWhatsApp from '../components/Others/WhatsappBtn'

const FulfillmentPagina = () => {
  return (
    <>
      <FloatingWhatsApp/>
      <Navbar/>
      <div className="hero-image">
        <div className="hero-text">
          <h1 className="main-heading">Quiken Fulfillment</h1>
          <p className="sub-heading">(Almacenaje y Pick&Pack)</p>
          <p className="sub-heading2">Servicio líder en Fulfillment en México, somos tu aliado ideal en logistica.</p>
        </div>
      </div>
     
      <div className="info-placeholder">
        <div className="text-placeholder">
          <h3 className="sub-heading">Almacenamiento con más de 10,000 mts de</h3>
          <h3 className="sub-heading">Almacenamiento en México y Estados Unidos</h3>
        </div>
        <div className="btn-mail-wrapper">
          <p className="sub-heading2">Para más información contactanos:</p>
          <BtnMail/>
        </div>
      </div>

      <div className="section-fulfillment">
        <div className="text-wrapper-fulfillment">
          <h3 className="fulfilment-heading">¿Qué es fulfillment?</h3>
          <p className="paragraph-1-fulfillment">Envíanos tu mercancía y nosotros
          nos encargamos de la operación</p>
          <p className="paragraph-2-fulfillment" >Procesamos tus órdenes de tus ventas en linea</p>
          <p className="paragraph-3-fulfillment" >Nuestros almacenes en México y Estados Unidos se encargan de procesar las ordenes de ventas que reciba la empresa</p>
        </div>
        <div className="image-palceholder-fulfillment" >
          <img className="imagen-abriendo-paquete" src={AbriendoPaquete}></img>
        </div>
      </div>

      <div className="section-wms">
        <div className="text-wrapper-integra">
          <h3 className="wms-heading">Integra tu tienda en línea con nuestro WMS</h3>
          <p className="paragraph-1-warehouse" >(Warehouse Management
          System)</p>
          <button className="registrate-wms-btn" >REGÍSTRATE</button>
        </div>
        <div className="image-palceholder-icons-wms" >
          <img className="integraciones-img"alt='integraciones' src={Integraciones}></img>
        </div>
      </div>
      
      <div className="div-main-wrapper-almacena" >
            <div className="div-wrapper-section">
              <img className="servicio-img" alt='devoluciones' src={DevolucionesImg}></img>
              <div className="img-placeholder-section"></div>
              <h2 className="heading-service" >Almacena</h2>
              <p className="paragraph-service">- Almacenamos por metro
              cúbico o pallet y manejamos
              tu inventario.</p>
              <p className="paragraph-service" >- Recepción e inspeccion de
              mercancia.</p>
              <p className="paragraph-service" >- Actualizamos inventario.</p>
            </div>

            <div className="div-wrapper-section">
              <div className="img-placeholder-section"></div>
              <img className="servicio-img" alt='servicio' src={PickPackImg}></img>
              <h2 className="heading-service" >Pick & Pack</h2>
              <p className="paragraph-service" >- Selección de articulos en
              almacen.</p>
              <p className="paragraph-service" >- Armado, surtido y kiteo de
              productos.</p>
              <p className="paragraph-service" >- Empaquetemos tus
              productos de manera segura y
              nos aseguramos que llegue en
              excelentes condiciones a su
              destino.</p>
            </div>

            <div className="div-wrapper-section">
              <div className="img-placeholder-section"></div>
              <img className="servicio-img" alt='devoluciones' 
              src={DevolucionesImg}></img>
              <h2 className="heading-service" >Procesamiento
              de Devoluciones</h2>
              <p className="paragraph-service" >- Manejamos devoluciones de
              pedidos para mantener a tu
              cliente satisfecho.</p>
              <p className="paragraph-service" >- Recolecciones inventario.</p>
            </div>
      </div>
      
      <ContactUs/>

      <div className="nuestro-proceso-section">
        <h2 className="nuestro-proceso-heading">Nuestro Proceso</h2>
        <div className="wrapper-grafica-proceso">
          <ul className="progressbar">
              <div className="div-proceso-placeholder">
                <img className="img-grafica-pasos" alt='almacenamiento' src={Almacenamos}></img>
                <h3 className="heading-graph-pasos">Almacenamos</h3>
                <p className="paragraph-garafica-pasos">tu inventario.</p>
              </div>
              
              <div className="div-proceso-placeholder">
                <img className="img-grafica-pasos" alt='recepción' src={Recibimos}></img>
                <h3 className="heading-graph-pasos">Recibimos las ordenes</h3>
                <p className="paragraph-garafica-pasos">de compras de tus clientes.</p>
              </div>
              
              <div className="div-proceso-placeholder">
                <img className="img-grafica-pasos" alt='packing' src={Empacamos}></img>
                <h3 className="heading-graph-pasos">Empacamos</h3>
                <p className="paragraph-garafica-pasos">tus productos.</p>
              </div>
              
              <div className="div-proceso-placeholder">
                <img className="img-grafica-pasos" alt='delivery' src={Entregamos}></img>
                <h3 className="heading-graph-pasos">Entregamos</h3>
                <p className="paragraph-garafica-pasos">los paquetes en el destino final.</p>  
              </div>

              <div className="dotted-line"></div>
          </ul>
        </div>
      </div>

      <div className="ubicaciones-wrapper-main-div">
        <div className="wrapper-80-row-div">
            <div className="ubicaciones-section-1">
              <h2 className="heading-ubicaciones">Con ubicaciones de bodega en :</h2>
              <p className="lista-ubicaciones">- Nuevo Leon</p>
              <p className="lista-ubicaciones">- CDMX</p>
              <p className="lista-ubicaciones">- Guadalajara</p>
              <p className="lista-ubicaciones">- Dallas, Texas</p>
              <p className="paragraph-mas-info-ubicaciones">¿Quieres más información?</p>
              <a href="mailto:hola@quiken.mx" className="mail-to-hola-quiken" >hola@quiken.mx</a>
            </div>
            
            <div className="ubicaciones-section-2">
              
            </div>
        </div>
      </div>


      <Footer/>
    </>
  )
  
}

export default FulfillmentPagina;