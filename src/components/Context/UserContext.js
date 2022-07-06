import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false)
  const [reload, setReload] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(true)
  const [userPoints, setUserPoints] = useState()
  const [totalRecargas, setTotalRecargas] = useState()
  const [dashboardData, setDashboardData] = useState()

  useEffect(() => {
    userSignedIn()
    
  }, [])
  

  const handleLogoutBtn = async (e) => {
    e.preventDefault()
    await localStorage.removeItem("access_token");
    await localStorage.removeItem("email");
    await localStorage.removeItem("username");
    await localStorage.removeItem("api_key");
    setIsUserSignedIn(false)
    setReload(!reload)
    return true
  }

  const handleLogout = async () => {
    await localStorage.removeItem("access_token");
    await localStorage.removeItem("email");
    await localStorage.removeItem("username");
    await localStorage.removeItem("api_key");
    setIsUserSignedIn(false)
    return true
  }

  const userSignedIn = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
    };

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/info`, {} , config);
      await setUser(data.user)
      await setError(false)
      await setErrorText(null)
      await setIsUserSignedIn(true)
    } catch (error) {  
      await handleLogout()
      setUser(null)
      setError(true)
      setIsUserSignedIn(false)
      return false
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
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        formData,
        config
      );
      console.log(data)
      await localStorage.setItem("access_token", data.data.access_token);
      await localStorage.setItem("api_key", data.data.user.api_key);
      await localStorage.setItem("email", data.data.user.email);
      await localStorage.setItem("username", data.data.user.username)
      setUser(data.data.user)
      setIsUserSignedIn(true)
      return true
    } catch (error) {
      setError(error)
      setErrorText("Tus credenciales de usuario y contraseña no son correctas")
      setLoading(false)
      return false
    }
  };


  const fetchPrivateData = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
    };

    try {
      //AQUI VAN LAS RUTAS DE LAS GUIAS
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/info`, {}, config);
      console.log("hasta aqui bien")
      await setUser(data.user)
      await setUserPoints(data.user.balance)
      console.log("this works")
      return true
    } catch (error) {
      await localStorage.removeItem("authToken");
      await localStorage.removeItem("email");
      await localStorage.removeItem("username");
      setError(true)
      return false
    }
  };

  const fetchDashboard = async (
    url = `${process.env.REACT_APP_API_URL}/user/dashboard`
    ) => {
    const config = {
        headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
    };

    try {
        //AQUI VAN LAS RUTAS DE LAS GUIAS
        const { data } = await axios.post(url, {}, config);
        console.log("Fetch Dashboar Sucess")  
        await setDashboardData(data)
        await setError(false)
        return true
    } catch (error) {
        console.log("Fetch Dashboar Error")
        await localStorage.removeItem("authToken"); 
        await localStorage.removeItem("email");
        await localStorage.removeItem("username");
        setError(true)
        return false
    }
  };
  
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <UserContext.Provider
      value={{
        // States

        user, setUser,
        isUserSignedIn,
        error, setError,
        errorText, setErrorText,
        email, setEmail,
        password, setPassword,
        loading, setLoading,
        userPoints, setUserPoints,
        reload, setReload,
        totalRecargas, setTotalRecargas,
        dashboardData, setDashboardData,
        // Functions and Handlers
        fetchPrivateData,
        handleLogout,
        handleLogoutBtn,
        userSignedIn,
        loginHandler,
        fetchDashboard,
        // Utitlies
        openInNewTab
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
