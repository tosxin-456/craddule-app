import React, { Component } from "react";
import Chart from "react-apexcharts";
import Header from './component/header';
import Menu from './component/menu';
import { BiBorderAll } from "react-icons/bi";
import { BsBorderWidth } from "react-icons/bs";

class GraphPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
          stroke :{
              width: 10,
          }
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
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
              <div className="centerGraph">
              <div className="smallBox1"> 
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
            <p className="graphtxtt">Customer Influx</p>
            <button className="btn btn-primary curveGraph dropdown-toggle" data-toggle="dropdown">See more</button>

            </div>

        </div>

          
        </div>
      </div>
    );
  }
}

export default GraphPage;