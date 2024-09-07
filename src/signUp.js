// SignUp.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ReactGA from "react-ga4";
import { handleTogglePassword, handleToggleCPassword, validatePassword, createUser } from './utils/signUpUtils.js';

function SignUp() {
  ReactGA.initialize("G-P450CRB987");
  ReactGA.send({ 
   hitType: "pageview", 
   page: window.location.pathname, 
   title: "Sign Up" 
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    number: false,
    capital: false,
    special: false,
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    cpassword: '',
  });
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://craddule.com/bg4.jpg",
    "https://craddule.com/bg3.jpg",
    "https://craddule.com/bg5.jpg",
  ];

  const navigate = useNavigate();

  const onClickHandler = () => navigate(`/login`);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.clear();
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    if (id === 'password') {
      validatePassword(value, setPasswordValid);
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordValid.length || !passwordValid.number || !passwordValid.capital || !passwordValid.special) {
      toast.error('Password does not meet the requirements');
      return;
    }
    createUser(formData, setLoading, navigate);
  };

  return (
    <div className='container'>
      <div className='wholeP'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='loginH'>
              <p className='lgT'>Sign Up</p>
              <p className='lgT2'>Start your journey with Craddule</p>

              <form onSubmit={handleSubmit}>
                <div className="inputs-container">
                  <label htmlFor="firstName" className='lab'>First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="custom-input"
                  />

                  <label htmlFor="lastName" className='lab'>Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="custom-input"
                  />

                  <label htmlFor="email" className='lab'>Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="custom-input"
                  />

                  <label htmlFor="phoneNumber" className='lab'>Phone Number</label>
                  <PhoneInput
                    country={'ng'}
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    inputProps={{
                      name: 'phoneNumber',
                      required: true,
                      autoFocus: true,
                      className: 'custom-input2',
                    }}
                  />

                  <label htmlFor="password" className='lab'>Password</label>
                  <div className="password-validation">
                    <span className={passwordValid.length ? 'valid' : 'invalid'}>
                      Minimum 8 characters
                    </span>
                    <span className={passwordValid.number ? 'valid' : 'invalid'}>
                      At least 1 number
                    </span>
                    <span className={passwordValid.capital ? 'valid' : 'invalid'}>
                      1 capital letter
                    </span>
                    <span className={passwordValid.special ? 'valid' : 'invalid'}>
                      1 special character
                    </span>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="custom-input"
                  />
                  <span className="password-toggle" onClick={() => handleTogglePassword(showPassword, setShowPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                  </span>

                  <label htmlFor="cpassword" className='lab'>Confirm Password</label>
                  <input
                    type={showCPassword ? 'text' : 'password'}
                    id="cpassword"
                    value={formData.cpassword}
                    onChange={handleChange}
                    className="custom-input"
                  />
                  <span className="password-toggle" onClick={() => handleToggleCPassword(showCPassword, setShowCPassword)}>
                    {showCPassword ? 'Hide' : 'Show'}
                  </span>
                </div>

                <button className='btn loginBtn' type="submit" disabled={loading}>
                  {loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' />}
                  {!loading && <span>Proceed</span>}
                </button>
              </form>

              <p className='lab'>Already on Craddule? <a href='' onClick={onClickHandler}>Login</a> now!</p>
            </div>
          </div>

          <div className='col-md-6'>
            <div
              className='halfWh'
              style={{ backgroundImage: `url(${images[currentImage]})` }}
            >
              <div className='blurry'>
                <p>You will never do anything in this world without courage. It is the greatest quality of the mind next to honor.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default SignUp;
