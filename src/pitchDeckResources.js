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
    <div className='container'>
    
    
        <div className='coverPit'>
          <div className='row'>
            <div className='col-md-12'>
              <p className='ppit'>Pitch Deck Resources</p>
              <div className='caseBAVie' style={{color:"#101010"}} onClick={() => window.open('https://elements.envato.com/presentation-templates/pitch/compatible-with-powerpoint?cl_sub=1&cl_cta=ppt', '_blank')}>
                  <p className='conCa'>View PitchDeck Samples</p>
                  <p className='conCa2' style={{fontSize: "17px"}}>Here you can find 18,199 PowerPoint templates and themes. Take a look at the entire library. Make your presentations look the best!</p>
                  <p className="caseBA3PV">View samples</p>
                </div>
            </div>

           
          </div>
        
        </div>

       
         
  
    
    </div>
    </>
  );
};

export default PitchDeck;
