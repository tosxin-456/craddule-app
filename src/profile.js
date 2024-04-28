import React, { useState } from 'react';
import p1 from './images/p1.jpeg'; 
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';




const Profile = () =>  {

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

const navigate = useNavigate()

    const onClickHandler = () => navigate(`/introduction1`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
        
        <div className='col-md-12'>
        <div className='centerP'>
        <img src={bci} className='bcP' type='button'onClick={onClickHandler}></img>

            <div><p className='centerH1a'>Profile</p>
            <p className='centerHp1a'>View, manage your memebers and send invites</p>
            <button className="btn btn-primary curveN">Save changes</button>
            <button className="btn btn-primary curveI">Discard changes</button></div>

            <p className='profileTitle'>Profile picture or company logo</p>

            <div className='profilePic'>
                <img src= {p1} className='imgPic' type='button'></img>
                <p className='imgTittle' type='button'>Edit</p>
            </div>

            <div className='filled1'>
                <p className='pageTittle'>Full Name</p>
                <input className='profileInput' placeholder='Enter first and last name'></input>
            </div>

            <div className='filled2'>
                <p className='pageTittle'>Company Name</p>
                <input className='profileInput' placeholder='Company Name'></input>
            </div>

            <div className='filled2'>
                <p className='pageTittle'>Email</p>
                <input className='profileInput'  placeholder='Email'></input>
            </div>

            <div className='filledd'>
            <div className="dropdown">
             <p class='pageTitle1'>Assign super admin/delegated</p> </div>
             <div className="dropdown">
             <p class='pageTitle1'>Delegate authority period</p>
              </div>
              </div>  
           

            <div className='filled3'>    
            <div className="dropdown">
                <div className={`select ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">{selectedOption|| "Select from team member"}</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Ade Yemaja")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Jide Arowolo")}>Jide Arowolo</li>
                </ul>
            </div>

            
            <div className="dropdown">
                <div className={`select ${isDropdownOpen1 ? 'select-clicked' : ''}`} onClick={toggleDropdown1}>
                    <span classname="selected" >{selectedOption1|| "Choose period"}</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen1? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect1("One Week")}>One Week</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("Two Weeks")}>Two Weeks</li>
                </ul>
            </div>
            </div>

         
       {/*<div class='dropdown'>
        <select class='dropdown-select'>
            <option value='' class="opP">Select from team member</option>
        </select>
        <div class='dropdown-arrow'></div>
    </div>
</div>
            <div className='filled2'>
                <p className='pageTittle'>Assign super admin/ delegated</p>
                <div className='member'><p className='textdiv'>Select from team member</p></div>
    </div>
       <div class='filled3'>
    <p class='pageTitle'>Assign super admin/delegated</p>
    <div class='dropdown'>
        <div class='custom-dropdown'>
            <span class='selected-option'>Select from team member</span>
            <ul class='options'>
                <li>Option 1</li>
                <li>Option 2</li>
            </ul>
        </div>
        <div class='dropdown-arrow'></div>
    </div>
</div>
            <div className='filledd'>
            <div className="dropdown">
                <p className='pageTittle1'>Age</p>
                <input className='profileInput'></input></div>
                <div className="dropdown">
                <div className={`select ${isDropdownOpen2 ? 'select-clicked' : ''}`} onClick={toggleDropdown2}>
                    <span classname="selected">{selectedOption1|| "Gender"}</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen2 ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect2("Ade Yemaja")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Jide Arowolo")}>Jide Arowolo</li>
                </ul>
            </div>
                
            </div>*/}

<div className='filledd'>
            <div className="dropdown">
             <p class='pageTitle1'>Age</p> </div>
             <div className="dropdown">
             <p class='pageTitle1'>Gender</p>
              </div>
              </div>  
           

            <div className='filled3'>    
            <div className="dropdown">
            <input className='profileInput1'></input></div>


                {/*<div className={`select ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">{selectedOption|| "Select from team member"}</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Ade Yemaja")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Jide Arowolo")}>Jide Arowolo</li>
                </ul>
        </div>*/}

            
            <div className="dropdown">
                <div className={`select ${isDropdownOpen2 ? 'select-clicked' : ''}`} onClick={toggleDropdown2}>
                    <span classname="selected" >{selectedOption2|| "Select Gender"}</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen2? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect2("Male")}>Male</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Female")}>Female</li>
                </ul>
            </div>
            </div>
            
      </div>    
  </div>
  </div>
  </div>
  </>
    );
}

export default Profile
