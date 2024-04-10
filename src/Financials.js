import React from 'react';
import bci from './images/bc.png'; 
import bob from './images/bob.png';
import Header from './component/header';
import Menu from './component/menu';




function Fanancials ()  {
    return (
        <>

        <Header />
        <Menu />
    <div className='col-md-10 align'>
        <div className='centerC'>
            <img src={bci} className='bcI'></img>
            <div className='div-box'>
                <p className='centerH'>ROI and Financials</p>
                <p className='centerHp'>Make sure you answer all questions</p>
                {/*<img src={bob} className='bro'></img>*/}
                <div class = "spaceB"></div>
               <div className='box'>
                  <p className='quote'>"The most difficult thing is the decision to act, the rest is merely tenancity."</p>
                  <p className='author'>- Amelia Earhart</p> 
                </div>
                <div class = "spaceB"></div>
            </div>
             <p className='question'>Why do you want to start a Company?</p>
            <div className='container-textAs'>
                <textarea className='textAs'></textarea>
            </div>
            <p className='suggest'>Your answer shouldn't be about money, It should be about solving a problem</p>
        </div> 
  
        <button className="btn btn-primary curveNext">Next</button>
           
          
  </div>
  </>
    );
}

export default Fanancials