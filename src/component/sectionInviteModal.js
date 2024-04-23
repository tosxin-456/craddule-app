import React, { useState } from 'react';
import closeB from './closeB.png'
import { useNavigate } from 'react-router-dom';




export default function SectionInviteModal ({open, onClose})  {

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

    const onClickHandler = () => navigate(``)
    if(!open) return null
    return (
        <div className='modalOv' >
           <div className='modalSt1'>
               <img src={closeB} className='closeB' onClick={onClose}></img>

               <div className='titleCenter'>
              <p className='txtA'>Invite</p>
              <p className='txtB'>Manage, assign and send invites</p></div>
              <input type="text" className='input' placeholder="Search.."></input>
              <hr></hr>
              
              <div className='emailInvite1'>
                <p className='email'>Email</p>
                <input type="text" className='enterE' placeholder="Email"></input>
                {/*<textarea className='enterE'></textarea>*/}

                <div className="dropdown2">
                 <div className={`select2 ${isDropdownOpen ? 'select-clicked2' : ''}`} onClick={toggleDropdown}>
                  <span classname="selected">Select project</span>
                    <div class="caret2"></div>
                 </div>
                 <ul className={`menu2 ${isDropdownOpen ? 'menu-open2' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Project A</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Project B</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Project C</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Project D</li>
                </ul>                                 
                </div>


                {/*<button className="btn btn-primary dropdown-toggle buttonSelect" type="button" data-toggle="dropdown">Select Project</button>*/}
                <br></br>
                <button className="btn btn-primary curveInvite">Invite</button>
           </div>
           </div>          
        </div>
     );
}

