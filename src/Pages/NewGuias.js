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
            <div>
                <GuidesTable/>
            </div>
        </MidScreenWrapper>
        <Footer/>
    </PageWrapper>
  )
}

export default NewGuias;