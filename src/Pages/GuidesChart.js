import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import styled from "styled-components";

const GuidesChart = () => {
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
    <select>
                  <option>
                    Envios
                  </option>
                  <option>
                    Precio Promedio
                  </option>
                </select>
    {barChart}
  </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 50px;
`


export default GuidesChart;