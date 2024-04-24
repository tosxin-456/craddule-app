import React, { useState } from 'react';
import bci from './images/bc.png'; 
import bob from './images/bob.png'; 
import Header from './component/header';
import SettingMenu from './component/settingMenu';
import { useNavigate } from 'react-router-dom';





function PageSub ()  {
  const [isOpen, setIsOpen]= useState(false);

    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/Solution`)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    return (
        <>
 <div className='container-fluid'>
    <Header />
    <div className='row'>
    <SettingMenu /> 
        
        <div className='col-md-9'>
        <h1 className='centerHh'>Settings</h1>
        <p className='centerHh'>View and manage settings</p>
       {/*} <button className="btn btn-primary curveNn">Save changes</button>
        <button className="btn curveIi">Discard changes</button>
        {/*<div className='gene'>General Setting</div>*/}
        <div className='centerS'>
          {/*<div>
            <p>Change Password</p>
            <p>Create a new password</p>
    </div>*/}
         <div>
            <h1 className='lgT1'>Forget Password</h1>
            <p className='lgT2'>Create new password</p>

            <div className="inputs-container">
           {/*  <label htmlFor="password" className='lab1'>Current Password</label>
                
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="custom-input1"
                  placeholder='*************'
                />*/}

                <label htmlFor="password" className='lab1'>New Password</label>
                
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input1"
                    placeholder='Input New Password'
                  />

                    <span className="password-toggle1" onClick={handleTogglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                  
                  <label htmlFor="password" className='lab1'>Confirm New Password</label>
                
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input1"
                    placeholder='Confirm New Passowrd'
                  />
                
                <span className="password-toggle1" onClick={handleTogglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                    <div className='changeButton'><button className="btn btn-primary deleteButton">Save Change</button>
                    </div>
                  
              </div>
    </div>
        </div> 
        {/*<div className='centerC'>
          {/*<div>
            <p>Change Password</p>
            <p>Create a new password</p>
    </div>*/}
         {/*<div>
            <h1 className='lgT1'>Change Password</h1>
            <p className='lgT2'>Create new password</p>

  <button className="btn btn-primary deleteButton" onClick={()=>setIsOpen(true)}>Delete Account</button>


            
    </div>
        </div> */}
  
  
      {/*  <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>*/}
           
          
  </div>
 
  </div>
  </div>
  </>
    );
}

export default PageSub