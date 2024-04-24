import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';


function FinancialProject ()  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(``)
    return (

            <>
    
    <div className='container-fluid'>
        <Header />
        <div className='row'>
        <Menu /> 
            
            <div className='col-md-9'>
                <img src={bci} className='bcA'></img>
                    <p className='centerH'>Financial Projection</p>
                    <p className='centerHp'>Make sure you answer all question</p>
            <div className='centerM'>
            <div className='container divMonth'>
                <div className='month'>
                <div className='monthOn' type='button'>Month on Month</div>
                <div className='monthOn' type='button' >Year on Year</div>
                </div>
                </div>
            </div> 
      </div>
      </div>
      </div>
      </>
        );
}

export default FinancialProject