import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiBoxes,CiCalculator1 ,CiDiscount1,CiGrid2V,CiViewTimeline,CiServer,CiTextAlignJustify,CiVideoOn,CiExport,CiDatabase,CiSettings,CiMicrochip,CiUser} from 'react-icons/ci';
import { faHome, faUser, faCog, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from '../config/apiConfig';
import { jwtDecode } from "jwt-decode";

const SideMenu2 = () => {

  const token = localStorage.getItem('access_token'); 
  const decodedToken = jwtDecode(token);
  const projectId = localStorage.getItem('nProject');
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [subTypesD, setSubTypesD] = useState([]);
  const [isCollapsedD, setIsCollapsedD] = useState(false);
  const [isDropdownOpenD, setIsDropdownOpenD] = useState(false);

  const [subTypesS, setSubTypesS] = useState([]);
  const [isCollapsedS, setIsCollapsedS] = useState(false);
  const [isDropdownOpenS, setIsDropdownOpenS] = useState(false);

  const [percentage, setPercentage] = useState(null);
  const [percentageS, setPercentageS] = useState(null);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleMenuD = () => {
    setIsCollapsedD(!isCollapsedD);
  };
  const toggleMenuS = () => {
    setIsCollapsedS(!isCollapsedD);
  };
  const toggleDropdownD = () => {
    setIsDropdownOpenD(!isDropdownOpenD);
};

const toggleDropdownS = () => {
  setIsDropdownOpenS(!isDropdownOpenS);
};
  const navigate = useNavigate();

  const onClickCB = () => navigate(`/questionBusMain/InitialDesign/DomainName/DomainName`);

  const onClickCV = () => navigate(`/questionBusMain/InitialDesign/TrademarkOrCopyright`);

  const onClickD = () => navigate(`/questionBusMain/InitialDesign/StakeholdersEngagement/StakeholdersEngagement`);

  const onClickCH = () => navigate(`/start`);
  const onClickCG = () => navigate(`/go/InitialDesign`);
  const onClickCHPdA = () => navigate(`/pdfEnd/InitialDesign`);
  const onClickCHPd = (subType) => {
    navigate(`/pdf/InitialDesign/${subType}`);
  };
  useEffect(() => {
    const questionType = 'ClaimTheDomain'
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
          setSubTypesD(data);
        
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
    const questionType = 'StakeholdersEngagement'
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
          setSubTypesS(data);
        
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
    const fetchPercentage = async () => {
       
  
        try {
            const response = await fetch(`${API_BASE_URL}/api/algo/${projectId}/ClaimTheDomain`, {
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
            const response = await fetch(`${API_BASE_URL}/api/algo/${projectId}/StakeholdersEngagement`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
  
            if (response.status === 200) {
              
                const data = await response.json();
                console.log(response)
                setPercentageS(data.percentage);
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


  const handleSubTypeClick = (subType) => {
    window.location.href =`/questionBusMain/InitialDesign/ClaimTheDomain/${subType}`;
};

const handleSubTypeClickS = (subType) => {
  window.location.href =`/questionBusMain/InitialDesign/StakeholdersEngagement/${subType}`;
};


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
            <span className='menuHeader'>Initial Design</span>
        </div>
       )}

        <li onClick={onClickCH}> 
          <CiBoxes />
          {!isCollapsed && <span>Home</span>}
        </li>

        <li onClick={toggleDropdownD}>
                    <CiBoxes />
                    {!isCollapsed && <span>Claim Domian Name {percentage !== null && ` (${percentage}%)`}</span>}
                </li>
                {isDropdownOpenD && !isCollapsedD && (
                    <ul className="dropdown">
                          {subTypesD.map((subType, index) => (
                              <li key={index} className='dropDownNew' onClick={() => handleSubTypeClick(subType.subCategory)}>
                                 {subType.subCategoryName}
                              </li>
                          ))}
                          <li className='dropDownNew' onClick={() => onClickCHPd('ClaimTheDomain')}>
                            Summary PDF
                          </li>
                    </ul>
                )}

          
<li onClick={toggleDropdownS}>
                    <CiBoxes />
                    {!isCollapsed && <span>Stakeholders Engagement {percentageS !== null && ` (${percentageS}%)`}</span>}
                </li>
                {isDropdownOpenS && !isCollapsed && (
                    <ul className="dropdown">
                          {subTypesS.map((subType, index) => (
                              <li key={index} className='dropDownNew' onClick={() => handleSubTypeClickS(subType.subCategory)}>
                                 {subType.subCategoryName}
                              </li>
                          ))}
                          <li className='dropDownNew' onClick={() => onClickCHPd('StakeholdersEngagement')}>
                            Summary PDF
                          </li>
                    </ul>
                )}

        {/* <li onClick={onClickD}>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Stakeholders Engagement</span>}
        </li> */}
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
