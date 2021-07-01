import { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom'
import axios from "axios";
import "./UserDashboard.scss"
import Navbar from '../components/Navbar/Navbar'
import GuideTable from '../components/UserDashboard/GuideTable'
import Footer from '../components/Footer/Footer'

const UserDashboard = () => {   

  const [loggedInUser, setLoggedInUser] = useState('')
  const [userGuides, setUserGuides] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const history = useHistory();

  //Get Fetch Guides Function
  const loadUserGuides = async (currentUser) => {
    await fetch(`api/user/guides/${currentUser}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log('Success:', json);
      console.log(json.data)
      setUserGuides(json.data)
    })
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


  useEffect(() => {

    fetchPrivateDate();
    let currentUser = localStorage.getItem('email')
    console.log('currentUser: ', currentUser)
    loadUserGuides(currentUser);
    setLoggedInUser(currentUser)
  }, []);

  const logoutHandler = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      

      history.push('/signin')
  }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>  
        <Navbar/>
            <div className="main-wrapper-userdashboard">
                <h2 className="heading-userdashboards">Welcome to Quiken</h2>
                <div className="account-name">Cuenta: {loggedInUser}</div>
              <GuideTable userGuides={userGuides}/>
              <div className="div-row-wrapper">
                <Link to="/createguide">
                  <button id="blue" className="btn-contact-form">Create Guide</button>
                </Link>
                <button className="btn-contact-form " onClick={logoutHandler}>Logout</button>
              </div>
             <Footer/>
            </div>
        
    </>
  );
};

export default UserDashboard;