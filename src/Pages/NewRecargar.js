import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import PageWrapper from '../styled_components/page_wrapper'
import MidScreenWrapper from '../styled_components/mid_screen_wrapper'
import { useState } from 'react'
import styled from 'styled-components'
import MasterCard from '../assets/Recarga/master_card.png'
import Visa from '../assets/Recarga/Visa_Inc._logo.svg.png'
import Oxxo from '../assets/Recarga/oxxo.svg'
import Ecart from '../assets/Recarga/logo-negro.svg'



const NewGuias = () => {
    const [error, setError] = useState(true);
    const [amount, setAmount ] = useState(0);
    const [ modal, setModal ] = useState(false);
    const [ haveLink, setHaveLink] = useState(false);
    const [paymentLink, setPaymentLink] = useState("");

    const createPayment = async () => {
        const url = `${process.env.REACT_APP_API_URL}/user/pay`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          },
          body: JSON.stringify({
              "price": amount
          })
        });
        const data = await response.json();
        if (data.status === "SUCCESS") {
            setHaveLink(true)
            setPaymentLink(data.pay_link)
        } else if (data.status === "ERROR") {
          console.log(data.description)
        } 
      }

    const handleChange = (e) => {
        setAmount(e.target.value)
    } 

    const upperSection = haveLink === false ? (
        <PaymentSection>
            <HeaderAgregaSaldo> AGREGA SALDO A TU CUENTA:</HeaderAgregaSaldo>
            <SubHeadingAgregaSaldo> Ingresa la cantidad a abonar a tu cuenta. <br/> Y paga comodamente con cualquiera de nuestros metodos de pago</SubHeadingAgregaSaldo>
            <PaymentInput onChange={(e) => handleChange(e)} placeholder='Cantidad a abonar a saldo'></PaymentInput>
            <ButtonPayment onClick={() => createPayment()}>Aceptar</ButtonPayment>        
        </PaymentSection>
    ) : (
     <PaymentSection>
         <HeaderAgregaSaldo>Muchas gracias por realizar su pedido.</HeaderAgregaSaldo>
         <SubHeadingAgregaSaldo> Da click en el siguiente link.<br/> Y completa tu pago</SubHeadingAgregaSaldo>
            
         <PaymentLink href={paymentLink}>
            {paymentLink}
         </PaymentLink>
     </PaymentSection>   
    )

    return (
    <PageWrapper>
        <Navbar/>
        <MidScreenWrapper>
            <Sidebar setError={setError}/>
            <RecargaWrapper>
                
                {upperSection}
                           
                <LogosWrapper>
                    <img 
                        style={{
                            width: `250px`,
                            height: `100px`,
                            }} 
                            alt="visa-logo" 
                        src={Visa}/>

                    <img alt="paypal-logo" src={Ecart} 
                        style={{
                            width: `250px`,
                            height: `100px`,
                            }}
                    ></img>
                    
                    <img 
                    alt="oxxo-logo"
                    style={{
                        width: `250px`,
                        height: `100px`,
                        }} 
                    src={Oxxo}/>
                    <img 
                    alt="mastercard-logo" 
                    src={MasterCard}
                    style={{
                        width: `250px`,
                        height: `100px`,
                        }}
                    />
                </LogosWrapper>
          </RecargaWrapper>
        </MidScreenWrapper>
        <Footer/>
    </PageWrapper>
  )
}

const PaymentSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


const RecargaWrapper = styled.div`
    width: 100%; 
    display: flex;
    flex-direction: column;
    //align-items: center;
    justify-content: center;
`

const PaymentLink = styled.a`
    &:hover {
        color: red;
        font-weight: 500;
    }
    color: #245188;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 20px;
    
`

const LogosWrapper = styled.div`
    width: 90%; 
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    align-self: center;
    justify-content: space-evenly;
`

const HeaderAgregaSaldo = styled.h1`
    color: #EE1F42;
    font-size: 40px;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
    padding-bottom: 10px;
`
const SubHeadingAgregaSaldo = styled.h1`
    color: #245188;
    font-size: 25px;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
`
const WelcomeHeader = styled.h1`
    color: white;
    font-size: 25px;
    font-weight: 500;
`

const PaymentInput = styled.input`
    color: black;
    font-size: 15px;
    box-sizing: border-box;
    font-weight: 500;
    width: 250px;
    margin-top: 10px;
    padding: 5px;
    font-family: 'Montserrat', sans-serif;
`

const ButtonPayment = styled.button`
    height: 30px;
    box-sizing: border-box;
    font-weight: 500;
    width: 150px;
    font-size: 20px;
    background-color: #245188;
    margin-top: 10px;
    border: none;
    border-radius: 10px;
    color: white;
    font-family: 'Montserrat', sans-serif;
`

export default NewGuias;