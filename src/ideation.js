import React, { useEffect, useState } from 'react';
import bci from './images/bc.png'; 
import implan from './images/implan.png'; 
import Header from './component/header';
import Menu from './component/menu';
import {API_BASE_URL} from './config/apiConfig';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import WOW from 'wowjs';



function Implementation ()  {
    const navigate = useNavigate()
    
      useEffect(() => {
        const wow = new WOW.WOW();
        wow.init();
      }, []);

    const [showFirstText, setShowFirstText] = useState(false);
    const [showSecondText, setShowSecondText] = useState(false);

    // useEffect(() => {
    //     setShowFirstText(true);
    
    //     const timer1 = setTimeout(() => {
    //       setShowSecondText(true);
    //     }, 3000); // Delay for the second text to appear
    
    //     const timer2 = setTimeout(() => {
    //       //onClose();
    //     }, 7000); // Dismiss the popup after 7 seconds
    
    //     return () => {
    //       clearTimeout(timer1);
    //       clearTimeout(timer2);
    //     };
    //   }, []);
    return (
        <>

        <div className='idea'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'>
                 
                  <div className="ideaC wow fadeInUp">
                    <p className='beginTxt'>When we begin, we begin with one step, but is that not the point?</p>
                    <p className='beginTxt'> As a journey of a thousand miles starts with one </p>
                    <p className='beginTxt' style={{paddingBottom:20}}>Welcome to your journey.</p>
                    <span className='begin'>Begin</span>
                  </div>
                </div>
            </div>
        </div>
        </div>
             {/* <div className="popup-container">
      <div className={`text-container ${showFirstText ? 'fade-in' : ''} ${showSecondText ? 'move-up' : ''}`}>
        <h1>Ideation</h1>
      </div>
      {showSecondText && (
        <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                  <div className="text-container fade-in">
                    <p className='text-center beginTxt'>When we begin, we begin with one step, but is that not the point?</p>
                    <p className='text-center beginTxt'> As a journey of a thousand miles starts with one </p>
                    <p className='text-center beginTxt' style={{paddingBottom:20}}>Welcome to your journey.</p>
                    <span className='begin'>Begin</span>
                  </div>
                </div>
            </div>
        </div>
       
        </div>
      )}
    </div> */}
  </>
    );
}

export default Implementation