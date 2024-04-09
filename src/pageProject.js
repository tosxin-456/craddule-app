import React from 'react';
import bci from './images/bc.png'; 
import project from './images/project.png'; 




function PageProject ()  {
    return (
        <div className='col-md-10 align'>
             <img src={bci} className='bcA'></img>
        <div className='centerC'>

            <div className='text-center'>
                <p className='centerH'>Project Objective</p>
                <p className='centerHp'>Make sure you answer all questions</p>
                <img src={project} className='bro'></img>
               
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

export default PageProject