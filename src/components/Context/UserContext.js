import axios from "axios";
import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState(false)
  const [email, setEmail] = useState(false)
  const [password, setPassword] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const handleLogout = async (e) => {
    await localStorage.removeItem("access_token");
    await localStorage.removeItem("email");
    await localStorage.removeItem("username");
    return true
  }

  const userSignedIn = async () => {
    setLoading(true)
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
    };

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/info`, {} , config);
      console.log(data)
      await setUser(data.user)
      await setError(false)
      await setErrorText(null)
      await setLoading(false)
      console.log("pushing")
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      setUser(null)
      setError(true)
      setLoading(false)
    }
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    
    console.log("loginHandler")
    setLoading(true)
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    
    let formData = new FormData();
    formData.append('email', email);   //append the values with key, value pair
    formData.append('password', password);
    console.log(password, email)
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        formData,
        config
      );
      await localStorage.setItem("access_token", data.data.access_token);
      await localStorage.setItem("api_key", data.data.user.api_key);
      await localStorage.setItem("email", data.data.user.email);
      await localStorage.setItem("username", data.data.user.username)
      .then(() => {
        return true
      })
    } catch (error) {
      console.log("Han SOLO")
      console.log("error")
      setError(error)
      setErrorText("Tus credenciales de usuario y contraseña no son correctas")
      setLoading(false)
    }
  };

  return (
    <UserContext.Provider
      value={{
        // States
        user, setUser,
        error, setError,
        errorText, setErrorText,
        email, setEmail,
        password, setPassword,
        loading, setLoading,
        // Functions and Handlers
        handleLogout, 
        userSignedIn,
        loginHandler
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
