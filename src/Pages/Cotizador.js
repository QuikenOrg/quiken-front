import React, { useState } from 'react'

const Cotizador = () => {


  //States for quoate
  const [testPackageLength, setTestPackageLength] = useState()
  const [testPackageWidth, setTestPackageWidth] = useState()
  const [testPackageHeight, setTestPackageHeight] = useState()
  const [testPackageWeight, setTestPackageWeight] = useState()
  const [testReceiverPostalCode, setTestReceiverPostalCode] = useState()
  const [testSenderPostalCode, setTestSenderPostalCode] = useState()

  //Services available
  const [testServices, setTestServices] = useState()
  const [testQuoteError, setTestQuoteError] = useState()
  const [hasQuoteError, setHasQuoteError] = useState(false)
  const [loadingServicios, setLoadingServicios] = useState(true)

  //Quoate API Call Function
  const calculateGuide = async () => {
    const url = `${process.env.REACT_APP_API_URL}/rate`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'},
      body: JSON.stringify({
          "clientDetail": {
             "accountName": localStorage.getItem('email'),
             "apiKey": localStorage.getItem('api_key')
           },
           "origin": {
             "name": "testSender",
             "company": "Default Value",
             "email": "test@gmail.com",
             "phone": "55555555",
             "country": "MX",
             "postalCode": testSenderPostalCode
           },
           "destination": {
             "name": "testReceiber",
             "company": "Default Value",
             "email": "test2@gmail.com",
             "phone": "88888888",
             "country": "MX",
             "postalCode": testReceiverPostalCode
           },
           "package": {
             "content": "ropa",
             "type": 1,
             "dimensions": {
               "length": parseInt(testPackageLength),
               "width": parseInt(testPackageWidth),
               "height": parseInt(testPackageHeight)
             },
             "weight": parseInt(testPackageWeight)
           }
      })
    });
    const data = await response.json();
    console.log(data)
    if (data.status === "SUCCESS") {
      setTestServices(data.data.services)
      setLoadingServicios(false)
      setHasQuoteError(false)
      
    } else if (data.status === "ERROR") {
      console.log(data.description)
      setTestQuoteError(data.description)
      setHasQuoteError(true)
      setLoadingServicios(false)
    }
    
  }
  
  const handleQuote = async (event) => {
    event.preventDefault()
    await calculateGuide()
    console.log(testServices)
  }
    return (
        <div className="main-cotizador-servicios div">
        {/* Cotizador */}
        <div className="column-cotizador">
        <h1 className="cotizador-rapido-main-header">Cotizador</h1>
              <h1 className="información-paquete-subheading">Información Paquete</h1>
              
              <div className="div-main-cotizador-rapido">  
                <div className="column-cotizador-rapido">
                  <label className="label-paquete-info">Largo del paquete (cm)</label>
                  <input placeholder="Largo (cm)"
                  onChange={(event) => setTestPackageLength(event.target.value)}
                  />

                  <label className="label-paquete-info">Ancho del paquete (cm)</label>
                  <input placeholder="Ancho (cm)"
                  onChange={(event) => setTestPackageWidth(event.target.value)}
                  />

                  <label className="label-paquete-info">Alto del paquete (cm)</label>
                  <input placeholder="Alto (cm)"
                  onChange={(event) => setTestPackageHeight(event.target.value)}
                  />

                  <label className="label-paquete-info">Peso del paquete (kg)</label>
                  <input placeholder="Peso (cm)"
                  onChange={(event) => setTestPackageWeight(event.target.value)}
                  />

                </div>
                
                <div className="column-cotizador-rapido">
                <label className="label-paquete-info">¿Desde dónde envias?</label>
                  <input placeholder="Codigo Postal"
                  onChange={(event) => setTestSenderPostalCode(event.target.value)}
                  />

                  <label className="label-paquete-info">¿Hacia dónde envias?</label>
                  <input placeholder="Codigo Postal"
                  onChange={(event) => setTestReceiverPostalCode(event.target.value)}
                  />
                </div>
                
            </div>
              <div className="cotizador-row-button">
                <button className="button-cotizar-servicios"onClick={(event) => handleQuote(event)}>Cotizar</button>
              </div>
        </div>


        {/* Empieza aqui */}
        <div className="column-cotizador">
              <h1 className="servicios-subheading-cotizador">Servicios ofrecidos:</h1>
              {loadingServicios ? <h1 className="servicios-paragraph-cotizador">Utiliza nuestro cotizador rapido para ver los servicios de entrega que manejamos.</h1> : 
                hasQuoteError ? <div>{testQuoteError}</div> : 
              

              testServices.map((servicio) => {
                return (
                  <div className="row-servicio-quota">
                    <table>
                      <tr>
                        <th>Codigo de Servico:</th>
                        <th>Tipo de Servicio:</th>
                        <th>Tiempo de Entrega:</th>
                        <th>Precio:</th>
                      </tr>
                      <tr>
                        <td>{servicio.name}</td>
                        <td>{servicio.type}</td>
                        <td>{servicio.estimateDelivery}</td>
                        <td>${servicio.totalPrice}.99</td>
                      </tr>
                    </table>
                  </div>
                )
              })}
              
        </div>
        {/* Termina Aqui */}

      </div>
  )
}

export default Cotizador