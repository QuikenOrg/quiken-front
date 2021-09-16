import React from 'react'
import './Footer.scss'
import QuikenLogoFooter from '../../assets/Inicio/Quiken_Logo_Bco-44.svg'
import Facebook from '../../assets/Inicio/Iconos de redes sociales/Facebook-45.svg'
import Instagram from '../../assets/Inicio/Iconos de redes sociales/Instagram-47.svg'
import Twitter from '../../assets/Inicio/Iconos de redes sociales/Twitter-46.svg'
import locationIcon from '../../assets/Inicio/Iconos de Contacto/Quiken_ubicacion-48.svg'
import phoneIcon from '../../assets/Inicio/Iconos de Contacto/Quiken_Telefono-49.svg'
import mailIcon from '../../assets/Inicio/Iconos de Contacto/Quiken_Correo-50.svg'

const Footer = () => {
    return (
        <div className="footer-main-wrapper">
            <div className="logo-links-wrapper">
                <div className="logo-quienes-somos-wrapper">
                    <img className="img-logo-footer" alt="quiken-logo" src={QuikenLogoFooter}></img>
                    <h3 className="quienes-somos">¿QUIENES SOMOS?</h3>
                </div>
                <div className="copy-icons-wrapper">
                    <p className="copy-quiken">© 2021 Quiken Mx, Todos los derechos reservados.</p>
                    <a target="_blank" href="https://www.facebook.com/quikenmx" rel="noreferrer">
                        <img src={Facebook} className="icon" alt="facebook-icon"/>
                    </a>
                    
                    <a target="_blank" href="https://www.facebook.com/quikenmx" rel="noreferrer">
                    <img src={Twitter} className="icon" alt="twitter-icon"/>
                    </a>
                    
                    
                    <a target="_blank" href="https://www.instagram.com/quikenmx/?hl=en" rel="noreferrer">
                        <img src={Instagram} className="icon" alt="instagram-icon" />                    
                    </a>
                    
                    
                </div>
            </div>
            <div className="info-wrapper">
                <h2 className="contactanos-heading">CONTÁCTANOS</h2>
                <div className="icon-text-row-wrapper">
                    <img src={locationIcon} className="contact-icon" />
                    <p className="paragraph-contact">Monte Alto No. 157, Fraccionamiento
                    Parque 200, C.P 66368 Santa Catarina,
                    Nuevo León, México.</p>
                </div>
                <div className="icon-text-row-wrapper">
                    <img src={phoneIcon} className="contact-icon" alt="phone-icon" />
                    <p className="paragraph-contact">(81) 1661 8597</p>
                </div>
                <div className="icon-text-row-wrapper">
                    <img src={mailIcon} className="contact-icon" alt="mail-icon" />
                    <p className="paragraph-contact">hola@quiken.mx</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
