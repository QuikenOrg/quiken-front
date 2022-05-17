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
import GuidesChart from './GuidesChart'

const NewDashboard = () => {
    
    const history = useHistory()
    const [error, setError] = useState(true);
    const [userPoints, setUserPoints] = useState()
    const [totalRecargas, setTotalRecargas] = useState()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()


  useEffect(() => {
    fetchPrivateData()
    console.log(user)
    return () => {
      
    };
  }, []);

  const fetchPrivateData = async () => {
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
      setUserPoints(data.user.balance)
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
                <GuidesChart/>
                </DashboardWrapper>
            }
            
        </MidScreenWrapper>
        <Footer/>
    </PageWrapper>
  )
}

export default NewDashboard;

const DashboardWrapper = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 90%;
`