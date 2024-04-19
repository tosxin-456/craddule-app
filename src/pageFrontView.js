import React from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Rect from './images/Rect.png'
import Header from './component/header';
import Rectan from './images/Rectan.png';
import Menu from './component/menu';
import cloud from './images/cloud.png'
import { useNavigate } from 'react-router-dom';




function PageFrontView ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/planDesign`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <img src={bci} className='bcA'></img>
                <p className='centerH'>Frontview 3D Design</p>
                <p className='centerHp'>Here you get the wireframe of your product</p>
        <div className='lenght'>
            <div className='text-center'>
            <div class="flex-container boxR">
                    <div type='button' className='hdd'>Front View</div>
                    <div type='button'className='hd'>Plan</div>
                    <div type='button'className='hd'>3rd Angle Presentation</div>
                    <div type='button'className='hd'>3D Model</div>
                </div> 
                <div className='container-boxk'>
               <div type="button" className='clod'><img src={cloud} className='imgC'></img>Upload</div> 

                <div className='imgbox'>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
            
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  </div>
                </div> 
                <div class="container-boxy">
                  <img src={Rectan} className='imgB'></img>                  
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

export default PageFrontView