import React from 'react';
import './ContactUs.scss'

const ContactUs = () => {
    
    const contactUsHandler = () => {
        alert('Gracias por contactarnos uno nuestros aserores se pondre en contaco contigo.')
    }

    return (
        <>
            <div className="wrapper">
            <form onSubmit={contactUsHandler}>                
                    <input className="contact-us-input-form" placeholder="Correo electrónico"></input>
                    <button className="btn-red-contact-us" type="submit">Contáctanos</button>
                </form>
            </div>
        </>
    )
}

export default ContactUs;