import React, { useState } from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';
import ShareModal from './component/shareModal';




function PageShare ()  {
    const [isOpen, setIsOpen]= useState(false);
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
       {/* <img src={bci} className='bcA'></img>*/}
        <div className='centerC'>
            <div className='text-center'>
                <p className='centerH'>Share</p>
                <p className='centerHp'>Here you can share your work</p>               
            </div>
            <div className='BoxPhase1'>
            <p className='centerH1v'>Phase</p>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Ideation</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>Share</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Product Definition</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>Share</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Prototypiing</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>Share</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Initial Design</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>Share</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Validating and Testing</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>Share</button>
                </div>
                
            </div>
            
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Commercialization</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>Share</button>
                </div>
                
            </div>
            <ShareModal open={isOpen} onClose={() => setIsOpen(false)}>

            </ShareModal>
            </div>
        </div> 
  
        
           
          
  </div>
  </div>
  </div>
  </>
    );
}

export default PageShare
