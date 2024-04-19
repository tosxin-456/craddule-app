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
                    <div type='button'className='hds'>Started</div>
                    <div type='button'className='hds'>Shared</div>
                </div> 
                <div className='container-boxkA'>
                <p className='file'>Name +</p> 

                <div className='container-image'>
                  <div className='flex-container1 imageBoxZ'><img src={pdf} className='imgX' ></img>
                  <div className='textH'><img src= {pdf} className='smImg'></img><div className='fileTxt'><p className='toptxt'>Value proposition pack</p>Team A folder: 4 items</div></div></div> 
                  <div className='flex-container1 imageBoxZ'><img src={excel} className='imgX' ></img>
                  <div className='textH'><img src= {excel} className='smImg'></img ><div className='fileTxt'><p className='toptxt'>Business Analysis</p>File page: 10</div></div></div> 
                  <div className='flex-container1 imageBoxZ'><img src={excel} className='imgX' ></img>
                  <div className='textH'><img src= {excel} className='smImg'></img><div className='fileTxt'><p className='toptxt'>Wireframe</p>File page: 10</div></div></div> 
                  </div>
                  <div className='container-image'>
                  <div className='flex-container1 imageBoxZ'><img src={pdf} className='imgX' ></img>
                  <div className='textH'><img src= {pdf} className='smImg'></img><div className='fileTxt'><p className='toptxt'>Ideation</p>File page: 4</div></div></div> 
                  <div className='flex-container1 imageBoxZ'><img src={pdf} className='imgX' ></img>
                  <div className='textH'><img src= {pdf} className='smImg'></img><div className='fileTxt'><p className='toptxt'>Financials</p>File page: 10</div></div></div> 
                  <div className='flex-container1 imageBoxZ'><img src={excel} className='imgX' ></img>
                  <div className='textH'><img src= {excel} className='smImg'></img><div className='fileTxt'><p className='toptxt'>Financials</p>Team folder: 24 items</div></div></div> 
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