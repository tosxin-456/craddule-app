import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useEffect,useState} from 'react';
import bci from './images/bc.png'; 
import bro from './images/bro.png'; 
function App() {

    //useEffect(() => {
    //     const wow = new WOW.WOW();
    //     wow.init();
    //   }, []);
    
      const [isOpen, setIsOpen] = useState(true);
    
      const openNav = () => {
        console.log("here");
        setIsOpen(true);
      }
    
      const closeNav = () => {
        setIsOpen(false);
      }

  return (
    <div className="">
    <nav className="navbar navbar-expand-lg navbar-light menuC topN">
            <div className="container">
                <div className='row'>
                    <div className='col-md-3'>
                      
                        <a className="navbar-brand" href="#"><span class="gold-circle" ></span><span>Craddule</span></a>

                        </div>
                    </div>

                    <div className='col-md-9'>
                        <div className="collapse navbar-collapse menuC" id="navbarNav">
                            <ul className="navbar-nav">
                                
                                <li className="nav-item menuCa">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                                <li className="nav-item menuCa">
                                    <a className="nav-link" href="#">Team Management </a>
                                </li>

                                <li className="nav-item menuCa">
                                    <a className="nav-link" href="#">Profile</a>
                                </li>

                                <li className="nav-item menuCa">
                                    <a className="nav-link" href="#">Settings</a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
            
                
               
                
            </div>
    </nav>

<div className='row'>

   

</div>
   

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

    <div className='col-md-10'>
        <div className='centerC'>
            <img src={bci} className='bcI'></img>

            <div className='text-center'>
                <p className='centerH'>Executive Summary</p>
                <p className='centerHp'>Make sure you answer all questions</p>
                <img src={bro} className='bro'></img>
               
            </div>
            <p className='question'>Why do you want to start a Company</p>
            <div className='container-textAs'>
                <textarea className='textAs'></textarea>
            </div>
            <p className='suggest'>Your answer shouldn’t be about money, It should be about solving a problem</p>
        </div> 

        <button className="btn btn-primary curveNext">Next</button>
    </div>



        
   </div>
    




     
    </div>
  );
}

export default App;
