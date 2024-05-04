import React, { Component } from "react";
import Chart from "react-apexcharts";
import Header from './component/header';
import Menu from './component/menu';
import { BiBorderAll } from "react-icons/bi";
import { BsBorderWidth } from "react-icons/bs";

class IncomeGraph extends Component {
  constructor(props) {
    super(props);
    const  colors = ['#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03',];
    this.state = {
      series: [{
        data: [21, 22, 10, 28, 16, 21, 13, 30, 35, 65, 76, 90, 65, 43]
      }],
     
     
      options: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '90%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            ['Nov'],
            ['Dec'],
            ['Jan'],
            ['Feb'],
            ['Mar'],
            ['Apr'],
            ['May'],
            ['Jun'],
            ['Jul'],
            ['Aug'],
            ['Sep'],
            ['Oct'],
            ['Nov'],
            ['Dec']
          ],
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            }
          }
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
        <h1 className='centerGraph'>Graph</h1>
        {/*<div class="flex-container-graph boxGraph">
                    <div type='button' className='hg'>Inflation Rate</div>
                    <div type='button'className='hg'>Operating Income</div>
                    <div type='button'className='hg'>Expenses</div>
                    <div type='button'className='hg'>Net Profit</div>
                    <div type='button'className='hg'>Customer Influx</div>
                    <div type='button'className='hg'>Company Growth Rate</div>
    </div>*/}
            <div className='centerG'>
              <p className="topText">Revenue by Month</p>
             <div className="graph1">
                {/*<div className="centerGraph">
            <div className="smallBox1"> 
              <p className='graphTxt'>Operatiing Income</p>
    </div>
              </div>*/}
                <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="500"
                />
            </div>
            <p className="graphtxtt">Operating Income</p>
            <button className="btn btn-primary curveGraph dropdown-toggle" data-toggle="dropdown">See more</button>

            </div>

        </div>

          
        </div>
      </div>
    );
  }
}

export default IncomeGraph;