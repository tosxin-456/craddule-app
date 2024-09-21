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
import ModalVideo from './component/modalVideoAny';

const PitchDeck = () => {
  const navigate = useNavigate()
 
  const projectId = localStorage.getItem('nProject');
  const prototypeType = localStorage.getItem('selectedPrototype');

 const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);
   const userId = decodedToken.userId;
   const [isOpen, setIsOpen]= useState(false);
   const [activeLink, setActiveLink] = useState("");

   const handleClickUp = () => {
    navigate('/pitchDeckUpload');
  };

  const handleClickVi = () => {
    navigate('/pitchDeckView');
  };

  const handleYoutube = (url) => {
    const link = url.replace('https://youtu.be/', '');
    setActiveLink(link); 
    setIsOpen(true);
  };

  return (
    <>
    <div className='container'>
    
    
        <div className='coverPit'>
          <div className='row'>
          <p className='ppit'>Pitch Deck Lectures</p>
            <div className='col-md-4'>
            <div className='caseBAVie' style={{color:"#101010"}}  onClick={() => handleYoutube('https://youtu.be/p8_mBNyLHVA?si=GMwBp5vT-mgWZ90Z')}>
                  <p className='conCa'>How To Write an Elevator Pitch</p>
                  <div style={{height: "130px"}}>
                  <p className='conCa2' style={{fontSize: "17px"}}>In this 2-minute video tutorial Mat Shore shares his tips on how to write an Elevator Pitch that will sell your idea in 20 seconds.</p>
                  </div>
                  <p className="caseBA3PV">Watch Video</p>
                </div>

            </div>

            <div className='col-md-4'>
            <div className='caseBAVie' style={{color:"#101010"}}  onClick={() => handleYoutube('https://youtu.be/PgbjBI8RpkU?si=jDbwVZHxw2qe2dxb')}>
                  <p className='conCa'>How to pitch your business</p>
                  <div style={{height: "130px"}}>
                  <p className='conCa2' style={{fontSize: "17px"}}>Learn the things needed to say, do and know whne it is time to get more investors into the fold</p>
                  </div>
                  <p className="caseBA3PV">Watch Video</p>
                </div>

            </div>

            <div className='col-md-4'>
            <div className='caseBAVie' style={{color:"#101010"}}  onClick={() => handleYoutube('https://youtu.be/r-iETptU7JY?si=BV--q-KvjMHC4b1p')}>
                  <p className='conCa'>The Perfect Elevator Pitch</p>
                  <div style={{height: "130px"}}>
                  <p className='conCa2' style={{fontSize: "17px"}}>Learn how to craft the perfect elevator pitch</p>
                  </div>
                  <p className="caseBA3PV">Watch Video</p>
                </div>

            </div>

            
          </div>
        
        </div>

       
        <ModalVideo open={isOpen} onClose={() => setIsOpen(false)}  link={activeLink}>

</ModalVideo>
  
    
    </div>
    </>
  );
};

export default PitchDeck;
