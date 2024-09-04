import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiBoxes,CiCalculator1 ,CiDiscount1,CiGrid2V,CiViewTimeline,CiServer,CiTextAlignJustify,CiVideoOn,CiExport,CiDatabase,CiSettings,CiMicrochip,CiUser} from 'react-icons/ci';
import { faHome, faUser, faCog, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { jwtDecode } from "jwt-decode";

const SideMenu2 = () => {
  const token = localStorage.getItem('access_token'); 
  const decodedToken = jwtDecode(token);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [subTypesB, setSubTypesB] = useState([]);
  const [isCollapsedB, setIsCollapsedB] = useState(false);
  const [isDropdownOpenB, setIsDropdownOpenB] = useState(false);

  const [subTypesE, setSubTypesE] = useState([]);
  const [isCollapsedE, setIsCollapsedE] = useState(false);
  const [isDropdownOpenE, setIsDropdownOpenE] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };


  const toggleMenuB = () => {
    setIsCollapsedB(!isCollapsedB);
  };

  const toggleMenuE = () => {
    setIsCollapsedE(!isCollapsedE);
  };
  

  const toggleDropdownB = () => {
    setIsDropdownOpenB(!isDropdownOpenB);
};

const toggleDropdownE = () => {
  setIsDropdownOpenE(!isDropdownOpenE);
};
  const navigate = useNavigate();
  const projectId = localStorage.getItem('nProject');

  const onClickCB = () => navigate(`/questionBusMain/Commercialization/BringTheMVPToFullScale`);

  const onClickD = () => navigate(`/questionBusMain/Commercialization/ExecuteTheMarketingAndRouteToMarketStrategies`);

  const onClickCH = () => navigate(`/start`);
  const onClickCG = () => navigate(`/go/Commercialization`);
  const onClickCHPdA = () => navigate(`/pdfEnd/Commercialization`);
  const [percentage, setPercentage] = useState(null);
  const [percentageE, setPercentageE] = useState(null);
  const onClickCHPd = (subType) => {
    navigate(`/pdf/Commercialization/${subType}`);
  };

  useEffect(() => {
    const questionType = 'BringTheMVPToFullScale'
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
          setSubTypesB(data);
        
        } else {
          console.error('Failed to fetch next question');
        }
      } catch (error) {
        console.error('Error fetching next question:', error);
      }
    };
  
    fetchSubTypes();
  }, []);


  useEffect(() => {
    const questionType = 'ExecuteTheMarketingAndRouteToMarketStrategies'
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
          setSubTypesE(data);
        
        } else {
          console.error('Failed to fetch next question');
        }
      } catch (error) {
        console.error('Error fetching next question:', error);
      }
    };
  
    fetchSubTypes();
  }, []);

  const handleSubTypeClick = (subType) => {
    window.location.href =`/questionBusMain/Commercialization/BringTheMVPToFullScale/${subType}`;
};

const handleSubTypeClickE = (subType) => {
  window.location.href =`/questionBusMain/Commercialization/ExecuteTheMarketingAndRouteToMarketStrategies/${subType}`;
};


useEffect(() => {
  const fetchPercentage = async () => {
     

      try {
          const response = await fetch(`${API_BASE_URL}/api/algo/${projectId}/BringTheMVPToFullScale`, {
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



useEffect(() => {
  const fetchPercentage2 = async () => {
     

      try {
          const response = await fetch(`${API_BASE_URL}/api/algo/${projectId}/ExecuteTheMarketingAndRouteToMarketStrategies`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          });

          if (response.status === 200) {
            
              const data = await response.json();
              console.log(response)
              setPercentageE(data.percentage);
          } else {
              console.error(`Error fetching percentage: ${response.status} - ${response.statusText}`);
          }
      } catch (error) {
          console.error('Error fetching percentage:', error);
      }
  };

  if (projectId) {
    fetchPercentage2();
  }
}, [projectId]);

  function handleLogout() {
    // Clear local storage
    localStorage.clear();
    
    // Redirect to login page or any other appropriate action
    window.location.href = '/login';
  }

  return (
    <>
    
    <div className={`side-menu ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isCollapsed ? faPlus : faTimes} className='close2'/>
      </div>
      <ul>
      {!isCollapsed && (
        <div className='text-center'>
            <span className='menuHeader'>Commercialization</span>
        </div>
       )}

        <li onClick={onClickCH}> 
          <CiBoxes />
          {!isCollapsed && <span>Home</span>}
        </li>

        <li onClick={toggleDropdownB}>
                    <CiBoxes />
                    {!isCollapsedB && <span>Bring The MVP To Full Scale {percentage !== null && ` (${percentage}%)`}</span>}
                </li>
                {isDropdownOpenB && !isCollapsedB && (
                    <ul className="dropdown">
                          {subTypesB.map((subType, index) => (
                              <li key={index} className='dropDownNew' onClick={() => handleSubTypeClick(subType.subCategory)}>
                                 {subType.subCategoryName}
                              </li>
                          ))}
                          <li className='dropDownNew' onClick={() => onClickCHPd('BringTheMVPToFullScale')}>
                            Summary PDF
                          </li>
                    </ul>
                )}


<li onClick={toggleDropdownE}>
                    <CiBoxes />
                    {!isCollapsedE && <span>Execute Marketing Route {percentageE !== null && ` (${percentageE}%)`}</span>}
                </li>
                {isDropdownOpenE && !isCollapsedE && (
                    <ul className="dropdown">
                          {subTypesE.map((subType, index) => (
                              <li key={index} className='dropDownNew' onClick={() => handleSubTypeClickE(subType.subCategory)}>
                                 {subType.subCategoryName}
                              </li>
                          ))}
                          <li className='dropDownNew' onClick={() => onClickCHPd('ExecuteTheMarketingAndRouteToMarketStrategies')}>
                            Summary PDF
                          </li>
                    </ul>
                )}

<li onClick={onClickCHPdA}>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Summary Pdf</span>}
        </li>
        
        <li onClick={onClickCG}>
        <CiGrid2V />
          {!isCollapsed && <span>Go no Go</span>}
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
    </>
  );
};

export default SideMenu2;
