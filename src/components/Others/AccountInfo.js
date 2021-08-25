import React from 'react'
import './AccountInfo.scss'

function AccountInfo({loggedInUser, loggedInUserEmail}) {
    return (
        <div className="account-info-wrapper">
            <h2 className="heading-userdashboards">Dashboard de Enviós</h2>
            <div className="account-name">Cuenta: {loggedInUser}</div>
            <div className="account-name">Email: {loggedInUserEmail}</div>
        </div>
    )
}

export default AccountInfo
