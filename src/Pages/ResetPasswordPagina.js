import { useState} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ResetPasswordPagina.scss";
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './ResetPasswordPagina.scss'

const ResetPasswordPagina = (props) => {

  const match = useParams()
  console.log(match.resetToken)

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
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${match.resetToken}`,
        {
          password,
        },
        config
      );

      console.log(data);
      setSuccess(data.data);
    } catch (error) {
      setError(error.data);
    }
  };

  return (
    <div className="resetpassword-screen">
      <Navbar/>
      <div className="form-wrapper-div">
        <form className="forgot-password-form"
        onSubmit={resetPasswordHandler}
      >
        <h3 className="resetpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/signin">Login</Link>
          </span>
        )}
        <div className="form-group">
          <label className="form-label" htmlFor="password">New Password:</label>
          <input
            className="contact-form-input"
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            className="contact-form-input"
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="btn-contact" type="submit">
          Reset Password
        </button>
      </form>
      </div>
      <Footer/>
    </div>
  );
};

export default ResetPasswordPagina;