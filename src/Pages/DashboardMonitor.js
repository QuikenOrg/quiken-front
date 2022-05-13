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

            <h1>{user.email}</h1>  
            <h1>{date}</h1>    
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
                </div>
                
                  <div className="card-dashboard">
                    <label className="label-paquete-info">Peso Promedio</label>
                    <h1 className="featured-number">0.00 Kg</h1>
                    <Link className="recargar-saldo-link-trans" >Recagar Saldo {">"}</Link>
                  </div>
            </Row>
            <GraphBannerWrapper>
                <BannerWrapper>

                </BannerWrapper>
                <GraphWrapper>
                    
                </GraphWrapper>
            </GraphBannerWrapper> 
        </BigWrapper>
  )
}



const BigWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: aquamarine;
    display: flex;
    flex-direction: column;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100px;
    background-color: yellow;
`
const RowColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
    height: 100px;
    background-color: yellow;
`

const GraphBannerWrapper = styled.div`
display: flex;
flex-direction: row;
width: 100%;
height: 100%;
background-color: yellow;
`

const BannerWrapper = styled.div`
    width: 30%;
    background-color: blanchedalmond;
`

const GraphWrapper = styled.div`
    width: 70%;
    background-color: aquamarine;
`

export default DashboardMonitor