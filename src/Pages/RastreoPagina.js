 import React,  { useState, useEffect} from 'react'
import { useParams ,useHistory} from 'react-router'
import Navbar from '../components/Navbar/Navbar'
import './RastreoPagina.scss';
import styled from 'styled-components'
import IconoRastreo from '../assets/Inicio/Icono_rastreo-43.svg'
import Footer from '../components/Footer/Footer'
import ShippingInformation from '../components/Tracking/ShippingInformation';
import FloatingWhatsApp from '../components/Others/WhatsappBtn';
import { Helmet } from 'react-helmet'
import { ClipLoader } from 'react-spinners';
import { Loading } from '../utilities/Loading';

const RasteroPagina = () => {
  
  const history = useHistory()

  const [needsRerender, setNeedsRerender] = useState(true)
  const [loading, setLoading] = useState(true)
  const [guideInformation, setGuideInformation] = useState()
  const [hasError, setHasError] = useState(false)
  const [shipmentHistory, setShipmentHistory] = useState()
  const [newTrackedGuide, setNewTrackedGuide] = useState({inputValue: ""})
  const [error, setError] = useState()
  const params = useParams()
  const guideNumber = params.guide
  
  const handleChange = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    setNewTrackedGuide({inputValue: value})
  }

  const handleClick = () => {
    if (newTrackedGuide.inputValue.length > 0) {
      history.push(`/rastreo/${newTrackedGuide.inputValue}`)
      setNeedsRerender(!needsRerender)
    } else {
      setError("Favor de ingresar un numéro de guia")
    }
  }
 
  const getGuideInfo = async () => {
    const body = {
      "clientDetail": {
        "accountName": localStorage.getItem("email"),
        "apiKey": localStorage.getItem("api_key")
      },
      "trackingNumbers": [
        guideNumber
      ]
    }

    const url = `${process.env.REACT_APP_API_URL}/track`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    console.log(data);
    try {
      console.log(data)
      setGuideInformation(data)
      setShipmentHistory(data.data.shipments[0].shipmentHistory)
    }
    catch {      
      console.log(data.description === "No shipments found")
      
      if (!guideNumber === true) {
        setError('Por favor ingresa tu codigo de rastreo.')
        setHasError(true)
        
      } 
      
      else if (data.description === "No shipments found") {
        console.log('this applies 1');
        setError('Tu numéro de rastreo no fue encontrado. Favor de ingresarlo nuevamente.')
        setHasError(true)
      } 
      
      else {
        console.log('this applies 2');
        // setError('Tu numéro de rastreo no fue encontrado. Favor de ingresarlo nuevamente.')
        setHasError(true)
      }
      
    }
    setLoading(false)
  }


  useEffect(() => {
    setLoading(true)
    setHasError(false)
    setError('')
    getGuideInfo()  
  }, [needsRerender])

  
  return (
    <>
      <Helmet>
        <title>Quiken Rastreo</title>
        <meta 
          name="description"
          content="Servicios de paqueteria y fulfilment en México, rastreo de guias"
        />
        <meta
          name="keywords" content="Envios, Paqueteria, ecommerce, delivery"
        />
      </Helmet>
      <Navbar/>
      <FloatingWhatsApp/>
      <div className="request-body-wrapper">

        {loading ? 
          <Loading></Loading>
          :
        <div>
          <div className="div-wrapper-rastero">
            <h1 className="request-header">Rastreo y Seguimiento</h1>
            <div>
              <div className="div-tracking">
                <p className="rastreo-blue-letters">Ingresa tu número de rastreo:</p>
                <div className="rastreo-input-div">
                  <input id='input-rastreo' 
                  required
                  className="tracking-number-input"
                  value={newTrackedGuide.inputValue} 
                  onChange={handleChange} 
                  placeholder="Código de rastreo"></input>
                  {/* <Link to={`/rastreo/${newTrackedGuide}`}> */}
                    <PlaceHolderLookUp onClick={handleClick}>
                      <img className="icono-rastreo" src={IconoRastreo} alt="icono-rastreo" ></img>
                    </PlaceHolderLookUp>
                  {/* </Link>   */}
                
                </div>

              </div>
            </div>
          </div>

          <div>
            {hasError ? 
            
            <div className="main-wrapper-table-title">
              <a href='#input-rastreo'>
                {
                hasError === false ? 
                
                <h1 className="estado-de-envio-heading-ingresa-guia">
                  Favor de ingresar un código de rastreo
                </h1> : 
                
                <h1 className="estado-de-envio-heading-ingresa-guia">
                  {error}
                </h1>
                }
              </a>
              
              <div className="wrapper-table-titulo">
                <div>
                  
                  <h1 className="historial-pedido-heading">Historial de Pedido</h1>
                  
                  <table className="tracking-table">
                    <thead>
                      <tr>
                        <th className="table-header-tracking">Estatus</th>
                        <th className="table-header-tracking">Descripción</th>
                        <th className="table-header-tracking">Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="tbody-tracking-table">
                        <tr>
                          <td className="table-data-tracking">-</td>
                          <td className="table-data-tracking">-</td>
                          <td className="table-data-tracking">-</td>
                        </tr>
                        <tr>
                          <td className="table-data-tracking">-</td>
                          <td className="table-data-tracking">-</td>
                          <td className="table-data-tracking">-</td>
                        </tr>
                        <tr>
                          <td className="table-data-tracking">-</td>
                          <td className="table-data-tracking">-</td>
                          <td className="table-data-tracking">-</td>
                        </tr>
                      
                    </tbody>
                  </table> 
                
                </div>
            </div>
            
            </div> : 
            
            <div>
              <ShippingInformation guideInformation={guideInformation} guideNumber={guideNumber} shipmentHistory={shipmentHistory}/>
            </div> }
              
          </div>
          
          
          {/* <>
          <div>
            <h1 className="estado-de-envio-heading">Estado de envío</h1>
            <h1 className="estado-de-pedido">Status: <span>{guideNumber}</span> </h1>
            <h1 className="estado-de-pedido">Código de rastreo:  <span>{guideNumber}</span></h1>
          </div>  

          <div>
            <h1 className="historial-pedido-heading">Historial de Pedido</h1>
            
            <table className="tracking-table">
              <thead>
                <tr>
                  <th className="table-header-tracking">Estatus</th>
                  <th className="table-header-tracking">Descripción</th>
                  <th className="table-header-tracking">Fecha</th>
                </tr>
              </thead>
              <tbody className="tbody-tracking-table">
                {shipmentHistory.map((step) => {
                  return (
                    <tr>
                    <td className="table-data-tracking">{step.status}</td>
                    <td className="table-data-tracking">{step.description}</td>
                    <td className="table-data-tracking">{step.date}</td>
                  </tr>)
                })}
              </tbody>
            </table> 
          </div>
          </> */}

        </div>
        
      }
      <Footer/>

      </div>

    </>  
  )
}

const PlaceHolderLookUp = styled.div`
height: 32px;
width: 30px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center ;
background-color: red;
background-image: url("./");
border-radius: 0px 5px 5px 0px;
/* border: solid 1px black; */
@media (max-width: 768px) {
    height: 30px;
    width: 50px;
    align-self: center;
    justify-self: center;
    
  } 
`

export default RasteroPagina;