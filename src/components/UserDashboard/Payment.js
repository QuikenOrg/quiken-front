import Navbar from '../Navbar/Navbar'
import { useState } from 'react';

export default function PaymentForm() {
    let [fullNameCard, setFullNameCard] = useState('');
    let [cardNumber, setCardNumber] = useState('');
    let [expDate, setExpDate] = useState('');
    let [cardCvc, setCardCvc] = useState('');

    // Handle submit action from registration form
    let handleSubmit = () => {
        console.log(
          fullNameCard, 
          cardNumber,
          expDate,
          cardCvc
        );
    }

    return (
        <div>
                <title>Qüiken - Cotiza tus pedidos</title>
                <link rel="icon" href="/favicon.ico" />
            <div>
                <div></div>
                <div>
                    <h1>Realiza tu Pago</h1>
                            <div>    
                                <input value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} type="text" placeholder="Numero de tarjeta" />
                            </div>    
                            
                            <div>
                                <inputs value={fullNameCard} onChange={(event) => setFullNameCard(event.target.value)} type="email" placeholder="Nombre completo como aparece en tarjeta" />
                            </div>
                            
                            <div>    
                                <input value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} type="text" placeholder="Numero de tarjeta" />
                            </div>
                            
                            <div>
                                <input value={expDate} onChange={(event) => setExpDate(event.target.value)} type="text" placeholder="Fecha de expiranción" />
                                <input value={cardCvc} onChange={(event) => setCardCvc(event.target.value)} type="password" placeholder="CVC" />
                            </div>
                        
                        <button type="submit"> Comprar </button>
                    
                    
                </div>
            </div>
        </div>
    )
}
