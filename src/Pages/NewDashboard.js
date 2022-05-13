import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import PageWrapper from '../styled_components/page_wrapper'
import MidScreenWrapper from '../styled_components/mid_screen_wrapper'
import { useState, useEffect } from 'react'
import DashboardMonitor from './DashboardMonitor'
import styled from 'styled-components'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const NewDashboard = () => {
    
    const history = useHistory()
    const [error, setError] = useState(true);
    const [userPoints, setUserPoints] = useState()
    const [totalRecargas, setTotalRecargas] = useState()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()


  useEffect(() => {
    fetchPrivateData()
    return () => {
      
    };
  }, []);

  const fetchPrivateData = async () => {
    console.log("Sidebar, fetching private data")
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
    };

    try {
      //AQUI VAN LAS RUTAS DE LAS GUIAS
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/info`, {} ,config);
      setUser(data.user)
      setLoading(true)
      setError(false)
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      setError(true)
      history.push("/signin")
    }
  };

    
    return (
    <PageWrapper>
        <Navbar/>
        <MidScreenWrapper>
            <Sidebar setLoading={setLoading} setError={setError}/>
            {
                error && loading ? 
                <h1>Error</h1> 
                :
                <DashboardWrapper>
                <DashboardMonitor
                    user={user} 
                    userPoints={userPoints}
                    totalRecargas={totalRecargas}
                />
                </DashboardWrapper>
            }
        </MidScreenWrapper>
        <Footer/>
    </PageWrapper>
  )
}

export default NewDashboard;

const DashboardWrapper = styled.div`
    background-color: orange;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 100%;
`