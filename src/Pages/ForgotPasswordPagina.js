import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordPagina.scss";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useHistory } from "react-router-dom";

const ForgotPasswordScreen = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    let formData = new FormData();
    formData.append("email", email);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/password/recovery`,
        formData,
        config
      );

      setSuccess(data.data);
      console.log(data);
      if (data.status == "SUCCESS") {
        alert("Un email de recuperacion ha sido envidado a tu correo.");
        history.push("/");
      }
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="forgotpassword-screen">
        <form
          onSubmit={forgotPasswordHandler}
          className="forgotpassword-screen__form"
        >
          <h3 className="forgotpassword-screen__title">Forgot Password</h3>
          {error && <span className="error-message">{error}</span>}
          {success && <span className="success-message">{success}</span>}
          <div className="form-group">
            <p className="forgotpassword-screen__subtext">
              Please enter the email address you register your account with.
              <br /> We will send you reset password confirmation to this email
            </p>
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              className="form-input"
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button id="btn" type="submit" className="btn-contact-form">
            Send
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPasswordScreen;
