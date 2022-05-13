import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Sidebar = (
  { 
    setError,
    setLoading
  }
  ) => {
  
  const history = useHistory()

  const handleLogout = (e) => {
    console.log("CLICK CLACK")
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    history.push("/signin")
  }

  
  return (
    <SidebarWrapper>
      <LinksWrapper>
        <Link className="navbar-link" to="/newdashboard">Dashboard</Link>
        <Link className="navbar-link" to="/newcotizar">Cotizar</Link>
        <Link className="navbar-link" to="/newcreateguide">Generar Guia</Link>
        <Link className="navbar-link" to="/newmyguides">Mis Guias</Link>
        <Link className="navbar-link" to="/newrecargar">Recargar</Link>
        <LogoutButton onClick={() => handleLogout()} className="btn-red" to="/newrecargar">Logout</LogoutButton>
      </LinksWrapper>
    </SidebarWrapper>
  )
}

export default Sidebar;

const LogoutButton = styled.button`

`

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-self: center;
  height: 60%;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px;
`

const SidebarWrapper =  styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightgrey;
  width: 10%;
  min-width: 180px ;
  height: 100%;
  font-size: 20px;
  justify-content: space-evenly;
`



