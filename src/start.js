import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Header from './component/header';
import Menu from './component/menu';
import API_BASE_URL from './config/apiConfig';
import proto from './images/proto.webp'
import { useNavigate,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import SideMenu from "./component/sideMenu";
import SideMenu2 from './component/sideMenu2';


function InflationRateGraph({projectId, graphType }) {

  
    

    const [graphData, setGraphData] = useState([]);
    const [selectedGraphData, setSelectedGraphData] = useState(null);
    const [selectedGraphId, setSelectedGraphId] = useState('');
    
    const [deviceType, setDeviceType] = useState('desktop');



    const navigate = useNavigate();

  const handleClickB = () => {
    localStorage.setItem('selectedCase', 'BusinessCaseBuilder');
    navigate('/questionBusIntro');
  };

  const handleClickP = () => {
    localStorage.setItem('selectedCase', 'Prototype');
    navigate('/prototype');
  };
  

 
      return (

       
       
      

       <div className=''>
        <Header />
        <div className='container'>
            <div className="row">
                <div className="col-md-3">
                    <div className="caseBA" onClick={handleClickB}>
                        <p className="caseBAPV">View</p>
                        <p className="caseBAP">Ideation</p>
                        <p className="caseBAP2">Create your Idea from start to finish</p>
                        <p className="caseBAP3">10:20pm 10.10.2022</p>
                        <p className="caseBAP2">5 Documents</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="caseBA2">
                        <p className="caseBA2PV">View</p>
                        <p className="caseBA2P">Product Definition</p>
                        <p className="caseBA2P2">Design your business processes and flow</p>
                        <p className="caseBA2P3">10:20pm 10.10.2022</p>
                        <p className="caseBA2P2">5 Documents</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="caseBA3" onClick={handleClickP}>
                        <p className="caseBA3PV">View</p>
                        <p className="caseBA3P">Prototyping</p>
                        <p className="caseBA3P2">Create Your prototypes and wireframes for your Business</p>
                        <p className="caseBA3P3">10:20pm 10.10.2022</p>
                        <p className="caseBA3P2">5 Documents</p>
                    </div>
                </div>


                <div className="col-md-3">
                    <div className="caseBA4">
                        
                        <p className="caseBA4P">ScrapBook</p>
                        <p className="caseBA4P2">Create Notes that you can look back at later</p>

                        <button className="lookF">Have a Feel</button>

                    </div>
                </div>



               
               

                <div className="col-md-3">
                    <div className="caseBA3">
                        <p className="caseBA3PV">View</p>
                        <p className="caseBA3P">Initial Design</p>
                        <p className="caseBA3P2">Plan design and add memebers to Team</p>
                        <p className="caseBA3P3">10:20pm 10.10.2022</p>
                        <p className="caseBA3P2">5 Documents</p>
                        <div style={{paddingBottom:10}}></div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="caseBA">
                        <p className="caseBAPV">View</p>
                        <p className="caseBAP">Validating and Testing</p>
                        <p className="caseBAP2">Test and validate your prodduct</p>
                        <p className="caseBAP3">10:20pm 10.10.2022</p>
                        <p className="caseBAP2">5 Documents</p>
                    </div>
                </div>


                <div className="col-md-3">
                    <div className="caseBA2">
                        <p className="caseBA2PV">View</p>
                        <p className="caseBA2P">Commercialization</p>
                        <p className="caseBA2P2">Get your product ready to launch for production</p>
                        <p className="caseBA2P3">10:20pm 10.10.2022</p>
                        <p className="caseBA2P2">5 Documents</p>
                        <div style={{paddingBottom:10}}></div>
                    </div>
                </div>
                
                <div className="col-md-3">
                    <div className="caseBA3">
                        <p className="caseBA3PV">View</p>
                        <p className="caseBA3P">Pitch Deck</p>
                        <p className="caseBA3P2">Store Pitch Decks and have access to resources</p>
                        <p className="caseBA3P3">10:20pm 10.10.2022</p>
                        <p className="caseBA3P2">5 Documents</p>
                        <div style={{paddingBottom:10}}></div>
                    </div>
                </div>

                
            </div>
        </div>
         
</div> 

      );
    }




  export default InflationRateGraph;
