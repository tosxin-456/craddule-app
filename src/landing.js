import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import bci from './images/bc.png';
import bro from './images/bro.png';
import HeaderHome from './component/headerHome';
import MenuHome from './component/menuHome';



import React, { useState } from 'react';

import p1 from './images/p1.jpeg';
import p2 from './images/p2.jpeg';
import p3 from './images/p3.jpeg';
import bolt from './images/bolt.png';
import bloob from './images/bloob2.png';
import Modal from './component/modal';







function LandingPage() {

    //useEffect(() => {
    //     const wow = new WOW.WOW();
    //     wow.init();
    //   }, []);
    
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const [isOpen, setIsOpen]= useState(false);
    const [progress, setProgress] = useState(40);
    const [progressT, setProgressT] = useState(50);
    const [progressT2, setProgressT2] = useState(50);
    const [progressT3, setProgressT3] = useState(50);
    const [progressT4, setProgressT4] = useState(50);
  return (

   <div className='container-fluid'>
    <HeaderHome />
    <div className='row'>
    <MenuHome />       
   


  
  


    
  
 
  <div className='col-md-6'>
    <div className='row'>
      <div className='col-md-6'>
        <div className='centerD'>
            <p className='pna'>The Golden Shoe</p>
            <progress value={progress} max="100"></progress>
            <p className='pna2'>Job is 40% done</p>
            <div class="proTeam">
                      <img src={p3} alt="Circular Image" className="circular-image-top"/>
                  </div>

                  <div class="proTeam">
                      <img src={p2} alt="Circular Image" className="circular-image-top"/>
                  </div>
          </div> 

          <div className='centerD2'>
            <p className='pna'>The Golden Shoe</p>
            <progress value={progress} max="100"></progress>
            <p className='pna2'>Job is 40% done</p>
            <div class="proTeam">
                      <img src={p3} alt="Circular Image" className="circular-image-top"/>
                  </div>

                  <div class="proTeam">
                      <img src={p2} alt="Circular Image" className="circular-image-top"/>
                  </div>
          </div> 

       </div>

       <div className='col-md-6'>
        <div className='centerD2'>
            <p className='pna'>The Golden Shoe</p>
            <progress value={progress} max="100"></progress>
            <p className='pna2'>Job is 40% done</p>
            <div class="proTeam">
                      <img src={p3} alt="Circular Image" className="circular-image-top"/>
                  </div>

                  <div class="proTeam">
                      <img src={p2} alt="Circular Image" className="circular-image-top"/>
                  </div>
          </div> 

          <div className='centerD'>
            <p className='pna'>The Golden Shoe</p>
            <progress value={progress} max="100"></progress>
            <p className='pna2'>Job is 40% done</p>
            <div class="proTeam">
                      <img src={p3} alt="Circular Image" className="circular-image-top"/>
                  </div>

                  <div class="proTeam">
                      <img src={p2} alt="Circular Image" className="circular-image-top"/>
                  </div>
          </div> 
       </div>  

    </div>

    <p className='ra'>Recent Activities</p>
    <div className='row'>
      <div className='col-md-6'>
        <div className='actH'>
          <div className='row'>
            <div className='col-md-3'>
              <div class="proTeamI">
                <img src={p2} alt="Circular Image" className="circular-image-top"/>
              </div>
            </div>

            <div className='col-md-9'>
                <p className='rp1'>Kamarash</p>
              <p className='rp2'>Just finished the Introduction</p>
            </div>
          </div>
         
          
        </div>
      </div>

      <div className='col-md-6'>
        <div className='actH'>
          <div className='row'>
            <div className='col-md-3'>
              <div class="proTeamI">
                <img src={p2} alt="Circular Image" className="circular-image-top"/>
              </div>
            </div>

            <div className='col-md-9'>
                <p className='rp1'>Kamarash</p>
              <p className='rp2'>Just finished the Introduction</p>
            </div>
          </div>
         
          
        </div>
      </div>

      <div className='col-md-6'>
        <div className='actH'>
          <div className='row'>
            <div className='col-md-3'>
              <div class="proTeamI">
                <img src={p2} alt="Circular Image" className="circular-image-top"/>
              </div>
            </div>

            <div className='col-md-9'>
                <p className='rp1'>Kamarash</p>
              <p className='rp2'>Just finished the Introduction</p>
            </div>
          </div>
         
          
        </div>
      </div>

      <div className='col-md-6'>
        <div className='actH'>
          <div className='row'>
            <div className='col-md-3'>
              <div class="proTeamI">
                <img src={p2} alt="Circular Image" className="circular-image-top"/>
              </div>
            </div>

            <div className='col-md-9'>
                <p className='rp1'>Kamarash</p>
              <p className='rp2'>Just finished the Introduction</p>
            </div>
          </div>
         
          
        </div>
      </div>
    
    </div>
    
  </div>  

  <div className='col-md-3'>
    <div className='row'>
      <div className='col-md-6'>
        <div className='calH'>
          <p className='dat'>18</p>
          <p className='dat2'>April 2024</p>
        </div>
      </div>

      <div className='col-md-6'>
        <div className='calH2'>
          
        <img src={bolt} alt="Streak" className="datImage"/>
          
          <p className='dat2'>40 Days!</p>
        </div>
      </div>

    </div>
    <div className='createP' onClick={()=>setIsOpen(true)}>
      <p className='crea1'>Create New</p>
      <p className='crea1'>Project</p>
    </div>
    <div className='progTeam'>
      <p className='teamP'>UI Design</p>
      <progress value={progressT} max="100" className='progressB'></progress>
      <p className='teamP2'>23% Done</p>

      <div className='spacer'></div>

      <p className='teamP'>Prototype</p>
      <progress value={progressT} max="100"></progress>
      <p className='teamP2'>23% Done</p>

      <div className='spacer'></div>
      
      <p className='teamP'>Product Definition</p>
      <progress value={progressT} max="100"></progress>
      <p className='teamP2'>23% Done</p>

    </div>
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>

    </Modal>
  </div>
     
  </div> 

</div>
  );
}

export default LandingPage;
