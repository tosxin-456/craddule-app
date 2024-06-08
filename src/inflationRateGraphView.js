import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Header from './component/header';
import Menu from './component/menu';
import API_BASE_URL from './config/apiConfig';

import { useNavigate,Link } from 'react-router-dom';



function InflationRateGraph({projectId, graphType }) {

  
    

    const [graphData, setGraphData] = useState([]);
    const [selectedGraphData, setSelectedGraphData] = useState(null);
    const [selectedGraphId, setSelectedGraphId] = useState('');
    
    const [deviceType, setDeviceType] = useState('desktop');

// Function to update deviceType state based on window width
const updateDeviceType = () => {
    if (window.innerWidth < 768) {
        setDeviceType('mobile');
    } else if (window.innerWidth < 1024) {
        setDeviceType('tablet');
    } else {
        setDeviceType('desktop');
    }
};
// Effect to update isMobile state on window resize
useEffect(() => {
  updateDeviceType();
  window.addEventListener('resize', updateDeviceType);
  return () => window.removeEventListener('resize', updateDeviceType);
}, []);


    useEffect(() => {
        const projectId = localStorage.getItem('nProject');
    const graphType = "Inflation";
        const fetchData = async () => {
            try {
                // Fetch graph data based on projectId and graphType
                const response = await fetch(API_BASE_URL + `/api/graph?projectId=${projectId}&graphType=${graphType}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch graph data');
                }
                
                const data = await response.json();
                console.log(data);
                console.log(data._id);
                setGraphData(data);

                // Set the first graph name's data as selectedGraphData initially
                if (data.length > 0) {
                    setSelectedGraphData(data[0]);
                    setSelectedGraphId(data[0]._id);
                }
            } catch (error) {
                console.error('Error fetching graph data:', error);
                // Handle error, e.g., show error message to user
            }
        };

        fetchData();
    }, [projectId, graphType]);

  

  

  

 
      return (

        <div className="container-fluid">
        <Header />
       <div className="row">
       <Menu />    

       <div className='col-md-9'>
        
       <div className='centerG'>
        <div className="row">
            <div className="col-md-6">
                <p style={{fontWeight:700}}>Inflation</p>
            </div>

            <div className="col-md-6">
                <button className="btn mainBtn">Create</button>
            </div>
        </div>
       <table class="table">
      <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">BY</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>1</td>
            <td>Inflation</td>
            <td>Otto Mak</td>
            <td>30th June 2024</td>
            <td>
                <button className="btn mainBtnEdit">Edit</button>
                <button className="btn mainBtnDelete">Delete</button>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Inflation</td>
            <td>Otto Mak</td>
            <td>30th June 2024</td>
            <td>
                <button className="btn mainBtnEdit">Edit</button>
                <button className="btn mainBtnDelete">Delete</button>
            </td>
        </tr>

        <tr>
            <td>1</td>
            <td>Inflation</td>
            <td>Otto Mak</td>
            <td>30th June 2024</td>
            <td>
                <button className="btn mainBtnEdit">Edit</button>
                <button className="btn mainBtnDelete">Delete</button>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Inflation</td>
            <td>Otto Mak</td>
            <td>30th June 2024</td>
            <td>
                <button className="btn mainBtnEdit">Edit</button>
                <button className="btn mainBtnDelete">Delete</button>
            </td>
        </tr>

        <tr>
            <td>1</td>
            <td>Inflation</td>
            <td>Otto Mak</td>
            <td>30th June 2024</td>
            <td>
                <button className="btn mainBtnEdit">Edit</button>
                <button className="btn mainBtnDelete">Delete</button>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Inflation</td>
            <td>Otto Mak</td>
            <td>30th June 2024</td>
            <td>
                <button className="btn mainBtnEdit">Edit</button>
                <button className="btn mainBtnDelete">Delete</button>
            </td>
        </tr>

        <tr>
            <td>1</td>
            <td>Inflation</td>
            <td>Otto Mak</td>
            <td>30th June 2024</td>
            <td>
                <button className="btn mainBtnEdit">Edit</button>
                <button className="btn mainBtnDelete">Delete</button>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Inflation</td>
            <td>Otto Mak</td>
            <td>30th June 2024</td>
            <td>
                <button className="btn mainBtnEdit">Edit</button>
                <button className="btn mainBtnDelete">Delete</button>
            </td>
        </tr>
      </tbody>
    </table>
       
       </div>
</div> 
</div>
</div>
      );
    }




  export default InflationRateGraph;
