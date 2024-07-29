import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiBoxes,CiCalculator1 ,CiDiscount1,CiGrid2V,CiViewTimeline,CiServer,CiTextAlignJustify,CiVideoOn,CiExport,CiDatabase,CiSettings,CiMicrochip,CiUser} from 'react-icons/ci';
import { faHome, faUser, faCog, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { jwtDecode } from "jwt-decode";
import ideationPop from './ideationModal'; // Import the KpiPopup component

const SideMenu2 = () => {
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [subTypes, setSubTypes] = useState([]);

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

  return (
    <>
    
    <div className={`side-menu ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isCollapsed ? faPlus : faTimes} className='close2'/>
      </div>
      <div className="menu-content">
      <ul>
      {!isCollapsed && (
        <div className='text-center'>
            <span className='menuHeader'>Ideation</span>
        </div>
       )}
      
        <li onClick={onClickCH}> 
          <CiBoxes />
          {!isCollapsed && <span>Home</span>}
        </li>

        <li onClick={toggleDropdown}>
                    <CiBoxes />
                    {!isCollapsed && <span>Business Case Builder</span>}
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
            <CiCalculator1 />
          
          {!isCollapsed && <span>Custom Financial Projection</span>}
        </li>

        <li onClick={onClickCG}>
        <CiGrid2V />
          {!isCollapsed && <span>Go no Go</span>}
        </li>

        {/* <li>

          <CiViewTimeline />
          {!isCollapsed && <span>Timeline Builder</span>}
        </li> */}
        
        <li onClick={onClickCHPdA}>
            <CiServer />
          {!isCollapsed && <span>Summary Pdf</span>}
        </li>

        {!isCollapsed && (
        <div className='text-center'>
            <hr className='buiy'></hr>
            <p style={{paddingTop:0}}>Account</p>
        </div>
        )}
        {/* <li>
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Change Password</span>}
        </li>

        <li>
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Edit Profile</span>}
        </li> */}

        <li onClick={handleLogout}>
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Logout</span>}
        </li>


        

      </ul>
      </div>
    </div>
    </>
  );
};

export default SideMenu2;
