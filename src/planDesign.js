import React from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Rect from './images/Rect.png'
import Header from './component/header';
import Menu from './component/menu';
import cloud from './images/cloud.png'
import { useNavigate } from 'react-router-dom';




function PlanDesign ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/pageBenefit`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <div className='centerC'>
            <div className='text-center'>
            <div class="flex-container boxR">
                    <div>Front View</div>
                    <div>Plan</div>
                    <div>3rd Angle Presentation</div>
                    <div>3D Model</div>
                </div> 
                <div className='design'>
                <img src={cloud} ></img>

                <div class="flex-container boxY">
                  <img src={Rect} ></img>
                  <img src={Rect} ></img>
                  <img src={Rect} ></img>
                  <img src={Rect} ></img>
                  <img src={Rect} ></img>
                </div>
                <div class="flex-container boxY">
                  <img src={Rect} ></img>
                  <img src={Rect} ></img>
                  <img src={Rect} ></img>
                  <img src={Rect} ></img>
                  <img src={Rect} ></img>
                </div>
                </div> 
                <div class="flex-container boxU">
                  <img src={Rect} ></img>                  
                </div>         
            </div>
           
        </div> 
  
        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
           
          
  </div>
  </div>
  </div>
  </>
    );
}

export default PlanDesign