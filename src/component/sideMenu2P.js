import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiBoxes,CiCalculator1 ,CiDiscount1,CiGrid2V,CiViewTimeline,CiServer,CiTextAlignJustify,CiVideoOn,CiExport,CiDatabase,CiSettings,CiMicrochip,CiUser} from 'react-icons/ci';
import { faHome, faUser, faCog, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { jwtDecode } from "jwt-decode";

const SideMenu2 = () => {
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsedV, setIsCollapsedV] = useState(false);
  const [isCollapsedS, setIsCollapsedS] = useState(false);
  const [isCollapsedD, setIsCollapsedD] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };


  const toggleMenuV = () => {
    setIsCollapsedV(!isCollapsedV);
  };

  const toggleMenuS = () => {
    setIsCollapsedS(!isCollapsedS);
  };

  const toggleMenuD = () => {
    setIsCollapsedD(!isCollapsedD);
  };

 


  const [subTypes, setSubTypes] = useState([]);
  const [subTypesV, setSubTypesV] = useState([]);
  const [subTypesS, setSubTypesS] = useState([]);
  const [subTypesD, setSubTypesD] = useState([]);
  
  const navigate = useNavigate();

  const onClickCB = () => navigate(`/questionBusMain/ProductDefinition/BusinessAnalysisPack`);

  const onClickCV = () => navigate(`/questionBusMain/ProductDefinition/ValuePropositionPack`);

  const onClickS = () => navigate(`/questionBusMain/ProductDefinition/SuccessMatrix`);

  const onClickD = () => navigate(`/questionBusMain/ProductDefinition/DetailedMarketingStrategies`);

  const onClickB = () => navigate(`/branding`);
  const onClickT = () => navigate(`/teamView`);
  const handleSubTypeClick = (subType) => {
    window.location.href =`/questionBusMain/ProductDefinition/BusinessAnalysisPack/${subType}`;
};
const handleSubTypeClickV = (subType) => {
  window.location.href =`/questionBusMain/ProductDefinition/ValuePropositionPack/${subType}`;
};

const handleSubTypeClickS = (subType) => {
  window.location.href =`/questionBusMain/ProductDefinition/SuccessMatrix/${subType}`;
};

const handleSubTypeClickD = (subType) => {
  window.location.href =`/questionBusMain/ProductDefinition/DetailedMarketingStrategies/${subType}`;
};



  const onClickCG = () => navigate(`/go/ProductDefinition`);

  const onClickCH = () => navigate(`/start`);

  const projectId = localStorage.getItem('nProject');
  const token = localStorage.getItem('access_token'); 
const decodedToken = jwtDecode(token);
const userId = decodedToken.userId;

const [showPopup, setShowPopup] = useState(true);

const handleClosePopup = () => {
  setShowPopup(false);
};

const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [isDropdownOpenV, setIsDropdownOpenV] = useState(false);
const [isDropdownOpenS, setIsDropdownOpenS] = useState(false);
const [isDropdownOpenD, setIsDropdownOpenD] = useState(false);

const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
};

const toggleDropdownV = () => {
  setIsDropdownOpenV(!isDropdownOpenV);
};

const toggleDropdownS = () => {
  setIsDropdownOpenS(!isDropdownOpenS);
};

const toggleDropdownD = () => {
  setIsDropdownOpenD(!isDropdownOpenD);
};
const onClickCHPd = (subType) => {
  navigate(`/pdf/ProductDefinition/${subType}`);
};
useEffect(() => {
    const questionType = 'BusinessAnalysisPack'
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

  useEffect(() => {
    const questionType = 'ValuePropositionPack'
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
          setSubTypesV(data);
        
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
    const questionType = 'SuccessMatrix'
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
    const questionType = 'DetailedMarketingStrategies'
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
      <div className="menu-content">
      <ul>
     


        <li onClick={onClickCH}> 
          <CiBoxes />
          {!isCollapsed && <span>Home</span>}
        </li>

        <li onClick={toggleDropdown}>
                    <CiBoxes />
                    {!isCollapsed && <span>Business Analysis Pack</span>}
                </li>
                {isDropdownOpen && !isCollapsed && (
                    <ul className="dropdown">
                          {subTypes.map((subType, index) => (
                              <li key={index} className='dropDownNew' onClick={() => handleSubTypeClick(subType.subCategory)}>
                                 {subType.subCategoryName}
                              </li>
                          ))}
                          <li className='dropDownNew' onClick={() => onClickCHPd('BusinessAnalysisPack')}>
                            Summary PDF
                          </li>
                    </ul>
                )}

          
<li onClick={toggleDropdownV}>
                    <CiBoxes />
                    {!isCollapsedV && <span>Value Proposition Pack (VPP)</span>}
                </li>
                {isDropdownOpenV && !isCollapsedV && (
                    <ul className="dropdown">
                          {subTypesV.map((subType, index) => (
                              <li key={index} className='dropDownNew' onClick={() => handleSubTypeClickV(subType.subCategory)}>
                                 {subType.subCategoryName}
                              </li>
                          ))}
                          <li className='dropDownNew' onClick={() => onClickCHPd('ValuePropositionPack')}>
                            Summary PDF
                          </li>
                    </ul>
                )}


      <li onClick={toggleDropdownS}>
                    <CiBoxes />
                    {!isCollapsedS && <span>Success Matrix</span>}
                </li>
                {isDropdownOpenS && !isCollapsedS && (
                    <ul className="dropdown">
                          {subTypesS.map((subType, index) => (
                              <li key={index} className='dropDownNew' onClick={() => handleSubTypeClickS(subType.subCategory)}>
                                 {subType.subCategoryName}
                              </li>
                          ))}
                          <li className='dropDownNew' onClick={() => onClickCHPd('SuccessMatrix')}>
                            Summary PDF
                          </li>
                    </ul>
                )}


       
        <li onClick={onClickT}>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Getting Your Team</span>}
        </li>

        <li onClick={toggleDropdownD}>
                    <CiBoxes />
                    {!isCollapsedD && <span>Detailed Marketing Strategies</span>}
                </li>
                {isDropdownOpenD && !isCollapsedD && (
                    <ul className="dropdown">
                          {subTypesD.map((subType, index) => (
                              <li key={index} className='dropDownNew' onClick={() => handleSubTypeClickD(subType.subCategory)}>
                                 {subType.subCategoryName}
                              </li>
                          ))}
                          <li className='dropDownNew' onClick={() => onClickCHPd('DetailedMarketingStrategies')}>
                            Summary PDF
                          </li>
                    </ul>
                )}

       

        <li onClick={onClickB}>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Branding</span>}
        </li>

        <li onClick={onClickCG}>
        <CiGrid2V />
          {!isCollapsed && <span>Go no Go</span>}
        </li>

        {/* <li>

          <CiViewTimeline />
          {!isCollapsed && <span>Timeline Builder</span>}
        </li> */}
        
        <li>
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
