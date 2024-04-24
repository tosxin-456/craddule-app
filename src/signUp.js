import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';

function SignUp() {

    //useEffect(() => {
    //     const wow = new WOW.WOW();
    //     wow.init();
    //   }, []);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    const navigate = useNavigate()
    const onClickHandler = () => navigate(`/login`)
    const onClickHandler1= () => navigate(`/password`)
  return (

<div className='container'>
   <div className='wholeP'>
    <div className='row'>
        <div className='col-md-6'>
          <div className='loginH'>
            <p className='lgT'>Sign Up</p>
            <p className='lgT2'>Start your journey with Craddule</p>

            <div className="inputs-container">
                <label htmlFor="email" className='lab'>Full Name</label>
                <input
                  type="text"
                  id="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="custom-input"
                />

                <label htmlFor="email" className='lab'>Email</label>
                <input
                  type="email"
                  id="email"
                  value={text}
                  onChange={(e) => setEmail(e.target.value)}
                  className="custom-input"
                />


                <label htmlFor="email" className='lab'>Username</label>
                <input
                  type="text"
                  id="text"
                  value={text}
                  onChange={(e) => setEmail(e.target.value)}
                  className="custom-input"
                /> 

                <label htmlFor="password" className='lab'>Password</label>
                
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input"
                  />
                   <span className="password-toggle" onClick={handleTogglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                  
                <label htmlFor="password" className='lab'>Confirmm Password</label>
                
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="custom-input"
                />
                
                <span className="password-toggle" onClick={handleTogglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
              </div>

              <button className='btn loginBtn' onClick={onClickHandler1}>Proceed</button>
              <p className='lab'>Already on Craddule? <a href=''onClick={onClickHandler}>Login</a> now!</p>
          </div>
          
        </div>

        <div className='col-md-6'>
          <div className='halfWh'>
            <div className='blurry'>
              <p>You will never do anything in this world without courage. It is the greatest quality of the mind next to honor</p>

              
            </div>
          </div>
        </div>
    </div>
    
      
   </div>

</div>
  );
}

export default SignUp;
