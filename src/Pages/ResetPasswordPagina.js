import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ResetPasswordPagina.scss";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./ResetPasswordPagina.scss";

const ResetPasswordPagina = (props) => {
  const match = useParams();
  console.log(match.resetToken);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return setError("Las contraseñas deben ser iguales");
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/password/reset`,
        {
          'token': match.resetToken,
          'password': password,
          'password_confirmation': confirmPassword
        },
        config
      );

      console.log(data);
      let response = false
      if(data.data.status == 'success'){
          response = true
      }
      setSuccess(response);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="resetpassword-screen">
      <Navbar />
      <div className="form-wrapper-div">
        <form className="forgot-password-form" onSubmit={resetPasswordHandler}>
          <h3 className="resetpassword-screen__title">Recuperar contraseña</h3>
          {error && <span className="error-message">{error} </span>}
          {success && (
            <span className="success-message">
              {success} <Link to="/signin">Sign In</Link>
            </span>
          )}
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Nueva Contraseña:
            </label>
            <input
              className="contact-form-input"
              type="password"
              required
              id="password"
              placeholder="Ingresar Contraseña"
              autoComplete="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirmpassword">
              Confirmar Contraseña:
            </label>
            <input
              className="contact-form-input"
              type="password"
              required
              id="confirmpassword"
              placeholder="Confirmar Contraseña"
              autoComplete="true"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="btn-contact" type="submit">
            Reestablecer Contraseña
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPasswordPagina;
