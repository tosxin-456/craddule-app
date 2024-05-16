import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Header from './component/header';
import Menu from './component/menu';
import API_BASE_URL from './config/apiConfig';






    class Task extends Component {
        constructor(props) {
            super(props);

          this.state = {
          
            series: [44, 55, 41],
            options: {
              chart: {
                type: 'donut',
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                }
              }]
            },
            title: {
                text: 'Task'
              },
          
          };
        }
        
      
        render() {
          return (
      
            <div className='progressGraph'>
                <div className="graphNam">Task</div>
                  <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" height={120} width={300} />
              </div>
              <div id="html-dist"></div>
                  </div>
          );
        }
      }
      


  export default Task;