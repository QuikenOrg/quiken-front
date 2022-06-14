import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import PageWrapper from '../styled_components/page_wrapper'
import Cotizador from './Cotizador'
import styled from 'styled-components'

const NewCotizar = () => {
    const [error, setError] = useState(true);
  
    return (
    <PageWrapper>
        <Navbar/>
        <WrapperCotizador>
            <Sidebar setError={setError}/>
            <CotizadorWrapper>
                <Cotizador/>
            </CotizadorWrapper>
        </WrapperCotizador>
        <Footer/>
    </PageWrapper>
  )
}


const WrapperCotizador = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #DDE5ED;
    min-height: 600px;
`

const CotizadorWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: center;
`

export default NewCotizar;