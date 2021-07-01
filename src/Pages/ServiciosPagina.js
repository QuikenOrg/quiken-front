import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import ReactPlayer from 'react-player'
import './ServiciosPagina.scss'
import styled from 'styled-components'
import PaqueteriaLocalIcon from '../assets/Servicios Quiken /SERVICIOS/Servicios Quiken imagenes/Que Necesitas/Quiken_Envios_Locales-03.svg'
import EnviosNacionalesIcon from '../assets/Servicios Quiken /SERVICIOS/Servicios Quiken imagenes/Que Necesitas/Quiken_Envios_Nacionales-04.svg'
import EnviosInternacionalesIcon from '../assets/Servicios Quiken /SERVICIOS/Servicios Quiken imagenes/Que Necesitas/Quiken_Envios_internacionales-05.svg'
import FulFilmentIcon from '../assets/Servicios Quiken /SERVICIOS/Servicios Quiken imagenes/Que Necesitas/Fulfillment-06.svg'
import SuministrosIcon from '../assets/Servicios Quiken /SERVICIOS/Servicios Quiken imagenes/Que Necesitas/Quiken_Suministros-07.svg'
import Footer from '../components/Footer/Footer'
import RastreaPedido from '../components/Others/RastreaPedido'
import BtnRegistro from '../components/Navbar/BtnRegistro'
import NuestrosVehiculos from '../components/Inicio/NuestrosVehiculos'
import ContactUs from '../components/Others/ContactUs'

//Imagenes
import imgPaqueteriaLocal from '../assets/Servicios Quiken /SERVICIOS/Servicios Quiken imagenes/Paqueteria_Local_Quiken.png'
import ContactForm from '../components/Inicio/ContactForm'
import RepartidorQuiken from '../assets/Servicios Quiken /SERVICIOS/Servicios Quiken imagenes/Quiken_Ofrecemos.png'

const ServiciosPagina = () => {
  return (
    <>
      <Navbar/>
        <MainWrapper>
        <div className="main-blue-wrapper">
            <ReactPlayer style={{width: "600px"}} url="https://www.youtube.com/watch?v=r-tEQzU3fwY" controls/>
        </div>
        
        <div className="main-que.necesitas-wrapper">
        <div className="placeholder-que-necesitas">
                <h3 className="white-subheading">¿Qué necesitas?</h3>
            </div>
        
            <div className="servicios-wrapper-main">
              <div className="heading-servicios-row-container">
                <div className="heading-icon-placeholder-esq-izq">
                  <img className="icon-servicios" src={PaqueteriaLocalIcon}></img>
                  <h2 className="que-necesitas-servicio-heading">Paqueteria Local</h2>
                </div>
                
                <div className="heading-icon-placeholder">
                  <img className="icon-servicios" src={EnviosNacionalesIcon}></img>
                  <h2 className="que-necesitas-servicio-heading">Envios Nacionales</h2>
                </div>
                
                <div className="heading-icon-placeholder">
                  <img className="icon-servicios" src={EnviosInternacionalesIcon}></img>
                  <h2 className="que-necesitas-servicio-heading">Envios Internacionales</h2>
                </div>
                
                <div className="heading-icon-placeholder">
                  <img className="icon-servicios" src={FulFilmentIcon}></img>
                  <h2 className="que-necesitas-servicio-heading">Fullfilment</h2>
                </div>
                
                <div className="heading-icon-placeholder-esq-der">
                  <img className="icon-servicios" src={SuministrosIcon}></img>
                  <h2 className="que-necesitas-servicio-heading">Suministros/Embalaje</h2>
                </div>
              </div>
              <div className="row-div2">
                <div className="rastrea-tu-pedido-placeholder">
                <h2 className="blue-rastrea-heading">Rastrea tu pedido</h2>
                  <RastreaPedido/>
                </div>
                <div className="rastrea-tu-pedido-placeholder">
                  
                  <div className="row-div-btn">
                    <Link to="/signup">
                      <button className="btn-register-red">REGISTRO</button>
                    </Link>
                    <Link className="navbar-link" to="/contacto">
                      <button className="btn-contactanos">CONTACTANOS</button>
                    </Link>
                  </div>
                  
                </div>
              </div>
            </div>
            
            <div className="white-background-container">
              
              <h1 className="section-heading">Conoce nuestros servicios</h1>
              
                <div className="servicio-paqueteria-local">
                  <div className="paqueteria-local-section1">
                    <h2 className="heading-paqueteria-local">Paquetería Local</h2>
                    <p className="paragraph-paqueteria-local">Quiken es la empresa pionera y líder en
                    paqueteria enfocada en ecommerce en
                    Nuevo León.</p>
                    
                    <p className="paragraph-paqueteria-local">Brindamos un servicio de envíos locales
                    con entregas del mismo día y día siguiente
                    (24-36 hrs.) en el área metropolitana de
                    Nuevo León, Ciudad de México, León y
                    Querétaro.</p>
                    <Link to="/signup" className="link-registrate-btn">
                      <button className="btn-register-white">REGISTRATE</button>
                    </Link>
                  </div>
                  <div className="paqueteria-local-section2">
                  </div>
                </div>

                <div className="servicio-envios-nacionales">
                  <div className="envios-nacionales-section1">
                    <h2 className="heading-envios-nacionales">Envíos Nacionales</h2>
                    <p className="paragraph-envios-nacionales">Tenemos envíos a una gran parte de la
                    república mexicana, haz tus envíos a
                    cualquier ciudad con los mejores precios y
                    servicio.</p>
                    
                    <p className="paragraph-envios-nacionales">Nuestra cobretura: Nuevo León, Coahuila,
                    Durango, Tamaulipas, San Luis Potosi,
                    Veracruz, Ciudad de México, Queretaro,
                    Guanajuato y Chihuahua.</p>
                    <Link to="/signup" className="link-registrate-btn">
                      <button className="btn-register-red">REGISTRATE</button>
                    </Link>
                  </div>
                  <div className="envios-nacionales-section2">
                  </div>
                </div>

                <div className="servicio-envios-internacionales">
                  <div className="envios-internacionales-section1">
                    <h2 className="heading-envios-internacionales">Envíos Internacionales</h2>
                    <p className="paragraph-envios-internacionales">Tus envíos internacionales con nuestros
                    aliados para llegar a cualquier parte del
                    mundo.</p>
                    <Link to="/signup" className="link-registrate-btn">
                      <button className="btn-register-red">REGISTRATE</button>
                    </Link>
                  </div>
                  <div className="envios-internacioanles-section2">
                  </div>
                </div>  
                
                <NuestrosVehiculos/>

                <div className="servicio-fulfillment">
                  <div className="fulfillment-section1">
                    <h2 className="heading-fulfillment">Quiken Fulfillment</h2>
                    <h2 className="subheading-fulfillment">(Almacenaje y Pick&Pack)</h2>
                    <p className="paragraph-fulfillment">Servicio líder en Fulfillment en México,
                    somos tu aliado ideal en logística.
                    Ahorra espacio y mantén mercancía en
                    nuestros almacenes</p>
                    <p className="paragraph-fulfillment">Almacenamiento con más de 10,000
                    mts2 de Almacenamiento en Mexico y
                    Estados Unidos.</p>
                    <Link to="/signup" className="link-registrate-btn">
                      <button className="btn-register-white">Conoce más</button>
                    </Link>
                  </div>
                  <div className="fulfillment-section2">
                  </div>
                </div>

                <div className="suministros-embalaja-main-div">
                  
                  <div className="suminstros-section1">
                    <h2 className="suministros-heading">Suministros/Embalaje</h2>
                      <br/>
                      <br/>
                      <p className="paragraph-embalaje">Encuentra la solución ideal para los empaques de
                      tus productos</p>
                      <br/>
                      <p className="paragraph-embalaje">Manejamos una variedad de productos para
                      empacar desde:</p>
                      <br/>
                      <p className="paragraph-embalaje">- Cajas</p>
                      <p className="paragraph-embalaje">- Sobres</p>
                      <p className="paragraph-embalaje">- Sobre Burbuja</p>
                      <p className="paragraph-embalaje">- Rollos de emplaye, burbuja y cinta</p>
                      <h2 className="subheading-embalaja">Personaliza tus cajas y sobres con tu
                      logo, lleva tu marca a todos lados!</h2>

                  </div>
                  <div className="suminstros-section2">

                  </div>
                
                </div>
                
                <div className="todo-para-empaquar-main-div">
                  <div className="div-wrapper-80">

                  <div className="todo-para-empacar-section1">
                    <h2 className="heading-empacar-productos">¡Todo lo que necesitas para
                    empacar tus productos!</h2>
                  </div>
                  <div className="todo-para-empacar-section2">
                    <h2 className="text-mas-info-suministros">Para más información contactanos:</h2>
                    <a href="mailto:suministros@quiken.ms">
                      <button className="btn-register-white">suministros@quiken</button>
                    </a>
                  </div>
                  </div>

                </div>

                <div className="que-ofrecemos-main-div">
                  <div className="div-wrapper-80">

                    <div className="que-ofrecemos-section1">
                      <img className="imagen-repartidor" src={RepartidorQuiken}></img>
                    </div>

                    <div className="que-ofrecemos-section2">
                      
                    <h2 className="heading-que-ofrecemos">¿Qué ofrecemos?</h2>
                      <p className="paragraph-que-ofrecemos">Ofrecemos grandes beneficios a las
                      pequeñas, medianas y grandes empresas al
                      ofrecerles una red de choferes calificados en
                      el momento que se requieren,
                      almacenamiento y pick & pack. De este modo
                      los ahorros en nómina, renta y gastos fijos son
                      enormes.</p>
                      <br/>
                      <p className="paragraph-que-ofrecemos">Con Quiken logramos combinar los beneficios
                      de tener personal apto y calificado, sin los
                      riesgos y costos extras que esto implica. En
                      Quiken queremos brindar la mejor calidad en
                      servicios de logística tanto para empresas
                      como comercios y personas físicas, para ello
                      buscamos ofrecer un servicio que exceda las
                      expectativas de nuestros clientes y
                      consumidores finales.</p>
                    </div>
                  </div>
                </div>

                <ContactUs/>

            </div>


        </div>
      </MainWrapper>
      <Footer/>
    </>
  )
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`

export default ServiciosPagina;