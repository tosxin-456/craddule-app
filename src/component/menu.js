import React, {useEffect,useState} from 'react';


    


function Menu () {

  const [isOpen, setIsOpen] = useState(true);
  const openNav = () => {
    console.log("here");
    setIsOpen(true);
  }
  
  const closeNav = () => {
    setIsOpen(false);
  }

  return(
    <div className='row'>
    <div className='col-md-2'>
        <div className='sidenav' style={{ width: isOpen ? '200px' : '0' }}>
            
            <div className='container' style={{ paddingLeft:30}}> 

                <ul>
                    <li>Ideation</li>
                    <li>Product Definition</li>
                    <li>Prototyping</li>
                    <li>Initial Design</li>
                    <li>Validating and Testing</li>
                    <li>Commercialization</li>
                    <li>Pitch Deck</li>
                    <li>Share</li>
                </ul>
            </div>
        
            </div>
    </div>
  </div>  
  )
}


export default Menu;