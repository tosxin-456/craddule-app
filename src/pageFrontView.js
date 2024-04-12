import React from 'react';
import bci from './images/bc.png'; 
import frontView from './images/frontView.png';
import Header from './component/header';
import Menu from './component/menu';




function PageFrontView ()  {
    return (
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
    <div className='col-md-9'>
            <img src={bci} className='bcA'></img>
           <div className='div-boxA'>
                <p className='centerH'>Frontview 3D Design</p>
                <p className='centerHp'>Here you get the wireframe of your product</p>
            </div>
        <div className='centerB'>
            <div className='text-center'>
                <img src={frontView}></img>
            </div>
        </div> 
  
        <button className="btn btn-primary curveNext">Next</button>        
          
    </div>
    </div>
    </div>
       </>
    );
}

export default PageFrontView