import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jwtDecode } from "jwt-decode";
import {API_BASE_URL} from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideMenu2P from './component/sideMenu2P';
import circle from './images/circle.png';
import home from './images/HOME.png';

const PitchDeck = () => {
  const navigate = useNavigate()
 
  const projectId = localStorage.getItem('nProject');
  const prototypeType = localStorage.getItem('selectedPrototype');

 const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);
   const userId = decodedToken.userId;

   const handleClickUp = () => {
    navigate('/pitchDeckUpload');
  };

  const handleClickVi = () => {
    navigate('/pitchDeckView');
  };

  return (
    <>
    <div className='container relative'>
        <div className="absolute inset-0 mt-[60px] ml-[-20px] z-[-100] bg-no-repeat bg-cover w-[200px] h-[200px]" style={{ backgroundImage: `url(${circle})` }}></div>
        <div className=" mr-auto mt-[50px] ">
          <div className="flex justify-between items-center w-[100%] mt[30px] ">
            <div className="w-fit">
              <button onClick={() => navigate(-1)} className='bg-[#193FAE] px-[30px] py-[5px] text-white rounded-3xl'>
                Back
              </button>
            </div>
            <div>
              <img src={home} alt="Home Icon" />
            </div>
          </div>
        </div>

        <div className='coverPit'>
          <div className='row'>
            <div className='col-md-12 '>
              <p className='ppit '>Pitch Deck Resources</p>
              <div className='caseBAVie text-white bg-[#1B45BF]' onClick={() => window.open('https://elements.envato.com/presentation-templates/pitch/compatible-with-powerpoint?cl_sub=1&cl_cta=ppt', '_blank')}>
                  <p className='conCa'>View PitchDeck Samples</p>
                  <p className='conCa2' style={{fontSize: "17px"}}>Here you can find 18,199 PowerPoint templates and themes. Take a look at the entire library. Make your presentations look the best!</p>
                <button className=' caseBA3PV submit-button rounded-3xl '>View samples</button>
                </div>
            </div>

           
          </div>
        
        </div>

       
         
  
    
    </div>
    </>
  );
};

export default PitchDeck;
