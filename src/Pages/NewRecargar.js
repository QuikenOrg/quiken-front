import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import PageWrapper from '../styled_components/page_wrapper'
import MidScreenWrapper from '../styled_components/mid_screen_wrapper'
import { useState } from 'react'
import styled from 'styled-components'
import MasterCard from '../assets/Recarga/logo_mastercard-despues.jpeg'
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
        console.log("THIS THAT");
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
        console.log(data)
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
        <div className="payment-section">
                <h1 className="subheading-form-create-guide"> AGREGA SALDO A TU CUENTA:</h1>
                <h1> Ingresa la cantidad a abonar a tu cuenta. Y paga comodamente con cualquiera de nuestros metodos de pago</h1>

                    <input onChange={(e) => handleChange(e)} placeholder='Cantidad a abonar a saldo'></input>
                    <button onClick={() => createPayment()}>Aceptar</button>
                
                </div>
    ) : (
     <div>
         <h1>Hola morro</h1>
         <a href={paymentLink}>
            <h1>{paymentLink}</h1>
         </a>
     </div>   
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

const RecargaWrapper = styled.div`
    width: 100%; 
    display: flex;
    flex-direction: column;
    //align-items: center;
    justify-content: end;
`

const LogosWrapper = styled.div`
    width: 100%; 
    display: flex;
    flex-direction: row;
    height: 200px;
    background-color: green;
    justify-self: flex-end;
    
`

export default NewGuias;