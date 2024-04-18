import React from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';




function PageShare ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/introduction1`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <img src={bci} className='bcA'></img>
        <div className='centerC'>
            <div className='text-center'>
                <p className='centerH'>Share</p>
                <p className='centerHp'>Here you can share your work</p>               
            </div>
            <div className='BoxPhase1'>
            <p className='centerH1v'>Phase</p>
            <div className='BoxPhase'>
                <p className='heading'> Ideation</p>
                <p className='subHeading'>12pages</p>
                <button className="btn btn-primary curveP">Share</button>
            </div>
            <div className='BoxPhase'>
                <p className='heading'>Product Definition</p>
                <p className='subHeading'>12pages</p>
                <button className="btn btn-primary curveP">Share</button>
            </div>
            <div className='BoxPhase'>
                <p className='heading'>Prototype</p>
                <p className='subHeading'>12pages</p>
                <button className="btn btn-primary curveP">Share</button>
            </div>
            <div className='BoxPhase'>
                <p className='heading'>Initial Design</p>
                <p className='subHeading'>12pages</p>
                <button className="btn btn-primary curveP">Share</button>
            </div>
            <div className='BoxPhase'>
                <p className='heading'>Validation and texting</p>
                <p className='subHeading'>12pages</p>
                <button className="btn btn-primary curveP">Share</button>
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

export default PageShare