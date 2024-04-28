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


  //Second Dropdown

        // State variables to manage dropdown behavior
        const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
        const [selectedOption1, setSelectedOption1] = useState('');
      
        // Function to toggle dropdown visibility
        const toggleDropdown1 = () => {
          setIsDropdownOpen1(!isDropdownOpen1);
        };
      
        // Function to handle option selection
        const handleOptionSelect1 = (option) => {
          setSelectedOption1(option);
          setIsDropdownOpen1(false);
          
        };


      //Third Dropdown

        // State variables to manage dropdown behavior
        const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
        const [selectedOption2, setSelectedOption2] = useState('');
      
        // Function to toggle dropdown visibility
        const toggleDropdown2 = () => {
          setIsDropdownOpen2(!isDropdownOpen2);
        };
      
        // Function to handle option selection
        const handleOptionSelect2 = (option) => {
          setSelectedOption2(option);
          setIsDropdownOpen2(false);
          
        };

        //Fourth Dropdown

        // State variables to manage dropdown behavior
        const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
        const [selectedOption3, setSelectedOption3] = useState('');
      
        // Function to toggle dropdown visibility
        const toggleDropdown3 = () => {
          setIsDropdownOpen3(!isDropdownOpen3);
        };
      
        // Function to handle option selection
        const handleOptionSelect3 = (option) => {
          setSelectedOption3(option);
          setIsDropdownOpen3(false);
          
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
                  <span classname="selected">{selectedOption|| "Name"}</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1 ${isDropdownOpen ? 'menu-open1' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Ade Yemaja")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Jide Arowolo")}>Jide Arowolo</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("David Arowolo")}>David Arowolo</li>
                </ul>                                 
                </div>
                <div className="dropdown1">
                 <div className={`select1 ${isDropdownOpen1 ? 'select-clicked1' : ''}`} onClick={toggleDropdown1}>
                  <span classname="selected">{selectedOption1|| "Select Task"}</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1 ${isDropdownOpen1 ? 'menu-open1' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect1("UI")}>UI</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("UX")}>UX</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("Development")}>Development</li>
                </ul>                                 
                </div>
                <div className="dropdown1">
                 <div className={`select1 ${isDropdownOpen2 ? 'select-clicked2' : ''}`} onClick={toggleDropdown2}>
                  <span classname="selected">{selectedOption2|| "Start Date"}</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1 ${isDropdownOpen2 ? 'menu-open1' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect2("Ade Yemaja")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Jide Arowolo")}>Jide Arowolo</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Jide Arowolo")}>Jide Arowolo</li>
                </ul>                                 
                </div>
                <div className="dropdown1">
                 <div className={`select1 ${isDropdownOpen3 ? 'select-clicked1' : ''}`} onClick={toggleDropdown3}>
                  <span classname="selected">{selectedOption3|| "End Date"}</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1 ${isDropdownOpen3 ? 'menu-open1' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect3("Ade Yemaja")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect3("Jide Arowolo")}>Jide Arowolo</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect3("David Arowolo")}>David Arowolo</li>
                </ul>                                 
                </div>
                {/*<button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">Name</button>
                <button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">Select Task</button>
                <button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">Start Date</button>
               <button className="btn btn-primary dropdown-toggle team" type="button" data-toggle="dropdown">End Date</button>*/}
           </div>
           <div className='shareButtonDiv'>
           <button className="btn btn-primary curveInviteA" onClick={()=>setIsOpen(true)}>Add</button>
           </div>
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