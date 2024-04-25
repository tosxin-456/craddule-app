import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';


function ProfitPageMOM ()  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/customerInfluxMoM`)
     const onClickHandler1 = () => navigate(`/financialP`)
    return (

            <>
    
    <div className='container-fluid'>
        <Header />
        <div className='row'>
        <Menu /> 
            
            <div className='col-md-9'>
                <img src={bci} className='bcA' type='button' onClick={onClickHandler1}></img>
                    <p className='centerH'>Operating Income</p>
            <div className='container-fluid centerM1'>
             
             <div className='inputYear'><input className='yearInput' placeholder='Input title of graph'></input></div>
                <div className='year'>Year 1</div>
            <div className='container divMonth1'>
                <div className='month1'>
                 
                    <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>January</p>
                </div>            
                </div>
                <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>Febuary</p>
                </div>
                <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>March</p>
                </div>
                </div>

                <div className='container divMonth1'>
                <div className='month1'>
                    <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>April</p>
                </div>            
                </div>
                <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>May</p>
                </div>
                <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>June</p>
                </div>
                </div>

                <div className='container divMonth1'>
                <div className='month1'>
                    <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>July</p>
                </div>            
                </div>
                <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>August</p>
                </div>
                <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>September</p>
                </div>
                </div>

                <div className='container divMonth1'>
                <div className='month1'>
                    <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>October</p>
                </div>            
                </div>
                <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>November</p>
                </div>
                <div className='flexy'>
                <div className='monthOn1' type='button'></div>
                <p className='monthOn1T'>December</p>
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


export default ProfitPageMOM