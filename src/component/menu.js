import React, {useEffect,useState,useRef} from 'react';
import { CiApple,CiMemoPad ,CiPaperplane,CiPen,CiEdit,CiLaptop,CiBank,CiVideoOn,CiExport,CiDatabase,CiSettings,CiMicrochip,CiUser} from 'react-icons/ci';


function Menu () {
  const [isClosed, setIsClosed] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const openNav = () => {
    console.log("here");
    setIsOpen(true);
  }
  
  const closeNav = () => {
    setIsOpen(false);
  }


  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSubmenuOpen1, setIsSubmenuOpen1] = useState(false);
  const [isSubmenuOpen2, setIsSubmenuOpen2] = useState(false);
  const [isSubmenuOpen3, setIsSubmenuOpen3] = useState(false);
  const [isSubmenuOpen4, setIsSubmenuOpen4] = useState(false);
  const [isSubmenuOpen5, setIsSubmenuOpen5] = useState(false);

  // Function to toggle the visibility of the submenu
  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const toggleSubmenu1 = () => {
    setIsSubmenuOpen1(!isSubmenuOpen1);
  };

  const toggleSubmenu2 = () => {
    setIsSubmenuOpen2(!isSubmenuOpen2);
  };

  const toggleSubmenu3 = () => {
    setIsSubmenuOpen3(!isSubmenuOpen3);
  };

  const toggleSubmenu4 = () => {
    setIsSubmenuOpen4(!isSubmenuOpen4);
  };

  const toggleSubmenu5 = () => {
    setIsSubmenuOpen5(!isSubmenuOpen5);
  };


  return(
  
  <div className='col-md-3'>
  <div className='newMHold'>

  
    <div className='newMHold1'>
      <ul className='newMUl'>
          <li  className={isSubmenuOpen ? 'dropdown-trigger2-open' : 'dropdown-trigger2'}> 
          <span
            onClick={toggleSubmenu}
            className="dropdown-trigger" 
          >
            <span className={isSubmenuOpen ? 'iconS-open' : 'iconS'}><CiMemoPad /></span> Ideation
          </span>
            <ul className={isSubmenuOpen ? 'subMenuOpen' : 'subMenu'}>
              <li className='innr'>Business Case Builder</li>

              <li className='innr'>Custom Financial Projection</li>
              <li className='innr'>Discounted Cash Flow (DCF)</li>
              <li className='innr'>Comparative Analysis</li>
              <li className='innr'>Project Timeline Builder</li>
              <li className='innr'>Go/ No-Go gate</li>
              <li className='innr'>Summary (PDF)</li>
              {/* Add more submenu items as needed */}
            </ul>
          </li>

          <li  className={isSubmenuOpen1 ? 'dropdown-trigger2-open' : 'dropdown-trigger2'}> 
            <span
              onClick={toggleSubmenu1}
              className="dropdown-trigger"
            >
              <span className={isSubmenuOpen1 ? 'iconS-open' : 'iconS'}>< CiPaperplane /></span> Product Definition
            </span>
            <ul className={isSubmenuOpen1 ? 'subMenuOpen' : 'subMenu'}>
                <li className='innr'>Business Analysis Pack</li>
                <li className='innr'>Value Proposition Pack (VPP)</li>
                <li className='innr'>Success Matrix</li>
                <li className='innr'>KPI</li>
                <li className='innr'>Detailed Marketing Strategies</li>
                <li className='innr'>Getting Your Team</li>
                <li className='innr'>Go/ No-Go gate</li>
                <li className='innr'>Summary (PDF)</li>
                {/* Add more submenu items as needed */}
              </ul>
          </li>

          <li className={isSubmenuOpen2 ? 'dropdown-trigger2-open' : 'dropdown-trigger2'}> 
            <span
                onClick={toggleSubmenu2}
                className="dropdown-trigger"
              >
              <span className={isSubmenuOpen2 ? 'iconS-open' : 'iconS'}><CiPen /></span> Prototyping
            </span>
            <ul className={isSubmenuOpen2 ? 'subMenuOpen' : 'subMenu'}>
              <li className='innr'>Wireframe</li>
              <li className='innr'>3D Design</li>
              <li className='innr'>Prototype</li>
                {/* Add more submenu items as needed */}
            </ul>
          </li>

          <li className={isSubmenuOpen3 ? 'dropdown-trigger2-open' : 'dropdown-trigger2'}> 
            <span
                onClick={toggleSubmenu3}
                className="dropdown-trigger"
              >
              <span className={isSubmenuOpen3 ? 'iconS-open' : 'iconS'}><CiEdit /></span>Initial Design
            </span>
            <ul className={isSubmenuOpen3 ? 'subMenuOpen' : 'subMenu'}>
              <li className='innr'>Wireframe</li>
              <li className='innr'>3D Design</li>
              <li className='innr'>Prototype</li>
                {/* Add more submenu items as needed */}
            </ul>
          </li>

          <li className={isSubmenuOpen4 ? 'dropdown-trigger2-open' : 'dropdown-trigger2'}> 
            <span
                onClick={toggleSubmenu4}
                className="dropdown-trigger"
              >
              <span className={isSubmenuOpen4 ? 'iconS-open' : 'iconS'}><CiLaptop /></span>Validating and Testing
            </span>
            <ul className={isSubmenuOpen4 ? 'subMenuOpen' : 'subMenu'}>
              <li className='innr'>Detail Marketing/ RTM Tracking</li>
              <li className='innr'>Go/ No-Go gate</li>
              <li className='innr'>Summary (PDF)</li>
                {/* Add more submenu items as needed */}
            </ul>
          </li>

          <li className={isSubmenuOpen5 ? 'dropdown-trigger2-open' : 'dropdown-trigger2'}>
              <span
                onClick={toggleSubmenu5}
                className="dropdown-trigger"
              >
                <span className={isSubmenuOpen5 ? 'iconS-open' : 'iconS'}><CiBank /></span>Commercialization
             </span>
            <ul className={isSubmenuOpen5 ? 'subMenuOpen' : 'subMenu'}>
              <li className='innr'>MVP to Full Scale</li>
              <li className='innr'>Execute RTM</li>
                {/* Add more submenu items as needed */}
            </ul>
          </li>
           <li className="dropdown-trigger2"> <span className='iconS'><CiVideoOn /></span>Pitch Deck</li>
            <li className="dropdown-trigger2"> <span className='iconS'><CiExport /></span>Share</li>
            <li className="dropdown-trigger2"> <span className='iconS'><CiDatabase /></span>Craddule Hub</li>
          {/* Add more items as needed */}
      </ul>
    </div>

    <div className='newMHold1'>
    <ul className='newMUl'>
        
        <li className="dropdown-trigger2"> <span className='iconS'><CiMicrochip /></span> Team Management</li>
        <li className="dropdown-trigger2"> <span className='iconS'><CiUser /></span> Profile</li>
        <li className="dropdown-trigger2"> <span className='iconS'><CiSettings /></span>Setting</li>
       
        {/* Add more items as needed */}
    </ul>


    

</div>
</div>
</div>
  )
}


export default Menu;
