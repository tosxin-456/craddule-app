import React from 'react';
import bci from './images/bc.png'; 
import graph from './images/graph.png'; 




function Sectiondcf3 ()  {
    return (
        <div className='col-md-10 align'>
             <img src={bci} className='bcA'></img>
        <div className='centerC'>
            <div className='text-center'>
                <p className='tittle'>Discounted Cash Flow</p>
                {/*<div class = "dcfspacebottom"></div>
                <p className='titledcf'>Make sure you answer all questions</p>*/}
                <div class = "dcfspace"></div>
                <img src={graph} className='graph'></img> 
            </div>
            <div class = "dcfspacebottom"></div>
        </div> 
        <button className="btn btn-primary curveNext">Next</button>
  </div>
    );
}

export default Sectiondcf3