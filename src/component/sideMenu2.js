import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiBoxes, CiCalculator1, CiDiscount1, CiGrid2V, CiViewTimeline, CiServer, CiTextAlignJustify, CiVideoOn, CiExport, CiDatabase, CiSettings, CiMicrochip, CiUser, CiLineHeight } from 'react-icons/ci';
import { faHome, faUser, faCog, faTimes, faPlus, faBars, faX, faBarChart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from '../config/apiConfig';
import { jwtDecode } from "jwt-decode";
import ideationPop from './ideationModal'; // Import the KpiPopup component
import home from '../images/home.svg';
import pdf from '../images/case.svg';
import sum from '../images/summary.svg';
import go from '../images/go.svg';
import ham from '../images/ham.svg';
import cal from '../images/calculator.svg';
import logout from '../images/logout.svg';

const SideMenu2 = () => {
  
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [subTypes, setSubTypes] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const onClickStatistics = () => navigate(`/ideation/start`);

  useEffect(() => {
    const handleResize = () => {
      const isMobileScreen = window.innerWidth <= 768;
      setIsMobile(isMobileScreen);
      setIsCollapsed(isMobileScreen);
    };

    handleResize(); // Set initial state based on screen size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const navigate = useNavigate();
  const onClickCF = () => navigate(`/customFinancial`);

  const onClickCB = (subType) => navigate(`/questionBusMain/Ideation/BusinessCaseBuilder/${subType}`);
  const handleSubTypeClick = (subType) => {
    window.location.href =`/questionBusMain/Ideation/BusinessCaseBuilder/${subType}`;
};
  const onClickCG = () => navigate(`/go/Ideation`);

  const onClickCH = () => navigate(`/start`);

  const onClickCHPd = () => navigate(`/pdf/Ideation/BusinessCaseBuilder`);
  const onClickCHPdA = () => navigate(`/pdfEnd/Ideation`);
  
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
  };

  const [percentage, setPercentage] = useState(null);


  const projectId = localStorage.getItem('nProject');
  const token = localStorage.getItem('access_token'); 
const decodedToken = jwtDecode(token);
const userId = decodedToken.userId;


useEffect(() => {
  const questionType = 'BusinessCaseBuilder'
  const fetchSubTypes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/question/cat/${questionType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.data);
        setSubTypes(data);
      
      } else {
        console.error('Failed to fetch next question');
      }
    } catch (error) {
      console.error('Error fetching next question:', error);
    }
  };

  fetchSubTypes();
}, []);
  const updateStreak = async () => {
    try {
    

      const response = await axios.post(API_BASE_URL+'/api/streak/', { userId,projectId });
      console.log(response);
      // setStreak(response.data.streak);
      // setLoading(false);
    } catch (error) {
      console.log(error.response)
    }
  };



    useEffect(() => {
      const checkAndInsert = async () => {
        const phase="Ideation";
        console.log("entered");
        try {
          
          const response = await fetch(`${API_BASE_URL}/api/entered`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the token in the request headers
            },
           body: JSON.stringify({ projectId, phase, userId })
            
          });
  
          const result = await response.json();
          console.log(result.message);
  
          if (response.ok) {
            
            console.log('Operation successful:', result);
           
          } else {
            console.error('Operation failed:', result.message);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
  
      checkAndInsert();
    }, []);


  function handleLogout() {
    // Clear local storage
    localStorage.clear();
    
    // Redirect to login page or any other appropriate action
    window.location.href = '/login';
  }

  const formatSubType = (subType) => {
    console.log(subType);
    return subType.replace(/([A-Z])/g, ' $1').trim();
};
  // Fetch streak when component mounts
  useEffect(() => {
    updateStreak();
  }, []);

  useEffect(() => {
    const fetchPercentage = async () => {
       

        try {
            const response = await fetch(`${API_BASE_URL}/api/algo/${projectId}/BusinessCaseBuilder`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
              
                const data = await response.json();
                console.log(response)
                setPercentage(data.percentage);
            } else {
                console.error(`Error fetching percentage: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching percentage:', error);
        }
    };

    if (projectId) {
        fetchPercentage();
    }
}, [projectId]);


  return (
    <>
  
    <div className={`side-menu ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
          {isCollapsed ? (
            <img width={20} src={ham} className='close2' />
          ) : (
              <FontAwesomeIcon width={30}  color='black' icon={faX} className='close2' />
          )}

          {/* <FontAwesomeIcon icon={isCollapsed ? ham : faTimes} className='close2'/> */}
      </div>
      <div className="menu-content">
      <ul>
      {!isCollapsed && (
        <div className='text-center'>
                <span className='menuHeader  text-black font-bold '>Ideation</span>
        </div>
       )}
      
        <li onClick={onClickCH}> 
              <img width={20} height={20} src={home} />

              {!isCollapsed && <span className=' text-black font-bold '>Home</span>}
        </li>

            <li onClick={onClickStatistics}>
              <CiLineHeight color='black' />
              {!isCollapsed && <span className=' text-black font-bold ' >Statistics</span>}
            </li>

        <li onClick={toggleDropdown}>
              <img width={20} height={20} src={pdf} />

              {!isCollapsed && <span className=' text-black font-bold ' >Business Case Builder</span>}
                </li>
                {isDropdownOpen && !isCollapsed && (
                    <ul className="dropdown">
                          {subTypes.map((subType, index) => (
                              <li key={index} className='dropDownNew' onClick={() => handleSubTypeClick(subType.subCategory)}>
                                 {subType.subCategoryName}
                              </li>
                          ))}
                          <li className='dropDownNew' onClick={onClickCHPd}>
                            Summary PDF
                          </li>
                    </ul>
                )}
        <li onClick={onClickCF}>
            <img width={20} height={20} src={cal} />
          
              {!isCollapsed && <span className=' text-black font-bold ' >Custom Financial Projection</span>}
        </li>

        <li onClick={onClickCHPdA}>
              <img width={20} height={20} src={sum} />

              {!isCollapsed && <span className=' text-black font-bold ' >Summary Pdf</span>}
        </li>

        <li onClick={onClickCG}>
              <img width={20} height={20} src={go} />

              {!isCollapsed && <span className=' text-black font-bold ' >Go no Go</span>}
        </li>

        {/* <li>

          <CiViewTimeline />
          {!isCollapsed && <span>Timeline Builder</span>}
        </li> */}
        
      
        {/* <li>
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Change Password</span>}
        </li>

        <li>
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Edit Profile</span>}
        </li> */}

        <li onClick={handleLogout}>
              <img width={20} height={20} src={logout} />
              {!isCollapsed && <span className=' text-black font-bold ' >Logout</span>}
        </li>


        

      </ul>
      </div>
    </div>
    </>
  );
};

export default SideMenu2;
