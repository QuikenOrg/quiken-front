export const getStatus = (status) => {
    switch(status) {
        case 1:
            return {
                status: status, 
                name: "Creado", 
                msg_spanish: "Guia de envio creada", 
                msj_english: "Shipment created"
            }
        case 2:
            return { 
                status: status,
                name: "Recolectado", 
                msg_spanish: "Paquete recolectado por conductor", 
                msj_english: "Package picked up by driver"
            }
        case 3:
            return { 
                status: status,
                name: "En almacén ciudad de origen" , 
                msg_spanish: "El paquete llegó al almacen de origen", 
                msj_english: "Package arrived to station" 
            }
        case 4:
            return { 
                status: status,
                name: "En proceso de recolección" , 
                msg_spanish: "El paquete está listo para la recolección", 
                msj_english: "Package is out for delivery" 
            }
        case 5:
            return { 
                status: status,
                name: "Entregado" , 
                msg_spanish: "Package delivered to destination", 
                msj_english: "Package is out for delivery" 
            }
        case 6:
            return { 
                status: status,
                name: "Información!" , 
                msg_spanish: "Información de envío", 
                msj_english: "Shipment information" 
            }
        case 7:
            return { 
                status: status,
                name: "Error!" , 
                msg_spanish: "Problema o falla con el envio", 
                msj_english: "Shipment can't be delivered" 
            }
        case 8:
            return { 
                status: status,
                name: "Cancelada" , 
                msg_spanish: "Envío cancelado", 
                msj_english: "Shipment canceled" 
            }
        case 9:
            return { 
                status: status,
                name: "Asignado a un operador para recolección" , 
                msg_spanish: "Envío asignado al conductor para su recoleccion", 
                msj_english: "Shipment assigned to driver for pickup" 
            }
        case 10:
            return { 
                status: status,
                name: "Asignado a un operador para entrega" , 
                msg_spanish: "Envío asignado al conductor para la entrega", 
                msj_english: "Shipment assigned to driver for deliver" 
            }
        case 11:
            return { 
                status: status,
                name: "En Bodega" , 
                msg_spanish: "El paquete salio de una estación externa", 
                msj_english: "Package arrived to external station" 
            }

        case 12:
            return { 
                status: status,
                name: "En proceso de entrega" , 
                msg_spanish: "En proceso de entrega", 
                msj_english: "Package out to external station" 
            }

        case 13:
            return { 
                status: status,
                name: "Cancelada" , 
                msg_spanish: "Cancelado por quiken pero con problemas en la paqueteria ext", 
                msj_english: "Cancelado por quiken pero con problemas en la paqueteria ext" 
            }
        case 14:
            return { 
                status: status,
                name: "Entregado" , 
                msg_spanish: "Entregado con problema en la paqueteria externa", 
                msj_english: "Entregado con problema en la paqueteria externa" 
            }

        case 15:
            return { 
                status: status,
                name: "Creado" , 
                msg_spanish: "Envío creado, problema con el transportista externo", 
                msj_english: "Shipment created, problem with external carrier" 
            }

        case 16:
            return { 
                status: status,
                name: "Devolución" , 
                msg_spanish: "Envío devuelto o cancelado", 
                msj_english: "Returned or canceled shipment" 
            }

        case 17:
            return { 
                status: status,
                name: "En ruta a ciudad destino", 
                msg_spanish: "Envio en ruta a ciudad destino", 
                msj_english: "Shipping in route to destination city" 
            }

        case 18:
            return { 
                status: status,
                name: "En espera de recolección ocurre", 
                msg_spanish: "Envio entregado, se deja en su domicilio para que el cliente", 
                msj_english: "Shipping delivered, it is left at your home for the customer" 
            }
        
        case 19:
            return { 
                status: status,
                name: "En Almacén ciudad destino", 
                msg_spanish: "Llegada del envio a su ciudad destino", 
                msj_english: "Arrival of the shipment to its destination city" 
        }

        case 20:
            return { 
                status: status,
                name: "En ciudad destino", 
                msg_spanish: "Envío ubicado en la cercania para su entrega", 
                msj_english: "Shipment located in the vicinity for delivery or is returnin" 
        }

        case 21:
            return { 
                status: status,
                name: "Entre Almacenes", 
                msg_spanish: "Envio desplanzádose entre almacenes", 
                msj_english: "Shipping moving between stations" 
            }

        }
}		

