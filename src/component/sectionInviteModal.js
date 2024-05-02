import React, { useState, useEffect, useRef } from 'react';
import closeB from './closeB.png'
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';




export default function SectionInviteModal ({open, onClose})  {

      // State variables to manage dropdown behavior
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [selectedOption, setSelectedOption] = useState('');
      const dropdownRef = useRef(null);

    
      // Function to toggle dropdown visibility
      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    
      // Function to handle option selection
      const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
        
      };



           // Close dropdown when clicking outside of it 1
 useEffect(() => {
  const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
      }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);



    const [isOpen, setIsOpen]= useState(false);
    const navigate = useNavigate()

    const onClickHandler = () => navigate(``)
    if(!open) return null
    return ReactDOM.createPortal (
      <>
        <div className='modalOv' >
           <div className='modalSt1'>
               <img src={closeB} className='closeB' onClick={onClose} type='button'></img>

               <div className='titleCenter'>
              <p className='txtA'>Invite</p>
              <p className='txtB'>Manage, assign and send invites</p></div>
              <input type="text" className='input' placeholder="Search.."></input>
              <hr></hr>
              
              <div className='emailInvite1'>
                <div className='enterEmail'>
                <p className='email'>Email</p>
                <input type="text" className='enterE' placeholder="Email"></input>
                {/*<textarea className='enterE'></textarea>*/}
                </div>


              
                <div ref={dropdownRef} className="dropdown2">
                 <div className={`select2 ${isDropdownOpen ? 'select-clicked2' : ''}`} onClick={toggleDropdown}>
                  <span classname="selected">{selectedOption|| "Select project"}</span>
                    <div class="caret2"></div>
                 </div>
                 <ul className={`menu2 ${isDropdownOpen ? 'menu-open2' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Project A")}>Project A</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Project B")}>Project B</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Project C")}>Project C</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Project D")}>Project D</li>
                </ul>                                 
                
                </div>

                </div>
                {/*<button className="btn btn-primary dropdown-toggle buttonSelect" type="button" data-toggle="dropdown">Select Project</button>*/}
                <div className='shareButtonDiv'>
           <button className="btn btn-primary curveInviteA" onClick={()=>setIsOpen(true)}>Add</button>
           </div>
         
           </div>          
        </div>

        </>,
        document.getElementById('portal')

     );
}

