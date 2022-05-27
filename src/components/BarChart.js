import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const BarChart = (rows, columns) => {
    const [option, setOption] = useState('Min');

    const handleOnChange = (event) => {
        setOption(event.target.value);
    }
    const players = [];
    const data = [];
    const headers = [];
    const dataName = option;

    for(let i=2; i < rows.columns.length; i++) {
      headers.push(rows.columns[i].accessor)
    }

    for(let i=0; i < rows.rows.length; i++) {
        players.push(rows.rows[i].Athlete);
        let cell = rows.rows[i][dataName]; 
        if(cell.endsWith('%')) {
          cell = cell.slice(0, -1);
          if(cell.includes('-')) {
            let cellArr = cell.split('-');
            data.push(cellArr[1]);
          } else {
            data.push(cell);
          }          
        } else {
          data.push(rows.rows[i][dataName]);
        }
    }
    
    const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: players
        }
      };

      const series = [
        {
          name: "series-1",
          data: data
        },
      ];

      
    

    return (
        <>
          <select onChange={handleOnChange}>
            {headers.map((header, index) => {
              return (<option key={index} value={header}>{header}</option>)
            })}
          </select>
          <Chart
              options={options}
              series={series}
              type="bar"
              width="700"
            />
            
        </>
        
    )

}

export default BarChart;