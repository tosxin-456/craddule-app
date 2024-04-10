import React from 'react';
import bci from './images/bc.png'; 
import dcf from './images/dcf.png'; 
import Header from './component/header';
import Menu from './component/menu';




function Sectiondcf ()  {
    return (
        <>

        <Header />
        <Menu />
        
        <div className='col-md-10 align'>
             <img src={bci} className='bcA'></img>
        <div className='centerC'>
            <div className='text-center'>
                <p className='tittle'>Welcome to Discounted Cash Flow (DCF) </p>
                <div class = "dcfspace"></div>
                <img src={dcf} className='dcfbro'></img> 
            </div>
            <div class = "dcfspacebottom"></div>
            <button className="btn btn-primary curvedcf">Begin</button>
            <div class = "dcfspacebottom"></div>
        </div> 
  </div>
  </>
    );
}

export default Sectiondcf