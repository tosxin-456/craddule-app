import React, { useState } from 'react';
import bci from './images/bc.png'; 
import Rect from './images/Rect.png'
import present from './images/present.png';
import Rectan from './images/Rectan.png';
import proto from './images/proto.png';
import wire from './images/wire.png'
import wire1 from './images/wire1.jpeg'
import wire2 from './images/wire2.jpeg'
import wire3 from './images/wire3.png'
import wire4 from './images/wire4.jpeg'
import wire5 from './images/wire5.jpeg'
import wire6 from './images/wire6.jpeg'
import wire7 from './images/wire7.jpeg'
import wire8 from './images/wire8.jpeg'
import Header from './component/header';
import UploadLogoModal from './component/brandLogoModal'
import Menu from './component/menu';
import cloud from './images/cloud.png'
import { useNavigate } from 'react-router-dom';




function WireFrame ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/pageFrontView`)
    const [isOpen, setIsOpen]= useState(false);

    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <img src={bci} className='bcA'></img>
                <p className='centerH'>WireFrame</p>
                <p className='centerHp'>Here you get the wireframe of your product</p>
        <div className='lenght'>
            <div className='text-center'>
                <div className='container-boxkk'>
               <div type="button" className='clod'onClick={()=>setIsOpen(true)}><img src={cloud} className='imgC' onClick={()=>setIsOpen(true)}></img>Upload</div> 

                <div className='imgbox'>
                  <img src={proto} className='imgA' ></img>
                  <img src={wire} className='imgA' ></img>
                  <img src={wire1} className='imgA' ></img>
                  <img src={wire2} className='imgA' ></img>
                  <img src={wire3} className='imgA' ></img>
            
                  <img src={wire4} className='imgA' ></img>
                  <img src={wire5} className='imgA' ></img>
                  <img src={wire6} className='imgA' ></img>
                  <img src={wire7} className='imgA' ></img>
                  <img src={wire8} className='imgA' ></img>
                  </div>
                </div> 
                <div class="container-boxj">
                  <img src={proto} className='imgh'></img>    
                  <img src={proto} className='imgh'></img>   
                  <img src={proto} className='imgh'></img> 
                  <img src={proto} className='imgh'></img> 
                  <img src={proto} className='imgh'></img> 
                  <img src={proto} className='imgh'></img>              
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

export default WireFrame