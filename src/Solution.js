import React from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 




function Solution ()  {
    return (
        <div className='col-md-10 align'>
        <div className='centerC'>
            <img src={bci} className='bcI'></img>

            <div className='text-center'>
                <p className='centerH'>Solution Description</p>
                <p className='centerHp'>Make sure you answer all questions</p>
                <img src={solution} className='bro'></img>
               
            </div>
            <p className='question'>Why do you want to start a Company?</p>
            <div className='container-textAs'>
                <textarea className='textAs'></textarea>
            </div>
            <p className='suggest'>Your answer shouldn't be about money, It should be about solving a problem</p>
        </div> 
  
        <button className="btn btn-primary curveNext">Next</button>
           
          
  </div>
    );
}

export default Solution