import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from "react-router-dom"
import styled from 'styled-components'

const GuidesTable = () => {
  const history = useHistory()
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGuides()
   
  }, []);



  const fetchGuides = async () => {
    console.log(localStorage.getItem("access_token"))
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
    };

    try {
      //AQUI VAN LAS RUTAS DE LAS GUIAS
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/guides`, {} ,config);
      setGuides(data.data)
      console.log("This are guides", data.data)
      setLoading(false)
      
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      history.push("/signin")
    }
  };
  
  return (
    <h1>
      
   </h1>
  )
}

const SectionWrapper = styled.div`
  width: 100%;
  background-color: green;
`

export default GuidesTable