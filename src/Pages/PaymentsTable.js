import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link, NavLink, useHistory } from "react-router-dom"
import styled from 'styled-components'
import { useTable } from 'react-table'
import userEvent from '@testing-library/user-event'
import DocIcon from '../assets/iconos/doc_icon.png'


const PaymentsTable = () => {
  const history = useHistory()
  const [payments, setPayments] = useState([])
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState();
  const [needsReload, setNeedsReload] = useState(true);
  
  useEffect(() => {
    setLoading(true)  
    fetchPayments()
    setLoading(false)
      
  }, [needsReload]);

  // Use the state and functions returned from useTable to build your UI
  
  const fetchPayments = async (
    url = `${process.env.REACT_APP_API_URL}/user/payments`
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
    };

    try {
      //AQUI VAN LAS RUTAS DE LAS GUIAS
      const { data } = await axios.post(url, {} ,config);
      console.log(data.data)
      setAllData(data.data.data)
      
      console.log("DATA")
      setPayments(data.data.data)
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      history.push("/signin")
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Confirmar',
        accessor: 'icon'
      },
      {
        Header: 'ID de Orden',
        accessor: 'payment_name'
      },
      {
        Header: 'Fecha de creacion',
        accessor: 'created_at'
      },
      {
        Header: 'Concepto de pago',
        accessor: 'name'
      },
      {
        Header: 'Order Id',
        accessor: 'order_id'
      },
      {
        Header: 'Estatus de recarga',
        accessor: 'status'
      },
      {
        Header: 'Tracking Number',
        accessor: 'id'
      },
      {
        Header: 'Precio',
        accessor: 'price'
      },

    ]
  )

  return (
    <Styles>
        { loading ? 
        <h1>loadign</h1> 
        :
        <Table needsReload={needsReload} 
        setNeedsReload={setNeedsReload} 
        columns={columns} 
        data={payments} 
        allData={allData} 
        fetchGuides={fetchPayments} />
        }
    </Styles>
  )
}


function Table({ needsReload, setNeedsReload ,columns, data, allData, fetchGuides }) {
  
  const confirmSinglePayment = async (order_id) => {
    const url = `${process.env.REACT_APP_API_URL}/user/pay/confirm`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify({
          "order_id": order_id
      })
    });
    const data = await response.json();
    if (data.status === "SUCCESS") {
      console.log("pagos actualizados")
    } 
    else if (data.status === "ERROR") {
      
    }
    
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })
  
  useEffect(() => {
    
  }, [allData]);
  
  // Render the UI for your table
  return (

    <>
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <THead {...column.getHeaderProps()}>{column.render('Header')}</THead>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                // COLUMN GUIDE
                if (cell.column.id === "icon" ) {
                  const trackingNumberCell = row.cells.filter((cell) => cell.column.Header == "Tracking Number")
                  const tracking_number = trackingNumberCell[0].value
                  return (
                  <td style={{
                    height: "100%",
                    width: "50px",
                    backgroundColor: "white",
                    boxSizing: "border-box",
                    justifyItems: "center",
                    alignItems:"center"
                  }
                  }>
                    <button onClick={()=> {
                    console.log(needsReload)
                    confirmSinglePayment(row.original.order_id)
                    setNeedsReload(!needsReload)
                    
                    }}
                    href={`https://s3.us-east-2.amazonaws.com/quikn-staging/labels`} target="_blank" title="document icons">
                      <img  style={{
                            width: `20px`,
                            height: `20px`}} alt='doc-icon' src={DocIcon}></img>
                    </button>
                  </td>
                  )
                } 
                // COLUMN ESTADO
                if (cell.column.id === "status_id" ) {
                  return (
                  <td>
                  <StatusButton status={cell.value}>
                    {
                      getStatusString(cell.value)
                    }
                  </StatusButton>
                  </td>
                  )
                } 
                else {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                }
              })}
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
    <PaginationWrapper class="pagination">
      
      <PaginationBtn onClick={
        () => fetchGuides(allData.first_page_url)}>
        Comienzo
      </PaginationBtn>
      
      { 
      allData.prev_page_url ? 
      <PaginationBtn onClick={
        () => fetchGuides(allData.prev_page_url)
      }
        >
        Anterior
      </PaginationBtn> :
      <PaginationBtn disabled 
        >
        Anterior
      </PaginationBtn>  
      }

      <PaginationBtn>
        {allData.current_page}
      </PaginationBtn>
      
      { 
      allData.next_page_url ? 
      <PaginationBtn 
      onClick={
        () => fetchGuides(allData.next_page_url)
      }
        >
        Siguiente
      </PaginationBtn> :
      <PaginationBtn disabled 
        >
        Siguiente
      </PaginationBtn>  
      }

      <PaginationBtn onClick={
        () => fetchGuides(allData.last_page_url)}>
        Final
      </PaginationBtn>
      
      
    </PaginationWrapper>
  </>
  )
}

const StyledTable = styled.table`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  color: white;
`


const PaginationWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  list-style: none;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 15px;
`

const Td = styled.td`
  box-sizing: border-box;
  padding-top: 3px 5px;
`

const PaginationLink = styled.li`
  box-sizing: border-box;
  padding-left: 6px;
  padding-right: 6px;
  font-size: 20px;
`

const StatusButton = styled.button`
  ${props => styleButton(props.status)};
  border-radius: 6px;
  box-sizing: border-box;
  padding: 5px;
  width: 80px;
  color: white;
`

const PaginationBtn = styled.button`
  border-radius: 5px;
  box-sizing: border-box;
  margin-left: 1px;
  margin-right: 1px;
  color: white;
  padding: 2px 8px;
  background-color: #245188;
  font-size: 15px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  &:hover {
    color: #EE1F42;
    font-weight: 500;
  }
  &:disabled {
    opacity: 50%;
    &:hover {
      color: white;
    }
  } 
`


const getStatusString = (int) => {
  switch(int) {
    case 1:
      return "Generada"
    default:
      return "Sin Status"
  }
}

const styleButton = (status) => {
  switch(status) {
    case 1:
      return `
      background-color: green;
    `
    case 2:
      return `
      background-color: lightblue;
    `
    default:
      return `
      background-color: grey;
    `
  }
}


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const THead = styled.th`
  background-color: #245188;
  font-size: 15px;
`

const SectionWrapper = styled.div`
  width: 100%;
  background-color: green;
`

export default PaymentsTable