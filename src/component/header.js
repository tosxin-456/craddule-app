import React, { useState, useEffect, useRef } from 'react';
import p1 from './../images/p1.jpeg';
import p2 from './../images/p2.jpeg';
import p3 from './../images/p3.jpeg';
import p4 from './../images/p4.jpeg';
import p5 from './../images/p5.jpeg';
import p6 from './../images/p6.jpeg';
import bbm from './../images/bggm.webp';
import bolt from './../images/bolt2.webp';
import logo from './../images/logoc.png';
import { CiBellOn ,CiUser, CiChat2} from 'react-icons/ci';
import { MdOutlineBolt} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ChatToolModal from './chatModal';
import API_BASE_URL from '../config/apiConfig';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faTrash,faUser  } from '@fortawesome/free-solid-svg-icons';
import { checkTokenValidity } from '../util/auth';
import { jwtDecode } from "jwt-decode";
import ModalStart from './modalTellUs';

const Header = () => {
    const projectId = localStorage.getItem('nProject');
    const projectName = localStorage.getItem('nProjectName');

    const [notifications, setNotifications] = useState([]);
   
    const token = localStorage.getItem('access_token');
   

    const [isOpen, setIsOpen]= useState(false);
    const [isOpenT, setIsOpenT]= useState(false);
    const [isOpenQ, setIsOpenQ] = useState(false);

    const [slogan, setSlogan] = useState('');

    const [streak, setStreak] = useState('0');
    const navigate = useNavigate()

    const handleToggle = () => {
       setIsOpenQ(!isOpenQ);
      };
      useEffect(() => {
       
        // Function to check if the token is invalid
        const isTokenInvalid = (token) => {
            if (!token) {
                // No token found, consider it invalid
                return true;
            }

            try {
                // Optionally, decode the token and check its expiration (JWT example)
                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);
                
                if (payload.exp && payload.exp < currentTime) {
                    // Token is expired
                    return true;
                }
            } catch (error) {
                // If there's an error during decoding, assume the token is invalid
                return true;
            }

            return false;
        };

        // Check the token and navigate to login if invalid or absent
        if (isTokenInvalid(token)) {
            // Clear the token from localStorage (optional, in case it's invalid)
            localStorage.removeItem('access_token');

            // Navigate to the login page
            navigate('/login'); // Redirect the user to login
        }
    }, [navigate]); 


    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

      useEffect(() => {
        const fetchNotifications = async () => {
          const token = localStorage.getItem('access_token');
            try {
                const response = await fetch(`${API_BASE_URL}/api/notification/project/${projectId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data);
                    // Filter notifications to only include those that are unread
                    const unreadNotifications = data.data.filter(notification => !notification.read);
                    setNotifications(unreadNotifications);
                } else {
                  console.log('Error fetching notifications:', response.status);
                   
                }
            } catch (err) {
              console.log(err.message)
                //setError(err.message);
            } finally {
                //setLoading(false);
            }
        };

        fetchNotifications();
    }, [projectId, token]);

      
      useEffect(() => {

        const token = localStorage.getItem('access_token');
    
        if (!token) {
          // Navigate to login page if token is not found
          navigate('/login');
          return;
        }
        
      }, [navigate]);

   

      // useEffect(() => {
      //   const fetchSlogan = async () => {
          
      //     try {
      //       const response = await fetch(`${API_BASE_URL}/api/brand/slogan/${projectId}`, {
      //         method: 'GET',
      //         headers: {
      //           'Content-Type': 'application/json',
      //           'Authorization': `Bearer ${token}`
      //         }
      //       });
    
      //       if (response.status === 200) {
      //         const data = await response.json();
      //         setSlogan(data.slogan);
      //       } else {
      //         console.log("cant get slogan");
      //         //setError('Error fetching slogan.');
      //       }
      //     } catch (err) {
      //       console.log("Error fetching slogan: ",err);
      //       //setError('Error fetching slogan.');
      //     }
      //   };
    
      //   fetchSlogan();
      // }, [projectId, token]);
   
  
      const updateStreak = async () => {
        try {
        //  const projectId = localStorage.getItem('nProject');
        //   const token = localStorage.getItem('access_token'); 
        // const decodedToken = jwtDecode(token);
       
    
          const response = await axios.post(API_BASE_URL+'/api/streak/', { userId,projectId });
          console.log(response);
          console.log(response.data.streak);
          setStreak(response.data.streak);
    
          // setStreak(response.data.streak);
          // setLoading(false);
        } catch (error) {
          console.log(error.response)
        }
      };
     
      useEffect(() => {
        updateStreak();
      }, []);

 

    //first dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [showDeleteButton1, setShowDeleteButton1] = useState(false);
    const dropdownRef = useRef(null);


  // Function to toggle dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotifyClick = () => {
    setShowDeleteButton(!showDeleteButton);
};


const handleNotifyClick1 = () => {
  setShowDeleteButton1(!showDeleteButton1);
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


    
    return(
        <>
    <div className="headerH">
        <div className='row'>
            <div className='col-md-3'>
                
                <img src={logo} alt="Circular Image" className="circular-image-top" style={{width:'15%'}}/>
                <span className='tellU' type='button' style={{color:"#fff"}} onClick={()=>setIsOpenT(true)}>Tell us more</span>

            </div>

            <div className='col-md-6'>
                <p className='pName'>{projectName}</p>
                {/* <p className='pSlogan'>{slogan}</p> */}

            </div>

            <div className='col-md-3'>
                <div className='fll'>
                <div className="members-dropdown">
                  <button className="members-dropdown-button" onClick={handleToggle}>
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  {isOpenQ && (
                    <ul className="members-dropdown-list">
                      <li>
                        <a onClick={() => navigate('/teamAdd')}>Invite Members</a>
                      </li>
                      <li>
                        <a onClick={() => navigate('/teamView')}>Manage Members</a>
                      </li>
                    </ul>
                  )}
                </div>
                    {/* <span className='iconS2 mr'><CiBellOn /></span> */}
                    <div ref={dropdownRef} className="dropdown5 iconS2 mr">
                <div className={`select0 `}>
                 <span classname="selected" style={{color:"#fff"}}><MdOutlineBolt /><span className='streakTop'>{streak}</span></span>
                </div>
                <div className={`select0 ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected" style={{color:"#fff"}}>{selectedOption || <CiBellOn />}</span>
                </div>
                {/* <div className='newMHold3'> */}
                <div className={`menu0  container-fluid1 ${isDropdownOpen ? 'menu-open0' : ''}`}>
                  
                 <div className='divNotify'>
                {/* <p className='notiHead' >Notification</p> */}
                
                {notifications.length > 0 ? (
                notifications.map(notification => (
                    <div key={notification._id} className='displayDeletebutton'>
                        <div className='notify' onClick={handleNotifyClick}>
                            <FontAwesomeIcon icon={faLightbulb} className='bulb'/>
                            <div className='notifyTxt'>
                                <p className='notifyHead'>{notification.notificationHead || 'Notification'}</p>
                                <p className='notBodi'>
                                    {notification.notification}
                                    <br />
                                </p>
                                <p className='notTime'>{notification.timeSent || 'Just now'}</p>
                            </div>
                        </div>
                        {/* {showDeleteButton && (
                            <button className='deleteButtonNotify'>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        )} */}
                    </div>
                ))
            ) : (
                <p>No unread notifications</p>
            )}
                 
                 </div>
                </div>
            </div>
                   <span className='iconS2' type='button' style={{color:"#fff"}} onClick={()=>setIsOpen(true)}><CiChat2 /></span>
                   
                </div>
            </div>
            <ChatToolModal open={isOpen} onClose={() => setIsOpen(false)}>

    </ChatToolModal>

    <ModalStart open={isOpenT} onClose={() => setIsOpenT(false)}>

</ModalStart>
        </div>
       
    </div>
    </>
    )
}

export default Header
