import React from 'react'
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

const NewDashboard = () => {
    
    const history = useHistory()
    const [error, setError] = useState(true);
    const [userPoints, setUserPoints] = useState()
    const [totalRecargas, setTotalRecargas] = useState()
    const [dashboardData, setDashboardData] = useState()
    const [paymentsToConfirm, setPaymentsToConfirm] = useState()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()


  useEffect(() => {
    fetchPrivateData()
    fetchDashboard()
    // getUserPayments()
    // .then(confirmPayments())   
    
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

  // const confirmPayments = async () => {
  //   console.log("CHECK IT OUT")
  //   const paymentsNotConfirmed = await paymentsToConfirm.filter((payment) => payment.status == "created")
  //   paymentsNotConfirmed.forEach(payment => {
  //     confirmSinglePayment(payment.order_id)
  //   })

  // }

  // const confirmSinglePayment = async (order_id) => {
  //   const url = `${process.env.REACT_APP_API_URL}/user/pay/confirm`;
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //       "Authorization": `Bearer ${localStorage.getItem("access_token")}`
  //     },
  //     body: JSON.stringify({
  //         "order_id": order_id
  //     })
  //   });
  //   const data = await response.json();
  //   if (data.status === "SUCCESS") {
  //     console.log("pagos actualizados")
  //   } 
  //   else if (data.status === "ERROR") {
      
  //   }
    
  // }


  // const getUserPayments = async (
  //   url = `${process.env.REACT_APP_API_URL}/user/payments`
  //   ) => {
  //   const config = {
  //       headers: {
  //       "Content-Type": "multipart/form-data",
  //       "Authorization": `Bearer ${localStorage.getItem("access_token")}`
  //       },
  //   };

    
  //   try {
  //       //AQUI VAN LAS RUTAS DE LAS GUIAS
  //       console.log("GUACAMOLE")
  //       const { data } = await axios.post(url, {} ,config);
  //       console.log(data.data)
  //       setPaymentsToConfirm(data.data)

  //     } catch (error) {
  //       console.log("did not get payments")
  //   }
  // };


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
        <WrapperRow>
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
        </WrapperRow>
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