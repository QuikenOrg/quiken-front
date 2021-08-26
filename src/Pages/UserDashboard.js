import { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom'
import axios from "axios";
import "./UserDashboard.scss"
import Navbar from '../components/Navbar/Navbar'
import GuideTable from '../components/UserDashboard/GuideTable'
import Footer from '../components/Footer/Footer'
import SubNavbar from '../components/Navbar/SubNavbar'
import AccountInfo from '../components/Others/AccountInfo'

const UserDashboard = () => {   


  //Dashboard Moving
  const [selectedScreen, setSelectedScreen] = useState("dashboard")

  const [loggedInUser, setLoggedInUser] = useState('')
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('')
  const [userGuides, setUserGuides] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const history = useHistory();
  const [userPoints, setUserPoints] = useState(0)

  //States Dashboard
  const [userSaldo, setUserSaldo] = useState()
  const [totalRecargas, setTotalRecargas] = useState()
  const [pesoPromedioGuias, setPesoPromedioGuias] = useState()
  const [averageCostGuides, setAverageCostGuides] = useState()
  const [averageCost, setAverageCost] = useState()


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
    const url = 'https://api.quiken.mx/rate';
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
          "clientDetail": {
             "accountName": "rastreo@quiken.mx",
             "apiKey": "QNy1tpJFfmYIOlqF1oiwBy7iE46LXuwb"
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

  const handleSelectedComponent = (event) => {
    console.log(event.target)
  }


  //Handle click on quote button
  const handleQuote = async (event) => {
    event.preventDefault()
    await calculateGuide()
    console.log(testServices)
  }

  const getAverageCost = async (userGuides) => {
    let totalGuideCostSum = 0;
    console.log(userGuides.length)
    let counterGuides = await userGuides.length
    console.log(counterGuides)
    userGuides.forEach((guide) => {
      console.log(avgCost)
      avgCost = totalGuideCostSum + parseInt(guide.guideCost)
    })
    let avgCost = totalGuideCostSum / userGuides.length
    console.log(avgCost)
  }



  //Get Fetch Guides Function
  const loadUserGuides = async (currentUser) => {
    console.log('currentUser', currentUser)
    await fetch(`api/user/guides/${currentUser}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json =>  {
      console.log('Success:', json);
      console.log(json.data)
      setUserGuides(json.data.reverse())
    })
    .then(() => getAverageCost(userGuides))
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  //Fetch Private Data
  const fetchPrivateDate = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      
      //AQUI VAN LAS RUTAS DE LAS GUIAS
      const { data } = await axios.get("/api/private", config);
      setPrivateData(data.data);



    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      setError("You are not authorized please login");
    }

  };

  //Get Userpoints
  const requestGetPoints = async (username) => {
    const url = 'api/user/getPoints/'
    console.log(username, 'RUNNING THIS')
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify ({
            'username': username
        })
    });
    
    const data = await response.json()
    console.log(data)
    console.log(response.status, 'STATUS')
    if (response.status === 200) {
        setUserPoints(data.data[0].points)
        // setTotalRecargas(data.data[0].recargas)
    }
    
    
}


  useEffect(() => {
    fetchPrivateDate();
    let currentUser = localStorage.getItem('username')
    let currentUserEmail = localStorage.getItem('email')
    requestGetPoints(currentUserEmail)
    setLoggedInUser(currentUser)
    setLoggedInUserEmail(currentUserEmail)
    loadUserGuides(currentUserEmail);
  }, []);

  const logoutHandler = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      

      history.push('/signin')
  }

  return error ? (
    <>
      <Navbar/>
      <div className="wrapper-unauthorized-route">
        <h1 className="unautohorized-heading">Esta es una ruta privada. Favor de iniciar sesión.</h1>
        <Link className="link-sign-route" to="/signin">Da click aqui!</Link>
      </div>
      {/* <span className="error-message">{error}</span> */}
      <Footer/>
    </>
  ) : (
    <>  
        <Navbar/>
            {/* <div className="sub-navbar">
              <Link className="link-subnavbar">Inicio</Link>
              <Link className="link-subnavbar">Cotizar</Link>
              <Link className="link-subnavbar">Guias</Link>
              <Link className="link-subnavbar" to="/recargarsaldo">Recarga Saldo</Link>
              <Link onClick={logoutHandler} className="link-subnavbar">Logout</Link>
            </div>

            <SubNavbar handleSelectedComponent={handleSelectedComponent} logoutHandler={logoutHandler}/> */}

            <div className="main-wrapper-userdashboard">
                <AccountInfo handleSelectedComponent={handleSelectedComponent} loggedInUser={loggedInUser} loggedInUserEmail={loggedInUserEmail} />
                
                {/* <div className="account-info-wrapper">
                  <h2 className="heading-userdashboards">Dashboard de Enviós</h2>
                  <div className="account-name">Cuenta: {loggedInUser}</div>
                  <div className="account-name">Email: {loggedInUserEmail}</div>
                </div> */}

              
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
                        <button class="button-cotizar-servicios"onClick={(event) => handleQuote(event)}>Cotizar</button>
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

              <div className="menu-opciones-saldo">
                
                <div className="card-row-wrapper">
                  <div className="card-dashboard">
                    <label className="label-paquete-info">Saldo disponible</label>
                    <h1 className="featured-number">$ {userPoints}.00</h1>
                    <Link className="recargar-saldo-link" to="/recargarsaldo">
                      Recagar Saldo {">"}
                    </Link>
                  </div>
                  <div className="card-dashboard">
                    <label className="label-paquete-info">Costo Promedio</label>
                    <h1 className="featured-number">$ 0.00</h1>
                    <Link className="recargar-saldo-link-trans" >Recagar Saldo {">"}</Link>
                  </div>
                </div>

                <div className="card-row-wrapper">
                  <div className="card-dashboard">
                    <label className="label-paquete-info">Total Recargas</label>
                    <h1 className="featured-number">$ {totalRecargas}.00</h1>
                    <Link className="recargar-saldo-link" to="/recargarsaldo">Recagar Saldo {">"}</Link>
                  </div>
                  <div className="card-dashboard">
                    <label className="label-paquete-info">Peso Promedio</label>
                    <h1 className="featured-number">0.00 Kg</h1>
                    <Link className="recargar-saldo-link-trans" >Recagar Saldo {">"}</Link>
                  </div>
                </div>

                <div className="card-row-wrapper">
                  <Link to="/recargarsaldo">
                    <button className="btn-contact-form ">Recargar Saldo</button>        
                  </Link>
                  <Link to="/createguide">
                    <button id="blue" className="btn-contact-form ">Crear Guia</button>
                  </Link>
                  
                    <button onClick={logoutHandler} className="btn-contact-form ">Logout</button>
                  
                </div>

              </div>

              <h1 className="tabla-de-guias-heading">Tabla de Guias</h1>  
              <GuideTable userGuides={userGuides}/>
              
              <div className="div-row-wrapper">
                <Link to="/createguide">
                  <button id="blue" className="btn-contact-form">Crear Guida</button>
                </Link>
                <button className="btn-contact-form " onClick={logoutHandler}>Logout</button>
              </div>
            </div>
          <Footer/>
        
    </>
  );
};

export default UserDashboard;