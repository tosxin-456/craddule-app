import React, { Component } from "react";
import Chart from "react-apexcharts";
import Header from './component/header';
import Menu from './component/menu';
import { BiBorderAll } from "react-icons/bi";
import { BsBorderWidth } from "react-icons/bs";

class   NetGraph extends Component {
  constructor(props) {
    super(props);
    const  colors = ['#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03','#5f4e03'];
    this.state = {
      series: [{
        data: [21, 22, 10, 28, 16, 21, 13, 30,21, 22, 10, 28, 16, 21]
      },
      {
        data: [21, 22, 10, 28, 16, 21, 13, 30,21, 22, 10, 28, 16, 21]
      }
    ],
     
     
      options: {
        chart: {
          height: 350,
          type: 'bar',
          stacked:true,
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
        <div class="flex-container-graph boxGraph">
                    <div type='button' className='hg'>Inflation Rate</div>
                    <div type='button'className='hg'>Operating Income</div>
                    <div type='button'className='hg'>Expenses</div>
                    <div type='button'className='hg'>Net Profit</div>
                    <div type='button'className='hg'>Customer Influx</div>
                    <div type='button'className='hg'>Company Growth Rate</div>
                </div>
            <div className='centerG'>
              <p className="topText">Net Profit (or Loss) per year</p>
             <div className="graph1">
              <div className="container-centerGraph">
              <div className="smallBox1"> 
              <p className='graphTxt'>Customer</p>
              </div>
              <div className="smallBox2"> 
              <p className='graphTxt'>Customer</p>
              </div>             
    </div>
                <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="500"
                />
            </div>
            <p className="graphtxtt">Projected Profit and Loss</p>
            <button className="btn btn-primary curveGraph dropdown-toggle" data-toggle="dropdown">See more</button>

            </div>

        </div>

          
        </div>
      </div>
    );
  }
}

export default NetGraph;