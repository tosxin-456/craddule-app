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
            <div className='centerC'>
             
                <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="500"
                />
            
            </div>

            <button className="btn btn-primary curveNext">Next</button>


        </div>

          
        </div>
      </div>
    );
  }
}

export default GraphPage;