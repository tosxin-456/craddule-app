import React from 'react';
import bci from './images/bc.png'; 
import bob from './images/bob.png'; 
import Header from './component/header';
import SettingMenu from './component/settingMenu';
import { useNavigate } from 'react-router-dom';




function GeneralSetting ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/Solution`)
    return (
        <>
 <div className='container-fluid'>
    <Header />
    <div className='row'>
    <SettingMenu /> 
        
        <div className='col-md-9'>
        <h1 className='centerHh'>Setting</h1>
        <button className="btn btn-primary curveNn">Save changes</button>
        <button className="btn curveIi">Discard changes</button>
        {/*<div className='gene'>General Setting</div>*/}
        <div className='centerS'>
          
        </div> 
  
        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
           
          
  </div>
  </div>
  </div>
  </>
    );
}

export default GeneralSetting