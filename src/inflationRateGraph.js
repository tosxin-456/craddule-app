import React, { Component } from "react";
import Chart from "react-apexcharts";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Header from './component/header';
import Menu from './component/menu';






class InflationRateGraph extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
          chart: {
            height: 150,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: '',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          }
        },
      
      
      };
    }

  

    render() {
      return (

        <div className="container-fluid">
        <Header />
       <div className="row">
       <Menu />    

       <div className='col-md-9'>
       <div className='centerG'>
             <div className="graph1">
        <div>
          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
          </div>
          <div id="html-dist"></div>
        </div>

        </div>
        <p className="graphtxtt">Inflation Rate Graph</p>
        </div>
</div> 
</div>
</div>
      );
    }
  }



  export default InflationRateGraph;