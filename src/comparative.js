import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';


function Comparative ()  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(``)
     const onClickHandler1 = () => navigate(``)
    return (

            <>
    
    <div className='container-fluid'>
        <Header />
        <div className='row'>
        <Menu /> 
            
            <div className='col-md-9'>
                <img src={bci} className='bcA' type='button' onClick={onClickHandler1}></img>
                    <p className='centerH'>Comparative Analaysis</p>
                    <p className='centerHp'>Make sure you answer all question</p>
            <div className='container-fluid centerM3'>
            <div className='container divMonth2'>
                <div className='containTitle'>Company</div>
                <div className='month1'>
                    <div className='flexy'>
                <div className='monthOn2R' type='button'></div>
                </div>            
                </div>
                <div className='flexy'>
                <div className='monthOn2W' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2S' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2F' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2K' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2V' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2O' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2H' type='button'></div>
                </div>
                </div>

                <div className='container divMonth2'>
                <div className='containTitle'>Variables</div>
                <div className='month1'>
                    <div className='flexy'>
                <div className='monthOn2T' type='button'></div>
                </div>            
                </div>
                <div className='flexy'>
                <div className='monthOn2Z' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2Q' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2D' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2B' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2I' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2M' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2N' type='button'></div>
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

export default Comparative