import React, { useState, useEffect } from "react";
import "./RecargarSaldoPagina.scss";
import Navbar from "../components/Navbar/Navbar";
import SubNavbar from "../components/Navbar/SubNavbar";
import Footer from "../components/Footer/Footer";
import CheckoutStripe2 from "../components/Cart/Checkout2";
import { AfterpayClearpayMessageElement } from "@stripe/react-stripe-js";

const RecargarSaldoPagina = () => {
  //Initializing Variables and States
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [isRechargePaid, setIsRechargePaid] = useState(false);
  const [hasPaymentError, setHasPaymentError] = useState(false);
  const [errorPayment, setErrorPayment] = useState("");
  const [userPoints, setUserPoints] = useState(0);

  let username = localStorage.getItem("email");

  const handleProductClick = async (cart, id) => {
    if (cart.length < 5) {
      const selectedProduct = await items.find((product) => product.id === id);
      cart.push(selectedProduct);
      setCartTotal(cartTotal + selectedProduct.total);
    }
  };

  const items = [
    { id: 100, total: 200 },
    { id: 101, total: 1000 },
    { id: 102, total: 10000 },
  ];

  const requestGetPoints = async (username) => {
    const url = "api/user/getPoints/";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });

    const data = await response.json();
    if (response.status === 200) {
      setUserPoints(data.data[0].points);
    }
  };

  const requestRecharge = async (username, amount) => {
    const url = "api/user/updatePoints";

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        amount: amount,
      }),
    });

    const data = await response.json();
    if (response.status === 200) {
      alert("Tu recarga fue exitosa. Agradecemos tu compra");
      resetState();
    }
  };

  const resetState = () => {
    setUserPoints(0);
    setErrorPayment("");
    setHasPaymentError(false);
    setIsRechargePaid(false);
    setCart([]);
    setCartTotal(0);
    setPaymentMethod("");
    setHasPaymentError(false);
  };

  useEffect(() => {
    requestGetPoints(username);
    if (isRechargePaid === true) {
      requestRecharge(username, cartTotal);
      setIsRechargePaid(false);
    }
  }, [isRechargePaid, cartTotal]);

  return (
    <div>
      <Navbar />

      <div className="main-wrapper-recargar-saldo">
        <div className="main-wrapper-comprar-saldo">
          <div className="wrapper-seleccionador paquetes">
            <h1 className="saldo-actual-heading">1. Recarga Saldo</h1>

            <div className="card-saldo-actual">
              <label className="saldo-actual-subheading">Saldo Actual</label>
              <h1 className="saldo-actual-big-number">$ {userPoints}.00</h1>
            </div>

            <div className="paquetes-de-puntos">
              <label className="heading-agregar-puntos">
                Da Click y Agrega Puntos!
              </label>

              <div
                className="card-agrega-credito"
                onClick={() => {
                  handleProductClick(cart, 100);
                }}
              >
                <label className="agrega-credito-actual-subheading">
                  + Agregar credito
                </label>
                <h1 className="agrega-credito-actual-big-number">$ 200.00</h1>
              </div>

              <div
                className="card-agrega-credito"
                onClick={() => {
                  handleProductClick(cart, 101);
                }}
              >
                <label className="agrega-credito-actual-subheading">
                  + Agregar credito
                </label>
                <h1 className="agrega-credito-actual-big-number">$ 1000.00</h1>
              </div>

              <div
                className="card-agrega-credito"
                onClick={() => {
                  handleProductClick(cart, 102);
                }}
              >
                <label className="agrega-credito-actual-subheading">
                  + Agregar credito
                </label>
                <h1 className="agrega-credito-actual-big-number">$ 10000.00</h1>
              </div>
            </div>
          </div>

          <div className="wrapper-checkout-puntos">
            <h1 className="saldo-actual-heading">2. Checkout</h1>

            <div className="card-saldo-actual">
              <label className="saldo-actual-subheading">
                Saldo por recargar
              </label>
              <h1 className="saldo-actual-big-number">$ {cartTotal}.00</h1>
            </div>

            <div className="card-saldo-actual">
              <label className="saldo-actual-subheading">Saldo Nuevo</label>
              <h1 className="saldo-actual-big-number">
                $ {cartTotal + userPoints}.00
              </h1>
            </div>

            <h1 className="selecciona-metodo-pago-heading">
              Selecciona tu metodo de pago
            </h1>

            <select
              className="payment-method-selector-saldo"
              onChange={(event) => {
                setPaymentMethodSelected(!paymentMethodSelected);
                setPaymentMethod(event.target.value);
              }}
            >
              <option value="">Ninguno</option>
              <option value="tarjeta">Tarjeta de credito/debito</option>
            </select>
          </div>
        </div>

        <div>
          {paymentMethodSelected ? (
            <div className="checkout-wrapper">
              <h1 className="metodo-tarjeta-heading">
                Favor de ingresar la información de su tarjeta.
              </h1>
              <h2 className="metodo-tarjeta-subheading">
                Numero de Tarjeta, Codigo, Fecha de expiración, Codigo Postal
              </h2>
              <h2 className="metodo-tarjeta-subheading">
                Aceptamos todo tipo de tarjeta (Visa, AMEX, MasterCard)
              </h2>
              <CheckoutStripe2
                setErrorPayment={setErrorPayment}
                setHasPaymentError={setHasPaymentError}
                cartTotal={cartTotal}
                setIsRechargePaid={setIsRechargePaid}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecargarSaldoPagina;
