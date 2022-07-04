import React, {useState, useEffect, useRef, useContext} from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import styled from "styled-components";
import { UserContext } from "../components/Context/UserContext";

const GuidesChart = ({ dashboardData, loading }) => {

  const yearTag = useRef(null);
  const typeTag = useRef(null);

  const yearsShipments = Object.keys(dashboardData.shipments).sort((a, b) => b - a)
  const yearsRecargas = Object.keys(dashboardData.refils).sort((a, b) => b - a)

  const [data, setData] = useState(setInitialData());
  const [yearsToSelect, setYearsToSelect] = useState(yearsShipments);
  
  Chart.register(CategoryScale);
  const barChartData = {
    labels: ["Ene", "Feb", "Mar", "Mar","Abr","May","Jun","Jul",
    "Ago", "Sep", "Oct", "Nov", "Dic"
  ],
    datasets: [
      {
        data: data,
        borderColor: "#3333ff",
        backgroundColor: "pink",
        fill: true
      },
    ]
  };

  function setInitialData() {
    const year = yearsShipments[0]
    let newData = Array(12).fill(0)
    dashboardData.shipments[year].forEach((entry) => {
      switch (entry.Mes) {
    case "January":
      newData[0] = entry.total
      return
    case 'February':
      newData[1] = entry.total
      return 
    case "March":
      newData[2] = entry.total
      return 
    case "April":
      newData[3] = entry.total
        return
    case "May":
      newData[4] = entry.total
      return
    case "June":
      newData[5] = entry.total
        return
    case "July":
      newData[6] = entry.total
      return
    case "August":
      newData[7] = entry.total
        return
    case "September":
      newData[8] = entry.total
      return
    case "October":
      newData[9] = entry.total
        return
    case "November":
      newData[10] = entry.total
      return
    case "December":
      newData[11] = entry.total
      return  
    }
    })
    return newData
  }
  
  function updateChart() {
    const year = yearTag.current.value
    const type = typeTag.current.value
    let newData = Array(12).fill(0)
    console.log(dashboardData)
    if (type == "Envios") {
      dashboardData.shipments[year].forEach((entry) => {
        switch (entry.Mes) {
      case "January":
        newData[0] = entry.total
        return
      case 'February':
        newData[1] = entry.total
        return 
      case "March":
        newData[2] = entry.total
        return 
      case "April":
        newData[3] = entry.total
          return
      case "May":
        newData[4] = entry.total
        return
      case "June":
        newData[5] = entry.total
          return
      case "July":
        newData[6] = entry.total
        return
      case "August":
        newData[7] = entry.total
          return
      case "September":
        newData[8] = entry.total
        return
      case "October":
        newData[9] = entry.total
          return
      case "November":
        newData[10] = entry.total
        return
      case "December":
        newData[11] = entry.total
        return  
      }
      })  
    }

    if (type == "Recargas") {
      console.log(dashboardData.refils.length)
      if (dashboardData.refils.length === 0) {
        console.log(newData)
      } else {
        dashboardData.refils[year].forEach((entry) => {
        switch (entry.Mes) {
        case "January":
          newData[0] = entry.total
          return
        case 'February':
          newData[1] = entry.total
          return 
        case "March":
          newData[2] = entry.total
          return 
        case "April":
          newData[3] = entry.total
            return
        case "May":
          newData[4] = entry.total
          return
        case "June":
          newData[5] = entry.total
            return
        case "July":
          newData[6] = entry.total
          return
        case "August":
          newData[7] = entry.total
            return
        case "September":
          newData[8] = entry.total
          return
        case "October":
          newData[9] = entry.total
            return
        case "November":
          newData[10] = entry.total
          return
        case "December":
          newData[11] = entry.total
          return  
        }
        })  
      }
    }
    setData(newData)
  }

  const barChart = (
    <Bar
      type="bar"
      width={70}
      height={20}
      options={{
        title: {
          display: false,
          text: "COVID-19 Cases of Last 3 Months",
          fontSize: 15
        },
        plugins: {
          legend: {
            display: false
          }
        }
        
      }}
      data={barChartData}
    />
  );

  // useEffect(() => {
  //   setLoading(false)
  //   console.log("runnig this")
  // }, [loading]);

  return (
  <ChartWrapper>
    {
        loading ? <></> :
        <>
        <SelectWrapper>
          <Select ref={yearTag} onChange={(e) => updateChart(e, {type: "year"})}>
              { yearsToSelect.map((year) => {
                return <option >{year}</option>
              })}
          </Select>
          <Select ref={typeTag} onChange={(e) => updateChart(e, { type: "graph"})}>
                        <option>
                          Envios
                        </option>
                        <option>
                          Recargas
                        </option>
          </Select>
        </SelectWrapper>
        {barChart}
        </>
    }
    
  </ChartWrapper>
  );
};

const Select = styled.select`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  align-self: flex-end;
  margin-right: 30px
`

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
`

const ChartWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px;
`


export default GuidesChart;