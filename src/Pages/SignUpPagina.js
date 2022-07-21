import React, { useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import './SignUpPagina.scss'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer/Footer'

const SignUpPagina = (props) => {
  
  let history = useHistory();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
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
      return setError("La contraseñas no coinciden.");
    }

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('company_name', companyName);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('phone', phone);
      
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        formData
        ,
        config
      );
      console.log("data")
      console.log(data)
      if (data.status === "SUCCESS") {
        alert("Tu cuenta fue creada con exito.")
        history.push("/signin");
      } 
      if (data.status === "ERROR") {
        setError(data.description.email[0])
      }  
    } catch (error) {
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
            <label className="form-label">Nombre <span>*</span></label>
            <input className="form-input" 
                  required 
                  id="name" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  type="text" 
                  placeholder="Ingresa tu nombre "/>

          <label className="form-label">Apellido <span>*</span></label>
            <input className="form-input" 
                  required 
                  id="name" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  type="text" 
                  placeholder="Ingresa tu apellido"/>

          <label className="form-label">Nombre de la compania <span>*</span></label>
            <input className="form-input" 
                  required 
                  id="name" 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)} 
                  type="text" 
                  placeholder="Ingresa el nombre de tu compañia"/>

            <label className="form-label">Telefono <span>*</span></label>
            <input className="form-input" 
                  required 
                  id="name" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  type="text" 
                  placeholder="Ingresa tu telefono"
                  />
            
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
            
            <button type="submit" onClick={ () => registerHandler } className="btn-register">Registrarme</button>
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

export default SignUpPagina;