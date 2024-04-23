import React, { useState } from 'react';
import closeB from './closeB.png'
import { useNavigate } from 'react-router-dom';





export default function DeleteModal ({open, onClose})  {
    const [isOpen, setIsOpen]= useState(false);
    const navigate = useNavigate()
    const onClickHandler = () => navigate(`/login`)
    if(!open) return null
    return (
        <div className='modalOv' >
           <div className='modalSt'>
              <div className='aboutDelete'>
                <p className='inviteTi'>Delete/ De-activate Account</p>
              <p className='subInvite'>Are you sure you want to Delete/ De-activate your Account?</p></div>
                <div className='deleteOption'>
                <button className="btn btn-primary deleteButton" onClick={onClickHandler}>Delete Account</button>
                <button className="btn btn-primary deleteNoButton" onClick={onClose}>No</button>
                </div>
               
           </div>
           </div>          
     );
}
