import React, { useState } from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Rect from './images/Rect.png'
import Header from './component/header';
import proto from './images/proto.png';
import Menu from './component/menu';
import cloud from './images/cloud.png'
import UploadLogoModal from './component/brandLogoModal'
import { useNavigate } from 'react-router-dom';




function Prototype ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(``)
    const [isOpen, setIsOpen]= useState(false);
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <img src={bci} className='bcA'></img>
                <p className='centerH'>Prototype</p>
                <p className='centerHp'>Here you get the wireframe of your product</p>
        <div className='centerC'>
            <div className='text-center'>
                <div className='container-boxkk'>
               <div type="button" className='clod' onClick={()=>setIsOpen(true)}><img src={cloud} className='imgC' onClick={()=>setIsOpen(true)}></img>Upload</div> 

                <div className='imgbox'>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
            
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  <img src={Rect} className='imgA' ></img>
                  </div>
                </div> 
                <div class="container-boxyy">
                  <img src={proto} className='imgB1'></img>                  
                </div>         
            </div>
            <UploadLogoModal open={isOpen} onClose={() => setIsOpen(false)}>

</UploadLogoModal>
        </div> 
  
        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
           
          
  </div>
  </div>
  </div>
  </>
    );
}

export default Prototype
