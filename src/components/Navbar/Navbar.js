import React, { useContext, useEffect } from "react";
import BtnRegistro from "./BtnRegistro";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import styled from "styled-components";

import QuikenLogo from "../../assets/Inicio/Quiken_Logo_color-03.svg";
import { UserContext } from "../Context/UserContext";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/5c631c1c6cb1ff3c14cc3564/default";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
    Tawk_API.onLoad = function () {
      Tawk_API.setAttributes(
        {
          name: "Test Name",
          email: "email@email.com",
          hash: "hash value",
        },
        function (error) {}
      );
    };
  }, []);

  return (
    <>
      {/* <!--Start of Tawk.to Script--> */}
      {/* <!--End of Tawk.to Script--> */}
      <div className="navbar-main">
        <div className="navbar-logo-placeholder">
          <Link className="logo-link" to="/">
            <img src={QuikenLogo} className="quiken-logo" />
          </Link>
        </div>

        {/* //Desktop Menu */}
        <div className="navbar-links-wrapper">
          <Link className="navbar-link" to="/">
            INICIO
          </Link>
          <Link className="navbar-link" to="/servicios">
            SERVICIOS
          </Link>
          <Link className="navbar-link" to="/fulfillment">
            FULFILLMENT
          </Link>
          <Link className="navbar-link" to="/rastreo">
            RASTREO
          </Link>
          <Link className="navbar-link" to="/contacto">
            CONTACTO
          </Link>
          {user ? (
            <Link to="/newdashboard">
              <button className="btn-red">Dashboard</button>
            </Link>
          ) : (
            <>
              <Link className="navbar-link" to="/signin">
                SIGN IN
              </Link>
              <Link to="/signup">
                <BtnRegistro />
              </Link>
            </>
          )}
        </div>
        {/* Mobile Menu */}
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link className="navbar-link" to="/">
        INICIO
      </Link>
      <Link className="navbar-link" to="/servicios">
        SERVICIOS
      </Link>
      <Link className="navbar-link" to="/fulfillment">
        FULFILLMENT
      </Link>
      <Link className="navbar-link" to="/rastreo">
        RASTREO
      </Link>
      <Link className="navbar-link" to="/contacto">
        CONTACTO
      </Link>
      {/* <Link className="navbar-link" to="/signin">
            SIGN IN
          </Link>
          <Link to="/signup">
            <BtnRegistro/>
          </Link> */}
    </StyledMenu>
  );
};

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #245188;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  text-align: left;
  /* padding: 2rem; */
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 30;

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: 18px;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1rem;
      text-align: center;
    }

    &:hover {
      color: red;
    }
  }
`;

const StyledBurger = styled.button`
  /* position: absolute;
  top: 5%;
  left: 2rem; */
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 31;

  @media (min-width: 800px) {
    display: none;
  }

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.2rem;
    background: ${({ open }) => (open ? "white" : "#245188")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Navbar;
