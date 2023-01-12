import * as React from 'react';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
 } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
 );

interface BarChartProps {
   labels: string[],
   data1 : number[],
   data2 : number[],
   name: string,
   name1 : string,
   name2 : string,
}

const BarChart = ({labels, data1, data2, name, name1, name2} : BarChartProps) => {

  let options = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
         legend: {
            position: 'top' as const,
         },
         title: {
            display: true,
            text: name,
         },
      },
      
   }; 

   let dataSets = {
      labels,
      datasets: [{
         label: name1,
         data: data1,
         backgroundColor: "red"
      }, {
         label: name2,
         data: data2,
         backgroundColor: "green"
      }]
   }

   return ( <div><Bar data={dataSets} options={options}/></div>  );
}
 
export default BarChart;