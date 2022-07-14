import React, { useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Link, NavLink, useHistory } from "react-router-dom"
import styled from 'styled-components'
import { useTable } from 'react-table'
import userEvent from '@testing-library/user-event'
import DocIcon from '../assets/iconos/doc_icon.png'
import { Loading } from '../utilities/Loading'
import { UserContext } from '../components/Context/UserContext'

const GuidesTable = () => {
  const history = useHistory()
  const [guides, setGuides] = useState([])
  const [allData, setAllData] = useState([])

  const [error, setError] = useState(true);

  const [reload, setReload] = useState(false)

  const { loading, setLoading  } = useContext(UserContext)

  useEffect(() => {
    
    fetchGuides()
   
  }, [reload]);

  const fetchGuides = async (
    url = `${process.env.REACT_APP_API_URL}/user/guides`
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
      setAllData(data)
      setGuides(data.data)
      console.log("runnig this")
      console.log(loading)
      setLoading(false)
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
        Header: 'Imprimir',
        accessor: 'icon'
      },
      {
        Header: 'Tracking Number',
        accessor: 'tracking_number'
      },
      {
        Header: 'Estado',
        accessor: 'status_id'
      },
      {
        Header: 'Nombre Destino',
        accessor: 'destination_name'
      },
      {
        Header: 'Nombre Origen',
        accessor: 'origin_name'
      },
      {
        Header: 'Ciudad Destino',
        accessor: 'destination_city'
      },
      {
        Header: 'Pais Destino',
        accessor: 'destination_country'
      },
      {
        Header: 'Peso',
        accessor: 'weight'
      },{
        Header: 'Costo',
        accessor: 'price'
      },
      {
        Header: 'Fecha Creacion',
        accessor: 'created_at'
      },
      {
        Header: 'Cancelar',
        accessor: 'icon-cancelar'
      }
    ]
  )

  return (
    
      loading ?
      <Loading></Loading>
      :
      <Styles>
        <Table columns={columns} data={guides} allData={allData} fetchGuides={fetchGuides} setReload={setReload} reload={reload} />
      </Styles>
  )
}


function Table({ columns, data, allData, fetchGuides, setReload, reload }) {
  // Use the state and functions returned from useTable to build your UI

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
    console.log(allData)  
  }, [allData, reload]);
  
  // Render the UI for your table


  const cancelGuide = async (guideId) => {
    console.log(guideId)
    const url = 'https://test.quiken.mx/cancel';
    console.log(`Bearer ${localStorage.getItem("access_token")}`)
    console.log(localStorage.getItem("email"))
    console.log(localStorage.getItem("api_key"))
    const responseApi = await fetch(url, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "clientDetail": {
          "accountName": localStorage.getItem("email"),
          "apiKey": localStorage.getItem("api_key")
        },
        "shipment": {
          "trackingNumber": guideId
        }
      })
    });
    console.log(responseApi)
    const data = await responseApi.json()
    if (data.stautus = "SUCCESS") {
      alert("Tu guia fue cancelada exitosamente.")
      setReload(!reload)
    }
  }

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
                    <a
                    href={`https://s3.us-east-2.amazonaws.com/quikn-staging/labels/${tracking_number}.pdf`} target="_blank" title="document icons">
                      <img  style={{
                            width: `20px`,
                            height: `20px`}} alt='doc-icon' src={DocIcon}></img>
                    </a>
                  </td>
                  )
                }
                
                // Cancel icon
                if (cell.column.id === "icon-cancelar" ) {
                  const trackingNumberCell = row.cells.filter((cell) => cell.column.Header == "Tracking Number")
                  const tracking_number = trackingNumberCell[0].value
                  return (
                  <td style={{
                    height: "100%",
                    width: "auto",
                    backgroundColor: "white",
                    boxSizing: "border-box",
                    justifyItems: "center",
                    alignItems:"center"
                  }
                  }>
                      <BtnCancelar onClick={() => cancelGuide(tracking_number)}>Cancelar</BtnCancelar>
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

const BtnCancelar = styled.button`
  background-color: #EE1F42;
  font-size: 14px;
  height: 28px;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 5px;
  width: 80px;
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
      return "Cancelada"
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

export default GuidesTable