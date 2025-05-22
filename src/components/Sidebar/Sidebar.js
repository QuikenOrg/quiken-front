import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../Context/UserContext";
import "./Sidebar.scss";

const Sidebar = () => {
  const history = useHistory();

  const { handleLogoutBtn, relaod } = useContext(UserContext);

  const handleLogoutSidebar = async (e) => {
    const result = await handleLogoutBtn(e);
    if (result) {
      history.push("/signin");
    }
  };

  useEffect(() => {}, [relaod]);

  return (
    <SidebarWrapper>
      <LinksWrapper>
        <Link className="sidebar-link" to="/newdashboard">
          Dashboard
        </Link>
        <Link className="sidebar-link" to="/newcotizar">
          Cotizar
        </Link>
        {/* <Link className="sidebar-link" to="/newcreateguide">
          Generar Guia
        </Link> */}
        <Link className="sidebar-link" to="/newmyguides">
          Mis Guias
        </Link>
        <Link className="sidebar-link" to="/mypayments">
          Mis Pagos
        </Link>
        <Link className="sidebar-link" to="/recargaContact">
          Recargar
        </Link>
        <LogoutButton
          onClick={(e) => handleLogoutSidebar(e)}
          className="btn-red"
        >
          Logout
        </LogoutButton>
      </LinksWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;

const LogoutButton = styled.button``;

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  box-sizing: border-box;
  background-color: #245188;
  width: 10%;
  min-width: 180px;
  font-size: 18px;
  background-color: #245188;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-self: center;
  height: 80%;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 40px;
  color: white;
`;
