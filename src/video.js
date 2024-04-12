import React from 'react';
import bci from './images/bc.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';




function Video ()  {

    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/problemstatement`)
    return (
        <>

        <Header />
        <Menu />
        
        <div className='col-md-10 align'>
        <div className='centerC'>
            <img src={bci} className='bcI'></img>

            <div className='text-center'>
            <p className='centerH'>Problem Statement</p>
                <p className='centerHp'>Make sure you answer all questions</p>
            <div class = "spaceB"></div>
            <iframe src="https://www.youtube.com/embed/NBd6yJBzyis?si=QTR7Qu_dLDkhRFmR" title="Iframe Example"></iframe>
            <div class = "spaceB"></div>
            </div>
            <p className='question'>Why do you want to start a Company?</p>
            <div className='container-textAs'>
                <textarea className='textAs'></textarea>
            </div>
            <p className='suggest'>Your answer shouldn't be about money, It should be about solving a problem</p>
        </div> 

        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
  </div>
  </>
    );
}

export default Video


{/*    <div className='col-md-10 align'>
        <div className='centerC'>
            <img src={bci} className='bcI'></img>

            <div className='text-center'>
            <div class = "spaceA"></div>
            <iframe src="https://www.youtube.com/embed/NBd6yJBzyis?si=QTR7Qu_dLDkhRFmR" title="Iframe Example"></iframe>
            <div class = "spaceB"></div>
            </div>
            <p className='question'>Why do you want to start a Company?</p>
            <div className='container-textAs'>
                <textarea className='textAs'></textarea>
            </div>
            <p className='suggest'>Your answer shouldn't be about money, It should be about solving a problem</p>
        </div> 

        <button className="btn btn-primary curveNext">Next</button>
  </div> */}