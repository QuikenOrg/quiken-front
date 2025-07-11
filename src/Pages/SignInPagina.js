import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./SignInPagina.scss";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/Context/UserContext";
import { Loading } from "../utilities/Loading";
import styled from "styled-components";

const SignInPagina = (props) => {
  const history = useHistory();

  const {
    isUserSignedIn,
    userSignedIn,
    user,
    loginHandler,
    error,
    setError,
    errorText,
    setErrorText,
    email,
    setEmail,
    loading,
    setLoading,
    password,
    setPassword,
  } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);

    setLoading(false);
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-content-wrapper">
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="signup-main-wrapper">
            <form
              className="the-form"
              onSubmit={(e) => {
                loginHandler(e).then((result) => {
                  if (result) {
                    history.push("/newdashboard");
                  }
                });
              }}
            >
              <h3 className="main-heading-signup">Accesa a tu cuenta</h3>
              <h2 className="main-subheading-signup">
                Y disfruta de los mejores precios envíos
              </h2>
              <Link className="forgot-passwordlink" to="/forgotpassword">
                ¿Olvidaste tu contraseña?
              </Link>
              {error && errorText ? (
                <ErrorSpan className="login-screen-title">
                  {errorText}
                </ErrorSpan>
              ) : (
                <></>
              )}

              <label className="form-label">Email</label>
              <input
                className="form-input"
                required
                id="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Ingresa tu email"
              />

              <label className="form-label">Contraseña</label>
              <input
                className="form-input"
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Ingresa tu contaseña"
              />

              <button type="submit" className="btn-register">
                Enviar
              </button>

              <div className="wrapper-sign-in-link">
                <p className="ya-tienes-cuenta">Ya tienes una cuenta?</p>
                <Link className="da-click-aqui" to="/signin">
                  ¡Da click aqui!
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

const ErrorSpan = styled.span`
  font-size: 18px;
  color: #ee1f42;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 5px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
`;

export default SignInPagina;
