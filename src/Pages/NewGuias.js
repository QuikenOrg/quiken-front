import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import PageWrapper from '../styled_components/page_wrapper'
import MidScreenWrapper from '../styled_components/mid_screen_wrapper'
import axios from 'axios'
import styled from 'styled-components'
import GuidesTable from './GuidesTable'

const NewGuias = () => {
  
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(true);

    return (
    <PageWrapper>
        <Navbar/>
        <MidScreenWrapper>
            <Sidebar setLoading={setLoading} setError={setError}/>
            <WrapperTableGuias>
                <h1 className="cotizador-rapido-main-header">Guias Generadas</h1>
                <GuidesTable/>
            </WrapperTableGuias>
        </MidScreenWrapper>
        <Footer/>
    </PageWrapper>
  )
}


const WrapperTableGuias = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-top: 50px;
    box-sizing: border-box;
    justify-content: flex-start;
`

export default NewGuias;