import React from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Rect from './images/Rect.png'
import Header from './component/header';
import present from './images/present.png';
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
                    <div type='button' className='hd'>Recent</div>
                    <div type='button'className='hd'>Started</div>
                    <div type='button'className='hd'>Shared</div>
                </div> 
                <div className='container-boxkA'>
                <p className='file'>Make sure you answer all questions</p> 

                <div className='container-image'>
                  <div className='flex-container imageBoxZ'><img src={Rect} className='imgX' ></img>
                  <p className='textH'>Make sure you answer all questions</p></div> 
                  <div className='flex-container imageBoxZ'><img src={Rect} className='imgX' ></img>
                  <p className='textH'>Make sure you answer all questions</p></div> 
                  <div className='flex-container imageBoxZ'><img src={Rect} className='imgX' ></img>
                  <p className='textH'>Make sure you answer all questions</p></div> 
                  </div>
                  <div className='container-image'>
                  <div className='flex-container imageBoxZ'><img src={Rect} className='imgX' ></img>
                  <p className='textH'>Make sure you answer all questions</p></div> 
                  <div className='flex-container imageBoxZ'><img src={Rect} className='imgX' ></img>
                  <p className='textH'>Make sure you answer all questions</p></div> 
                  <div className='flex-container imageBoxZ'><img src={Rect} className='imgX' ></img>
                  <p className='textH'>Make sure you answer all questions</p></div> 
                  </div>
                </div>          
            </div>
           
        </div> 
  
        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
           
          
  </div>
  </div>
  </div>
  </>
    );
}

export default AllFiles