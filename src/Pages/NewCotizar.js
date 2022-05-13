import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import PageWrapper from '../styled_components/page_wrapper'
import MidScreenWrapper from '../styled_components/mid_screen_wrapper'
import Cotizador from './Cotizador'
import styled from 'styled-components'

const NewCotizar = () => {
    const [error, setError] = useState(true);
  
    return (
    <PageWrapper>
        <Navbar/>
        <MidScreenWrapper>
            <Sidebar setError={setError}/>
            <CotizadorWrapper>
                <Cotizador/>
            </CotizadorWrapper>
        </MidScreenWrapper>
        <Footer/>
    </PageWrapper>
  )
}

const CotizadorWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export default NewCotizar;