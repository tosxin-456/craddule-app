import React, { useState } from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';
import CollaboratorModal from './component/collaboratorModal'
import { useNavigate } from 'react-router-dom';




function SectionManagement ()  {
    const navigate = useNavigate()
    const [isOpen, setIsOpen]= useState(false);


    const onClickHandler = () => navigate(`/pageShare`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <img src={bci} className='bcA'></img>
        <div className='centerC'>
            
            <div><p className='centerH1a'>Team Management</p>
            <p className='centerHp1a'>View, manage your memebers and send invites</p>
            <button className="btn btn-primary curveN">Save changes</button>
            <button className="btn btn-primary curveI">Discard changes</button></div>
            <input type="text" className='input2' placeholder="Search.."></input>
            {/*<button className="btn btn-primary curveX">Chat and message</button>*/}
            <div><button className="btn btn-primary curvej" onClick={()=>setIsOpen(true)}>Send Invite</button>
</div>
              <div className='container-team'>
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
                <div><input type="checkbox" id="checkbox" name="checkbox"></input>
                <label for="checkbox" className='checkbox' type='button'>NDA - Standard Non Disclosure Agreements (if neccessary for a project)</label></div>
                               
        </div> 
        </div>
        <CollaboratorModal open={isOpen} onClose={() => setIsOpen(false)}>

    </CollaboratorModal>   
          
  </div>
  </div>
  </div>
  </>
    );
}

export default SectionManagement
