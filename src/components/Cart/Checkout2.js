import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
const stripePromise = loadStripe(
  "pk_test_51J5EPQFOiWwOoK1YSaHbByG1mDZJJtKtGiutqeKKTrAs6Vr4hN8r6fprQXNA1x7BoxU5dvXL9jNdwtqTxwGHbiXk00TTjPMNxL"
);

console.log(stripePromise);

const CheckoutForm2 = ({
  cartTotal,
  setIsRechargePaid,
  setHasPaymentError,
  setErrorPayment,
}) => {
  console.log(cartTotal);
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log("FROM SUBMITTED");
    console.log("THIS IS CART TOTAL");
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod, "PAYMENT METHOD");
    console.log(error, "ERROR");
    setLoading(true);

    if (!error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("/api/checkout/payment", {
          id,
          amount: cartTotal * 100, //cents
        });

        console.log(data);
        elements.getElement(CardElement).clear();
        if (data.message === "Successful Payment") {
          setIsRechargePaid(true);
        }
      } catch (error) {
        console.log(error);
        setErrorPayment(error);
        setHasPaymentError(true);
      }
      setLoading(false);
    }
  };

  console.log(!stripe || loading);

  return (
    <form className="card card-body form-stripe" onSubmit={handleSubmit}>
      <div className="form-group">
        <CardElement className="cardelement" options={CARD_OPTIONS} />
      </div>

      <button
        disabled={!stripe}
        id="blue"
        className="btn btn-success btn-stripe-buy btn-create-guide-form"
      >
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Pagar"
        )}
      </button>
    </form>
  );
};

const CheckoutStripe2 = ({
  cartTotal,
  setIsRechargePaid,
  setHasPaymentError,
  setErrorPayment,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row h-100">
          <div className="col-md-4 offset-md-4 h-100">
            <CheckoutForm2
              setHasPaymentError={setHasPaymentError}
              setErrorPayment={setErrorPayment}
              cartTotal={cartTotal}
              setIsRechargePaid={setIsRechargePaid}
            />
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default CheckoutStripe2;

const CARD_OPTIONS = {
  iconStyle: "solid",

  style: {
    base: {
      iconColor: "#2B91AE",
      color: "#245188",
      fontWeight: 600,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "24px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#EE1F42",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
