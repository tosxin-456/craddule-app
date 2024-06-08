import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiBoxes,CiCalculator1 ,CiDiscount1,CiGrid2V,CiViewTimeline,CiServer,CiTextAlignJustify,CiVideoOn,CiExport,CiDatabase,CiSettings,CiMicrochip,CiUser} from 'react-icons/ci';
import { faHome, faUser, faCog, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
const SideMenu2 = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      
    <div className={`side-menu ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isCollapsed ? faPlus : faTimes} className='close2'/>
      </div>
      <ul>
      {!isCollapsed && (
        <div className='text-center'>
            <span className='menuHeader'>Ideation</span>
        </div>
       )}
        <li>
          <CiBoxes />
          {!isCollapsed && <span>Business Case Builder</span>}
        </li>
        <li>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Custom Financial Projection</span>}
        </li>

        <li>
        <CiGrid2V />
          {!isCollapsed && <span>Go no Go</span>}
        </li>

        <li>

          <CiViewTimeline />
          {!isCollapsed && <span>Timeline Builder</span>}
        </li>
        
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
        <li>
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Change Password</span>}
        </li>

        <li>
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Edit Profile</span>}
        </li>

        <li>
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Logout</span>}
        </li>

      </ul>
    </div>
    </>
  );
};

export default SideMenu2;
