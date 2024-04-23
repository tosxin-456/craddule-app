import React, { useState } from 'react';
import p1 from './images/p1.jpeg'; 
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
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/pageShare`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
        
        <div className='col-md-12'>
        <div className='centerP'>
            
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
                    <span classname="selected">Select from team member</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Jide Arowolo</li>
                </ul>
            </div>

            
            <div className="dropdown">
                <div className={`select ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">Choose period</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>One Week</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Two Weeks</li>
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
</div>*/}
            <div className='filledd'>
            <div className="dropdown">
                <p className='pageTittle1'>Age</p>
                <input className='profileInput'></input></div>
                <div className="dropdown">
                <div className={`select ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">Select from team member</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Jide Arowolo</li>
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
