import React, { useState, useEffect} from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './SignInPagina.scss'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const LoginPagina= (props) => {
  let history = useHistory();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ goToDashboard, setGoToDashboard] = useState(false)

  useEffect(() => {
    userSignedIn()
    if (goToDashboard) history.push("/newdashboard") 
  },[]);

  const userSignedIn = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
    };

    try {
      //AQUI VAN LAS RUTAS DE LAS GUIAS
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/info`, {} ,config);
      setError(false)
      setGoToDashboard(true)
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      setError(true)
    }
  }


  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    
    let formData = new FormData();
    formData.append('email', email);   //append the values with key, value pair
    formData.append('password', password);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        formData,
        config
      );
      
      localStorage.setItem("access_token", data.data.access_token);
      console.log(data.data.access_token)
      localStorage.setItem("api_key", data.data.user.api_key);
      localStorage.setItem("email", data.data.user.email);
      localStorage.setItem("username", data.data.user.username);
      console.log(data.data.user.api_key)

      history.push("/userdashboard");
    } catch (error) {
      console.log(error)

    }
  };

  return (
    <>
      <Navbar />
      <div className="page-content-wrapper">
        <div className="signup-main-wrapper">
          <form className="the-form" onSubmit={loginHandler}>
            <h3 className="main-heading-signup">Accesa a tu cuenta</h3>
            <h2 className="main-subheading-signup">Y disfruta de los mejores precios envíos</h2>
            <Link className="forgot-passwordlink" to="/forgotpassword">¿Olvidaste tu contraseña?</Link>
            {error && <span className="login-screen-title" >{error}</span>}
            
            <label className="form-label">Email</label>
            <input className="form-input" 
                  required 
                  id="name" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  type="text" 
                  placeholder="Ingresa tu email"/>

            <label className="form-label">Contraseña</label>
            <input className="form-input" 
                  required 
                  id="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  type="password" 
                  placeholder="Ingresa tu contaseña"/>
            
            <button type="submit" className="btn-register">Enviar</button>
          
          <div className="wrapper-sign-in-link">
            <p className="ya-tienes-cuenta">Ya tienes una cuenta?</p>
            <Link className="da-click-aqui" to="/signin">¡Da click aqui!</Link>
          </div>
          </form>
                  
        </div>
      </div>
    <Footer/>

    </>
  )
}

export default LoginPagina;