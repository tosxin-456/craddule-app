import React from 'react';
import bci from './images/bc.png'; 
import dcf1 from './images/dcf1.png'; 




function SectiondcfTwo ()  {
    return (
        <div className='col-md-10 align'>
             <img src={bci} className='bcA'></img>
        <div className='centerC'>
            <div className='text-center'>
                <p className='tittle'>Welcome Back to Discounted Cash Flow (DCF) </p>
                <div class = "dcfspace"></div>
                <img src={dcf1} className='dcfbro'></img> 
            </div>
            <div class = "dcfspacebottom"></div>
            <button className="btn btn-primary curvedcf">Continue</button>
            <div class = "dcfspacebottom"></div>
        </div> 
  </div>
    );
}

export default SectiondcfTwo