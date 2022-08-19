import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import PageWrapper from "../styled_components/page_wrapper";
import MidScreenWrapper from "../styled_components/mid_screen_wrapper";
import styled from "styled-components";
import GuidesTable from "./GuidesTable";
import { Loading } from "../utilities/Loading";

const NewGuias = () => {
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);

  return (
    <PageWrapper>
      <Navbar />
      <Row>
        <Sidebar />
        <WrapperTableGuias>
          <h1 className="cotizador-rapido-main-header">Guias Generadas</h1>
          <GuidesTable loading={loading} setLoading={setLoading} />
        </WrapperTableGuias>
      </Row>
      <Footer />
    </PageWrapper>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const WrapperTableGuias = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  //height: 100%;
  align-items: center;
  padding-top: 50px;
  box-sizing: border-box;
  justify-content: center;
  background-color: white;
`;

export default NewGuias;
