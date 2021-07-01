
import React, { Component, useMemo } from 'react'
import CancelButton from './CancelButton'
import './GuideTable.scss'

const GuideTable = (props) => {
  console.log(props)
  
  
  const data = props.userGuides
  console.log(data)
  
  const columns = [ 
    'Tracking Num.',
    'User',
    'Precio',
    'Status'
  ] 
  console.log(columns)

  // const data = [
  //   { envio: '12374693', rastreo: '18327474391', status: 'En camino', destinatario: 'Monte Palatino 212', total: '500.50' },
  //   { envio: '222222222', rastreo: '18327474391', status: 'Entregado', destinatario: 'Monte Palatino 212', total: '500.50' },
  //   { envio: '333333333', rastreo: '18327474391', status: 'Cancelado', destinatario: 'Monte Palatino 212', total: '500.50' },
  //   { envio: '333333333', rastreo: '18327474391', status: 'Cancelado', destinatario: 'Monte Palatino 212', total: '500.50' },
  //   { envio: '333333333', rastreo: '18327474391', status: 'Cancelado', destinatario: 'Monte Palatino 212', total: '500.50' }
  // ]

  const renderRow = (guide, index) => {
    return (
      <tr className="tr-element" key={index}>
        <td>{guide._id}</td>
        <td>{guide.currentUser}</td>
        <td>{guide.guideCost}</td>
        <td>{guide.guideStatus}</td>
        <td><CancelButton userGuide={guide}>Descargar</CancelButton></td>
      </tr>
    )
  }; 
 
  return (
    <div>
      <table className="table-element">
        <thead className=" thead-element">
          {columns.map((colName) => {
            return (<th>{colName}</th>)
          })}
        </thead>
        <tbody className="">
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  )
}

export default GuideTable;
