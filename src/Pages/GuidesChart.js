import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import styled from "styled-components";

const GuidesChart = () => {

  const yearsSelect = [
    "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012",
  ]

  Chart.register(CategoryScale);
  const barChartData = {
    labels: ["Ene", "Feb", "Mar", "Mar","Abr","May","Jun","Jul",
    "Ago", "Sep", "Oct", "Nov", "Dic"
  ],
    datasets: [
      {
        data: [200, 350, 275],
        borderColor: "#3333ff",
        backgroundColor: "pink",
        fill: true
      },
    ]
  };

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

  return (
  <ChartWrapper>
    <SelectWrapper>
      <Select>
          { yearsSelect.map((year) => {
            return <option>{year}</option>
          })}
      </Select>
      <Select>
                    <option>
                      Envios
                    </option>
                    <option>
                      Precio Promedio
                    </option>
                    <option>
                      Recargas
                    </option>
      </Select>
    </SelectWrapper>
    {barChart}
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