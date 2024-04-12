import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';



function Introduction ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/sectionIntro`)
    return (
        <>

        <Header />
        <Menu />

        <div className='col-md-10 align'>
        <div className='centerC'>
        <img src={bci} className='bcI'></img>

            <div className='text-center'>
                <p className='textHp'>Introduction</p>
                <p className='textH'>Make sure you answer all questions</p>
                <div class = "space"></div>
            </div>
            <p className='question'>Why do you want to start a Company?</p>
            <div className='container-textAs'>
                <textarea className='textAs'></textarea>
            </div>
            <button className="btn btn-primary save">Save</button>
            <button className="btn btn-primary edit">Edit</button>
            
            <div class = "break"></div>
        </div> 

        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
  </div>
        </>
    );
}

export default Introduction