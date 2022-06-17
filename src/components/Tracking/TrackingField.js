import React from 'react';
import { Link } from 'react-router-dom';

const TrackingField = () => {
    const [guideTracked, setGuideTracked] = useState(initialState)
    
    return (
        <div>
            <h3>Rastrea tu pedido</h3>
            <div>
                <input placeholder="Código de rastreo" onChange={setGuideTracked}></input>
                <Link className="link-tracking" to={`/rastreo`} >
                    {/* <button></button> */}
                </Link>
            </div>
        </div>
    )
}

export default TrackingField;