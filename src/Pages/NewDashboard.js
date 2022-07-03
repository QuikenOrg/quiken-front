import React, { useContext } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import PageWrapper from '../styled_components/page_wrapper'
import { useState, useEffect } from 'react'
import DashboardMonitor from './DashboardMonitor'
import styled from 'styled-components'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import GuidesChart from './GuidesChart'
import { Loading } from '../utilities/Loading'
import { UserContext } from '../components/Context/UserContext'

const NewDashboard = () => {
    
  const history = useHistory()
  
  const { user, setUser,
    loading, setLoading,
    error, setError,
    fetchPrivateData,
    handleLogout,
    userPoints, setUserPoints,
    fetchDashboard,
    totalRecargas, setTotalRecargas,
    dashboardData, setDashboardData,
  } = useContext(UserContext)

  useEffect(() => {
    setLoading(true)
    const getPrivateData = async () => {
      const result = await fetchPrivateData();
      return result
    };
    const getDashboard = async () => {
      const result = await fetchDashboard();
        return result
    };
    Promise.all([getPrivateData, getDashboard]).then((result) => {
      console.log(result)
    })
  }, []);
  
    return (
    <PageWrapper>
        <Navbar/>
        <WrapperRow>
            <Sidebar setLoading={setLoading} setError={setError}/>
            {
                error && loading ? 
                <Loading/>
                :
                <DashboardWrapper>
                {/* <DashboardMonitor
                    user={user} 
                    userPoints={userPoints}
                    totalRecargas={totalRecargas}
                    dashboardData={dashboardData}
                /> */}
                  {/* <GuidesChart 
                  dashboardData={dashboardData}
                    />                 */}
                </DashboardWrapper>
            }
        </WrapperRow>
        <Footer/>
    </PageWrapper>
  )
}

export default NewDashboard;

const WrapperRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    min-height: 800px;
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