import React from 'react';
import React, {useEffect,useState} from 'react';
const Menu = () => {

    useEffect(() => {
        const wow = new WOW.WOW();
        wow.init();
      }, []);
    
      const [isOpen, setIsOpen] = useState(true);
    
      const openNav = () => {
        console.log("here");
        setIsOpen(true);
      }
    
      const closeNav = () => {
        setIsOpen(false);
      }

  return (
    <div >
    <div className='sidenav' style={{ width: isOpen ? '250px' : '0' }}>
    
      <div className='container' style={{ paddingLeft:30}}> 

        <p className='navHeader'>Payments</p>  
          <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
          </ul>
      </div>
    
      </div>

  </div>   
  );
};

export default Menu;