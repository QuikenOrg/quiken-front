import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components';

const DashboardMonitor = ( 
    {
        userPoints,
        totalRecargas,
        user
    }
    ) => {
        console.log(user)
        const history = useHistory();
        const [date, setDate] = useState("");


    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        history.push('/signin')
    }

useEffect(() => {
    let newDate = new Date
    let options = { weekday:'long', day:'numeric', month:'long', year:'numeric' }
    newDate = newDate.toLocaleDateString('es-MX', options);
    setDate(newDate)
    return () => {
      
    };
}, []);
    
    return (
        <BigWrapper>
            <RowColumn>
                <WelcomeHeader>Bienvenido a Quiken</WelcomeHeader>  
                <MainHeaderDashboard>{user.email}</MainHeaderDashboard>  
                <SubHeaderDashboard>{date}</SubHeaderDashboard>    
            </RowColumn>
            
            <Row>
                <div className="card-dashboard">
                    <label className="label-paquete-info">Saldo disponible</label>
                    <h1 className="featured-number">$ {userPoints}</h1>
                    <Link className="recargar-saldo-link" to="/recargarsaldo">
                      Recagar Saldo {">"}
                    </Link>
                  </div>
                  
                  <div className="card-dashboard">
                    <label className="label-paquete-info">Total Recargas</label>
                    <h1 className="featured-number">$ {totalRecargas}.00</h1>
                    <Link className="recargar-saldo-link" to="/recargarsaldo">Recagar Saldo {">"}</Link>
                  </div>
                
                  <div className="card-dashboard">
                    <label className="label-paquete-info">Costo Promedio</label>
                    <h1 className="featured-number">$ 0.00</h1>
                    <Link className="recargar-saldo-link" disable style={{color: "white"}} to="/recargarsaldo">Recagar Saldo {">"}</Link>
                </div>
                
                  <div className="card-dashboard">
                    <label className="label-paquete-info">Peso Promedio</label>
                    <h1 className="featured-number">0.00 Kg</h1>
                    <Link className="recargar-saldo-link" disable style={{color: "white"}} to="/recargarsaldo">Recagar Saldo {">"}</Link>
                  </div>
            </Row>
            <GraphBannerWrapper>
                <GraphWrapper>
                </GraphWrapper>
            </GraphBannerWrapper> 
        </BigWrapper>
  )
}



const BigWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
const RowColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: 'Montserrat', sans-serif;
    background-color: #245188;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px;
`

const GraphBannerWrapper = styled.div`
display: flex;
flex-direction: row;
width: 100%;
height: 100%;

`

const MainHeaderDashboard = styled.h1`
    color: #EE1F42;
    font-size: 40px;
    font-weight: 700;
`
const SubHeaderDashboard = styled.h1`
    color: white;
    font-size: 25px;
    font-weight: 300;
`
const WelcomeHeader = styled.h1`
    color: white;
    font-size: 25px;
    font-weight: 500;
`

const GraphWrapper = styled.div`
    width: 100%;
    background-color: pruple;
`

export default DashboardMonitor