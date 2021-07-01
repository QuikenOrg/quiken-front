import React, { useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import './SignUpPagina.scss'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer/Footer'

const SignUpPagina = (props) => {
  
  let history = useHistory();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      console.log(error)
      setError(error.response.data.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-content-wrapper">
        <div className="signup-main-wrapper">
            <h3 className="main-heading-signup">Registrate</h3>
            <h2 className="main-subheading-signup">Crea tu cuenta, y empieza a crecer tu negocio</h2>
          <form className="the-form"onSubmit={registerHandler}>
            {error && <span className="register-screen-title" >{error}</span>}
            <label className="form-label">Usuario <span>*</span></label>
            <input className="form-input" 
                  required 
                  id="name" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  type="text" 
                  placeholder="Ingresa tu nombre usuario"/>
            
            <label className="form-label">Email<span> *</span></label>
            <input className="form-input" 
                  required 
                  id="name" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  type="text" 
                  placeholder="Ingresa tu email"/>

            <label className="form-label">Contraseña<span> *</span></label>
            <input className="form-input" 
                  required 
                  id="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  type="password" 
                  placeholder="Ingresa tu contaseña"/>
            
            <label className="form-label">Confirmar Contraseña<span> *</span></label>
            <input className="form-input" 
                  required 
                  id="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  type="password" 
                  placeholder="Confirma tu contraseña"/>
            
            <button type="submit" className="btn-register">Registrarme</button>
            <div className="wrapper-sign-in-link">
              <p>Ya tienes una cuenta?</p>
              <Link to="/signin">¡Da click aqui!</Link>
            </div>
          </form>
                  
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default SignUpPagina;