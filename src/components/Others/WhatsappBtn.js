import React from 'react'
import FloatingWhatsApp from 'react-floating-whatsapp'
import 'react-floating-whatsapp/dist/index.css' 

function WhatsappBtn() {
    return (
        <FloatingWhatsApp 
        phoneNumber="+5218124486070"
        accountName="Quiken Envios"
        statusMessage="Contestamos enseguida"
        chatMessage="Muy buenos dias! Quiken estamos para ayudarte y brindarte cualquier información necesaria."
        />
    )
}

export default WhatsappBtn
