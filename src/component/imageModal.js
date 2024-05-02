import React, { useState } from 'react';
import cloud from './cloud.png'; 
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';




export default function ImageModal ( {open, onClose})  {
   const [isOpen, setIsOpen]= useState(false);
   const navigate = useNavigate()
   const onClickHandler = () => navigate(`/pageFrontView`)
   if(!open) return null
   return ReactDOM.createPortal (
      <>
        <div className='modalOv' >
           <div className='modalSt2'>
                <p className='closeIcon' type='button' onClick={onClose} >X</p>
              <p className='txt2a'>Upload Profile Image</p>
              <hr></hr>
              <div className='uploadImage'>
              <img src={cloud} className='logoIcon'></img>
                <p className='txtC'>Drag and drop your Image here</p>
                <p className='txt1'>Maximum 50MB file size <br></br>JPG, PNG, or GIF format</p>                
           </div>
           <div className='shareImageDiv'>
           <button className="btn btn-primary curveImage" onClick={onClose}>Choose from files</button>
           </div>
           </div>          
        </div>
        </>,
        document.getElementById('portal')
     );
}