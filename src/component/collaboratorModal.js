import React, { useState } from 'react';
import ReactDOM from "react-dom";
import closeB from './closeB.png';
import { useNavigate } from 'react-router-dom';






export default function CollaboratorModal ({open, onClose})  {
    const [isOpen, setIsOpen]= useState(false);
    const navigate = useNavigate()
  
    const onClickHandler = () => navigate(`/shareFile`)
   if(!open) return null
    return ReactDOM.createPortal (
        <>
        <div className='col-md-5' >
           <div className='inviteBox'>
               <img src={closeB} className='closeB'></img>
               <br></br>
              <p className='txtA'>Team Management</p>
              <p className='txtB'>Manage, assign and send invites</p>
              <input type="text" className='input' placeholder="Search.."></input>
              <hr></hr>
              <div className='emailInvite'>
                <p className='txtS'>Add Collaborator</p>
                <button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">Select Project</button>
                <button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">Select Project</button>
                <button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">Select Project</button>
                <button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">Select Project</button>
                <br></br>
                <button className="btn btn-primary curveInvite">Add</button>
           </div>
           </div>          
        </div>
        </>,
                 document.getElementById('portal')

     );
}

