import React from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Rect from './images/Rect.png'
import present from './images/present.png';
import Rectan from './images/Rectan.png';
import plan from './images/plan.png';
import proto from './images/proto.png';
import imgA from './images/imgA.jpeg'
import imgB from './images/imgB.jpeg'
import imgC from './images/imgC.jpeg'
import imgD from './images/imgD.jpeg'
import imgE from './images/imgE.jpeg'
import Header from './component/header';
import Menu from './component/menu';
import cloud from './images/cloud.png'
import { useNavigate } from 'react-router-dom';




function WireFrame ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/pageFrontView`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <img src={bci} className='bcA'></img>
                <p className='centerH'>WireFrame</p>
                <p className='centerHp'>Here you get the wireframe of your product</p>
        <div className='lenght'>
            <div className='text-center'>
                <div className='container-boxkk'>
               <div type="button" className='clod'><img src={cloud} className='imgC'></img>Upload</div> 

                <div className='imgbox'>
                  <img src={proto} className='imgA' ></img>
                  <img src={plan} className='imgA' ></img>
                  <img src={imgA} className='imgA' ></img>
                  <img src={imgB} className='imgA' ></img>
                  <img src={imgC} className='imgA' ></img>
            
                  <img src={Rectan} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={imgE} className='imgA' ></img>
                  <img src={imgD} className='imgA' ></img>
                  <img src={present} className='imgA' ></img>
                  </div>
                </div> 
                <div class="container-boxj">
                  <img src={present} className='imgh'></img>    
                  <img src={plan} className='imgh'></img>   
                  <img src={proto} className='imgh'></img> 
                  <img src={present} className='imgh'></img> 
                  <img src={plan} className='imgh'></img> 
                  <img src={proto} className='imgh'></img>              
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

export default WireFrame