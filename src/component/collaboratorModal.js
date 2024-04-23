import React, { useState } from 'react';
import ReactDOM from "react-dom";
import closeB from './closeB.png';
import SectionInviteModal from './sectionInviteModal';
import { useNavigate } from 'react-router-dom';






export default function CollaboratorModal ({open, onClose})  {
       // State variables to manage dropdown behavior
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    
  };
    const [isOpen, setIsOpen]= useState(false);
    const navigate = useNavigate()
  
    const onClickHandler = () => navigate(`/shareFile`)
   if(!open) return null
    return ReactDOM.createPortal (
        <>
        <div className='modalOv' >
           <div className='modalSt1'>
               <img src={closeB} className='closeB' type='button' onClick={onClose}></img>
        
               <div className='titleCenter'><p className='txtA'>Team Management</p>
              <p className='txtB'>Manage, assign and send invites</p></div>
              <input type="text" className='input' placeholder="Search.."></input>
              <hr></hr>
              <p className='txtS'>Add Collaborator</p>
              <div className='emailInvite'>
                <div className="dropdown1">
                 <div className={`select1 ${isDropdownOpen ? 'select-clicked1' : ''}`} onClick={toggleDropdown}>
                  <span classname="selected">Name</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1 ${isDropdownOpen ? 'menu-open1' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Jide Arowolo</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Jide Arowolo</li>
                </ul>                                 
                </div>
                <div className="dropdown1">
                 <div className={`select1 ${isDropdownOpen ? 'select-clicked1' : ''}`} onClick={toggleDropdown}>
                  <span classname="selected">Select Task</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1 ${isDropdownOpen ? 'menu-open1' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>UI</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>UX</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Development</li>
                </ul>                                 
                </div>
                <div className="dropdown1">
                 <div className={`select1 ${isDropdownOpen ? 'select-clicked1' : ''}`} onClick={toggleDropdown}>
                  <span classname="selected">Start Date</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1 ${isDropdownOpen ? 'menu-open1' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Jide Arowolo</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Jide Arowolo</li>
                </ul>                                 
                </div>
                <div className="dropdown1">
                 <div className={`select1 ${isDropdownOpen ? 'select-clicked1' : ''}`} onClick={toggleDropdown}>
                  <span classname="selected">End Date</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1 ${isDropdownOpen ? 'menu-open1' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Jide Arowolo</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Jide Arowolo</li>
                </ul>                                 
                </div>
                {/*<button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">Name</button>
                <button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">Select Task</button>
                <button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">Start Date</button>
               <button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">End Date</button>*/}
           </div>
           <button className="btn btn-primary curveInvite" onClick={()=>setIsOpen(true)}>Add</button>

           </div>       
           <SectionInviteModal open={isOpen} onClose={() => setIsOpen(false)}>

            </SectionInviteModal>   
        </div>
        </>,
            document.getElementById('portal')

     );
}

{/*<div className="dropdown">
                <div className={`select ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">Select from team member</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Jide Arowolo</li>
                </ul>
</div>*/}