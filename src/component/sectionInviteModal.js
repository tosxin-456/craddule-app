import React, { useState } from 'react';
import closeB from './closeB.png'
import { useNavigate } from 'react-router-dom';




export default function SectionInviteModal ({open, onClose})  {
    const [isOpen, setIsOpen]= useState(false);
    const navigate = useNavigate()

    const onClickHandler = () => navigate(``)
    if(!open) return null
    return (
        <div className='modalOv' >
           <div className='modalSt'>
               <img src={closeB} className='closeB' onClick={onClose}></img>
               <br></br>
              <p className='txtA'>Invite</p>
              <p className='txtB'>Manage, assign and send invites</p>
              <input type="text" className='input' placeholder="Search.."></input>
              <hr></hr>
              <div className='emailInvite'>
                <p className='email'>Email</p>
                <textarea className='enterE'></textarea>
                <button className="btn btn-primary dropdown-toggle buttonSelect" type="button" data-toggle="dropdown">Select Project</button>
                <br></br>
                <button className="btn btn-primary curveInvite">Invite</button>
           </div>
           </div>          
        </div>
     );
}

