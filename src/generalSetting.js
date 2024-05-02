import React, { useState } from 'react';
import bci from './images/bc.png'; 
import bob from './images/bob.png'; 
import Header from './component/header';
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner'
import SettingMenu from './component/settingMenu';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'






function GeneralSetting ()  {
  const [isOpen, setIsOpen]= useState(false);

    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/introduction1`)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);


    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const handleTogglePassword1 = () => {
      setShowPassword1(!showPassword1);
    };

    const handleTogglePassword2 = () => {
      setShowPassword2(!showPassword2);
    };


    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        npassword: '',
        cpassword: '',
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
         // Check if new password matches confirmation password
         if (formData.npassword !== formData.cpassword) {
          console.error('New password and confirmation password do not match');
          return;
      }
        changePassword(formData);
    
       
      };
    
      const changePassword = async (data) => {
        setLoading(true);
        try {

          
        console.log(data);
        console.log(JSON.stringify(data));
          const response = await fetch(API_BASE_URL+'/api/change-password' +userId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

         // const data = response.json();
    
          if (response.status === 200) {
            console.log(response.status);
            console.log(response);
            const responseData = await response.json(); // Parse JSON response
      
     
      const { token } = responseData; // Access token directly from response
      setLoading(false);
      // Save access token to local storage
      localStorage.setItem('access_token', token);
      console.log('Access Token:', token);
      localStorage.setItem('access_token', token);
            console.log('Password Changed');
              navigate(``)
          } else {
            const result = await response.json();
            setLoading(false);
            toast.error(result['error']);
              console.error('Error:', result['error']);
            //console.error('Failed to create User');
          }
        } catch (error) {
          setLoading(false);
          console.error('An error occurred:', error);
        }
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
        <img src={bci} className='bcA' type='button' onClick={onClickHandler}></img>
       {/*} <button className="btn btn-primary curveNn">Save changes</button>
        <button className="btn curveIi">Discard changes</button>
        {/*<div className='gene'>General Setting</div>*/}
        <div className='centerS'>
          {/*<div>
            <p>Change Password</p>
            <p>Create a new password</p>
    </div>*/}
         <div>
            <h1 className='lgT1'>Change Passowrd</h1>
            <p className='lgT2'>Create new password</p>
            <form onSubmit={handleSubmit}> 
            <div className="inputs-container">
            <label htmlFor="password" className='lab1'>Current Password</label>
                
                <input
                  type={showPassword2 ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="custom-input1"
                  placeholder='*************'
                />

                    <span className="password-toggle1" onClick={handleTogglePassword2}>
                    {showPassword2 ? 'Hide' : 'Show'}
                  </span>
                  

                <label htmlFor="npassword" className='lab1'>New Password</label>
                
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="npassword"
                    value={formData.npassword}
                    onChange={handleChange}
                    className="custom-input1"
                    placeholder='Input New Password'
                  />

                    <span className="password-toggle1" onClick={handleTogglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                  
                  <label htmlFor="cpassword" className='lab1'>Confirm New Password</label>
                
                  <input
                    type={showPassword1 ? 'text' : 'password'}
                    id="cpassword"
                    value={formData.cpassword}
                    onChange={handleChange}
                    className="custom-input1"
                    placeholder='Confirm New Passowrd'
                  />
                
                <span className="password-toggle1" onClick={handleTogglePassword1}>
                    {showPassword1 ? 'Hide' : 'Show'}
                  </span>
                    <div className='changeButton'><button type="submit" className="btn btn-primary deleteButton" disabled={loading}>{ loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Save</span>}
                
              </button>
                    </div>
                  
              </div>
              </form>
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
  <Toaster  position="top-right" />

  </div>
  </>
    );
}

export default GeneralSetting