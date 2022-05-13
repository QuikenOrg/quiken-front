import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import PageWrapper from '../styled_components/page_wrapper'
import MidScreenWrapper from '../styled_components/mid_screen_wrapper'
import axios from 'axios'
import GuideCreator from './GuideCreator'
import styled from 'styled-components'

const NewCreateGuide = () => {
    
    useEffect(() => {
        getUserInfo()
    }, []);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [user, setUser] = useState(true);

    const getUserInfo = async () => {
        console.log("NewGuias, fetching private data")
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          },
        };
    
        try {
          //AQUI VAN LAS RUTAS DE LAS GUIAS
          const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/info`, {} ,config);
          
          setUser(data.user)

        } catch (error) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("email");
          localStorage.removeItem("username");
          setError(true)
        }
      };

    return (
    <PageWrapper>
        <Navbar/>
        <CreateGuideScreenWrapper>
          { loading == false ?
            <>
            <Sidebar setError={setError}/>
            <GuideCreator user={user}/>
            </> : <></> 
          }
        </CreateGuideScreenWrapper>
        <Footer/>
    </PageWrapper>
  )
}

const CreateGuideScreenWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 1300px;
`

export default NewCreateGuide;