import React, { useState } from 'react';
import cloud from './cloud.png'; 
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';




export default function UploadLogoModal ( {open, onClose})  {
   const [isOpen, setIsOpen]= useState(false);
   const navigate = useNavigate()
   const onClickHandler = () => navigate(`/pageFrontView`)
   if(!open) return null
   return ReactDOM.createPortal (
      <>
        <div className='modalOv' >
           <div className='modalSt'>
                <p className='closeIcon' type='button' onClick={onClose} >X</p>
              <p className='txt2'>Upload Brand Logo</p>
              <hr></hr>
              <div className='uploadLogo'>
              <img src={cloud} className='logoIcon'></img>
                <p className='txt'>Drag and drop your Image here</p>
                <p className='txt1'>Maximum 50MB file size</p>
                <p className='txt1'>JPG, PNG, or GIF format</p>
                <button className="btn btn-primary curveLogo" onClick={onClose}>Upload image</button>
           </div>
           </div>          
        </div>
        </>,
        document.getElementById('portal')
     );
}