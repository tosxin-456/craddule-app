import React, { useState, useEffect, useRef } from 'react';
import {CiCamera, CiShare1, CiFaceSmile, CiUndo, CiMobile1, CiPaperplane, CiCircleRemove, CiFolderOn} from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import ReactDOM from "react-dom";
import p1 from './p1.jpeg';
import wire7 from './wire7.jpeg'
import p2 from './p2.jpeg';
import p3 from './p3.jpeg';
import p4 from './p4.jpeg';
import p5 from './p5.jpeg';
import close from './closeB.png';



export default function ChatModal ({open, onClose}) {

  //first dropdown
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

//second dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState('');
    const dropdownRef1 = useRef(null);

  
    // Function to toggle dropdown visibility
    const toggleDropdown1 = () => {
      setIsDropdownOpen1(!isDropdownOpen1);
    };
  
    // Function to handle option selection
    const handleOptionSelect1 = (option) => {
      setSelectedOption1(option);
      setIsDropdownOpen1(false);
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

// Close dropdown when clicking outside of it 2
useEffect(() => {
  const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
          setIsDropdownOpen1(false);
      }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


    const [isOpen, setIsOpen]= useState(false);
    const navigate = useNavigate()
    const onClickHandler = () => navigate(`/login`)
    if(!open) return null
    return ReactDOM.createPortal(
    <>
  <div className='container-fluid1 chat modalOv3'>
  <div className='col-lg-4'>
  <div className='newMHold'>
  <div className='newMHoldNew'>
    <div className='chatIcon1'>
     {/* <span className='iconS3'><CiMobile1 /></span>
      <span className='iconSs3'>< /></span>*/}
      <img src={close} className='iconSs7' onClick={onClose} type='button'></img>
    </div>
    <div className='chatNew'>

<div className='chatNewContain'>

<div className='chatTextT1'>
      <p className='chatText1'>Today 12th March, 2024</p>
    </div>

    <div>
      <div className='chatConNew'>
      <div className='chatConTnew'>
        <div className='textBoxNew1'>
          <p className='theChat1New'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
         </p>
             <div className='chatTimeNew'>
      <p className='chatTextNew'>11:26</p>
    </div>
          </div>
          </div>
        <img src={p5} className='chatImg3'></img>
      </div>
      </div>


      <div>
      <div className='chatConNew'>
        <img  src={p1} className='chatImg3'></img>
        <div className='chatConTnew1'>
          {/* <p className='theChat'>Angela Onoja</p> */}
          <div className='textBoxNew2'><p className='theChat1New'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
       </p>
       <div className='chatTimeNew'>
      <p className='chatTextNew'>11:27</p>
    </div>
       </div>
        </div>
      </div>
    </div>

    </div>



   
        {/* <div className='inputIcon'>      </div>
        <span className='iconS3 sm' type='button'><CiShare1 /></span>
        <div ref={dropdownRef1} className="dropdown4 iconS3 sm">
                <div className={`select4 ${isDropdownOpen1 ? 'select-clicked' : ''}`} onClick={toggleDropdown1}>
                    <span classname="selected">{selectedOption1 || <CiShare1 />}</span>
                    <div class=""></div>
                </div>
                {/* <ul className={`menu5 ${isDropdownOpen1 ? 'menu-open5' : ''}`}>
                    <li type='button'><CiMobile1 /> Photo & Videos</li>
                    <hr className='listMar'></hr>
                    <li type='button'><CiCamera /> Camera</li>
                    <hr className='listMar'></hr>
                    <li type='button'><CiShare1 /> Document </li>
                </ul> 
            </div>
        <span className='iconS3 sm' type='button'><CiFaceSmile/></span>
  
        <input placeholder='Write your message' className='chatInput'></input>
       {/* <div className='chatsButton'>        </div>
        <p className='theChatButton' type='button'>Send</p> */}
        <table className="chatTable">
            <tbody>
                <tr>
                    <td className='iconChatN'>
                    <span className='iconS3' type='button'><CiShare1 /></span>
                    <span className='iconS3' type='button'><CiFaceSmile/></span>
                    </td>
                    <td>
                    <input placeholder='Write your message' className='chatInputNew'></input>
                    </td>
                    <td>
                    <button className="theChatButton1">Send</button>
                    </td>
                </tr>

            </tbody>
        </table>

  </div>
  </div>
  </div>
  </div>
  </div>
  </>,
  document.getElementById('portal')
  )
}



