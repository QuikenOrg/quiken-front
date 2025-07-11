import { background } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Loading } from "../utilities/Loading";
import { UserContext } from "../components/Context/UserContext";

const DashboardMonitor = () => {
  const history = useHistory();
  const [date, setDate] = useState("");
  const [loadingTwo, setLoadingTwo] = useState(true);
  const {
    user,
    email,
    loginHandler,
    loading,
    setLoading,
    userPoints,
    dashboardData,
    fetchPrivateData,
  } = useContext(UserContext);
  

  useEffect(async () => {
    setLoadingTwo(true);
    let newDate = new Date();
    let options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    newDate = newDate.toLocaleDateString("es-MX", options);
    await setDate(newDate);
    setLoadingTwo(false);
  }, []);

  return (
    <BigWrapper>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <RowColumn>
            <WelcomeHeader>Bienvenido a Quiken</WelcomeHeader>
            <MainHeaderDashboard>{user.email}</MainHeaderDashboard>
            <SubHeaderDashboard>{user.date}</SubHeaderDashboard>
          </RowColumn>

          <Row>
            <Card>
              <label className="label-paquete-info">Saldo disponible</label>
              <h1 className="featured-number">$ {userPoints}</h1>
              <Link className="recargar-saldo-link" to="/recargaContact">
                Recagar Saldo {">"}
              </Link>
            </Card>

            <Card>
              <label className="label-paquete-info">Total Recargas</label>
              <h1 className="featured-number">
                {parseInt(dashboardData.total_refils)}
              </h1>
              <Link className="recargar-saldo-link" to="/recargaContact">
                Recagar Saldo {">"}
              </Link>
            </Card>

            <Card>
              <label className="label-paquete-info">Costo Promedio</label>
              <h1 className="featured-number">
                ${isNaN(dashboardData.averange_cost) ? 0 : parseInt(dashboardData.average_cost)}.00
              </h1>
              <Link
                className="recargar-saldo-link"
                disable
                style={{ color: "white" }}
                to="/recargaContact"
              >
                Recagar Saldo {">"}
              </Link>
            </Card>

            <Card>
              <label className="label-paquete-info">Peso Promedio</label>
              <h1 className="featured-number">
                {isNaN(dashboardData.average_weight) ? 0 : dashboardData.average_weight} Kg
              </h1>
              <Link
                className="recargar-saldo-link"
                disable
                style={{ color: "white" }}
                to="/recargaContact"
              >
                Recagar Saldo {">"}
              </Link>
            </Card>
          </Row>
          <GraphBannerWrapper>
            <GraphWrapper></GraphWrapper>
          </GraphBannerWrapper>
        </>
      )}
    </BigWrapper>
  );
};

const BigWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: white;
`;
const Card = styled.div`
  height: 100%;
  background-color: $quikenWhite;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 5px;
`;

const RowColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  background-color: #245188;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
`;

const GraphBannerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const MainHeaderDashboard = styled.h1`
  color: #ee1f42;
  font-size: 40px;
  font-weight: 700;
`;
const SubHeaderDashboard = styled.h1`
  color: white;
  font-size: 25px;
  font-weight: 300;
`;
const WelcomeHeader = styled.h1`
  color: white;
  font-size: 25px;
  font-weight: 500;
`;

const GraphWrapper = styled.div`
  width: 100%;
  background-color: white;
`;

export default DashboardMonitor;
