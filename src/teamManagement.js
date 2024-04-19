import React from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';




function TeamManagement ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(``)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <div className='centerC'>
            <img src={bci} className='bcI'></img>

            <div className='text-center'>
                <p className='centerH'>Getting your Team</p>
                <p className='centerHp'>Make sure you answer all questions</p>               
            </div>
            <p className='centerH1'>Team Management</p>
            <p className='centerHp1'>View, manage your memebers and send invites</p>
            <input type="text" className='input2' placeholder="Search.."></input>
            <p type='button' className='curveSend'>Invite</p>
                    <div class="flex-container boxG">
                    <div className='listT'>Name</div>
                    <div className='listU'>Team Members Permission</div>
                    <div>Revoke team member access</div>
                </div>
                <div class="flex-container boxH">
                    <div className='listT1'>Adunni Arike</div>
                    <div type="button" data-toggle="dropdown" className='dropdown-toggle lst'>Change permission</div>
                    <div type="button" data-toggle="dropdown" className='dropdown-toggle txtp1'>Choose</div>
                </div> 
                <div class="flex-container boxH">
                    <div className='listT2'>Jeddiah Joshua</div>
                    <div type="button" data-toggle="dropdown" className='dropdown-toggle lstS'>Change permission</div>
                    <div type="button" data-toggle="dropdown" className='dropdown-toggle txtp2'>Choose</div>
                </div>  
                <div class="flex-container boxH">
                    <div className='listT3'>Mark Joel</div>
                    <div type="button" data-toggle="dropdown" className='dropdown-toggle lisS'>Change permission</div>
                    <div type="button" data-toggle="dropdown" className='dropdown-toggle txtp2'>Choose</div>
                </div> 
                <div class="flex-container boxI">
                    <div className='listT4'>Titilope Seun</div>
                    <div type="button" data-toggle="dropdown" className='dropdown-toggle lstS'>Change Permission</div>
                    <div type="button" data-toggle="dropdown" className='dropdown-toggle txtp4'>Choose</div>
                </div> 
        </div> 
  
        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
           
          
  </div>
  </div>
  </div>
  </>
    );
}

export default TeamManagement