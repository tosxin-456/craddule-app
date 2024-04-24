import React, { useState } from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';




function ViewDocument ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/viewSheetModal`)
    return (        
        <>
         <div className='container-fluid'>
    <Header />
        
        <div className='container col-sm-7'>
        <div className='centerC'>
            <div className='text-center'>
                <p className='centerH'>View Document</p>
                <p className='centerHp'>Here you can view shared document</p>               
            </div>
            <div className='BoxPhase1'>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Ideation</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'onClick={onClickHandler}>Product Definition</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Prototype</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Initial Design</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Validating and Testing</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Commercialization</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            </div>
        </div> 
  
        
           
          
  </div>
    </div>
  </>
    );
}

export default ViewDocument
