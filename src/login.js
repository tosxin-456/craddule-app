// Login.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { handleTogglePassword, login } from './utils/loginUtils.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const images = [
    "https://craddule.com/bg4.jpg",
    "https://craddule.com/bg3.jpg",
    "https://craddule.com/bg5.jpg",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData, setLoading, navigate);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container'>
      <div className='wholeP'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='loginH'>
              <p className='lgT'>Login</p>
              <p className='lgT2'>Fill in necessary details to proceed</p>
              <form onSubmit={handleSubmit}>
                <div className="inputs-container">
                  <label htmlFor="email" className='lab'>Email or Phone Number</label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="custom-input"
                  />

                  <label htmlFor="password" className='lab'>Password</label>
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
                </div>

                <button type="submit" className='btn loginBtn' disabled={loading}>
                  {loading ? <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' /> : <span>Login</span>}
                </button>
              </form>
              <button className='btn loginBtn2' onClick={() => navigate(`/signUp`)}>Sign Up</button>
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

export default Login;
