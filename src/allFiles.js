import React from 'react';
import bci from './images/bc.png'; 
import excel from './images/excel.png'; 
import Rect from './images/Rect.png'
import Header from './component/header';
import pdf from './images/pdf.png';
import Menu from './component/menu';
import cloud from './images/cloud.png'
import { useNavigate } from 'react-router-dom';




function AllFiles ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/pageBenefit`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <img src={bci} className='bcA'></img>
        <div className='centerC'>
            <div className='text-center'>
            <p className='centerH'>All Files</p>
            <div class="flex-container boxRA">
                    <div type='button' className='hdds'>Recent</div>
                    <div type='button'className='hdds'>Started</div>
                    <div type='button'className='hdds'>Shared</div>
                </div> 
                
        
        <div className='wrapper2'>
            <div className='columns'>
               <div className='column'>
                    <img src={pdf} className='imgX' ></img>
               </div> 

               <div className='column'>
                    <img src={excel} className='imgX' ></img>
               </div> 

               <div className='column'>
                    <img src={pdf} className='imgX' ></img>
               </div> 

               <div className='column'>
                    <img src={pdf} className='imgX' ></img>
               </div> 

               <div className='column'>
                    <img src={excel} className='imgX' ></img>
               </div> 

               <div className='column'>
                    <img src={pdf} className='imgX' ></img>
               </div> 

               <div className='column'>
                    <img src={excel} className='imgX' ></img>
               </div> 

               <div className='column'>
                    <img src={pdf} className='imgX' ></img>
               </div> 

               <div className='column'>
                    <img src={pdf} className='imgX' ></img>
               </div> 
             

            </div>
        </div>
            
            </div>
           
        </div> 
  
       
           
          
  </div>
  </div>
  </div>
  </>
    );
}

export default AllFiles
