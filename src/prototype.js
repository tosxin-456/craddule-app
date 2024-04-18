import React from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Rect from './images/Rect.png'
import Header from './component/header';
import proto from './images/proto.png';
import Menu from './component/menu';
import cloud from './images/cloud.png'
import { useNavigate } from 'react-router-dom';




function Prototype ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/pageBenefit`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <img src={bci} className='bcA'></img>
                <p className='centerH'>prototype</p>
                <p className='centerHp'>Here you get the wireframe of your product</p>
        <div className='lenght'>
            <div className='text-center'>
                <div className='container-boxkk'>
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
                  <img src={proto} className='imgB'></img>                  
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

export default Prototype