import React, { Component } from "react";
import Chart from "react-apexcharts";
import Header from './component/header';
import ReactApexChart from 'react-apexcharts';
import Menu from './component/menu';
import { BiBorderAll } from "react-icons/bi";
import { BsBorderWidth } from "react-icons/bs";

class ExpensesGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [44, 55, 13, 43, 22],
          options: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
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
              <p className="topText">Expenses</p>
             <div className="graph1">
             <div>
              <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />
              </div>
              <div id="html-dist"></div>
            </div>
            </div>
           
            </div>

        </div>

          
        </div>
      </div>
    );
  }
}

export default ExpensesGraph;