import React, { useState } from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';
import ShareModal from './component/shareModal';




function ViewDocument ()  {
    const [isOpen, setIsOpen]= useState(false);
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
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Product Definition</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Prototype</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Initial Design</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Validating and Testing</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Commercialization</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={()=>setIsOpen(true)}>View</button>
                </div>
                
            </div>
            <ShareModal open={isOpen} onClose={() => setIsOpen(false)}>

            </ShareModal>
            </div>
        </div> 
  
        
           
          
  </div>
    </div>
  </>
    );
}

export default ViewDocument
