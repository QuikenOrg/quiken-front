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
    const [dashboardData, setDashboardData] = useState()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()


  useEffect(() => {
    fetchPrivateData()
    fetchDashboard()
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
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      setError(true)
      history.push("/signin")
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
        console.log("Trying this")
        const { data } = await axios.post(url, {} ,config);
        setDashboardData(data)
        setLoading(false)
        setError(false)
    } catch (error) {
        localStorage.removeItem("authToken"); 
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        history.push("/signin")
        setError(true)
    }
};

    
    return (
    <PageWrapper>
        <Navbar/>
        <MidScreenWrapper>
            <Sidebar setLoading={setLoading} setError={setError}/>
            {
                error && loading ? 
                <Loading>
                  <h1>Cargando info...</h1>
                </Loading> 
                :
                <DashboardWrapper>
                <DashboardMonitor
                    user={user} 
                    userPoints={userPoints}
                    totalRecargas={totalRecargas}
                    dashboardData={dashboardData}
                />
                <GuidesChart 
                    dashboardData={dashboardData}
                />
                </DashboardWrapper>
            }
            
        </MidScreenWrapper>
        <Footer/>
    </PageWrapper>
  )
}

export default NewDashboard;

const Loading = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`


const DashboardWrapper = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 100%;
`