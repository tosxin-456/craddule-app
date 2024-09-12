// Login.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { handleTogglePassword, login } from './utils/loginUtils.js';
import design from './images/design.png'

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
    <>
      <div className='mt-[100px]'></div>
      <div className='w-[90%] m-auto grid grid-cols-2 bg-white rounded-xl'>
        <div className='p-10 px-20'>
            <h3 className='font-bold'>Welcome back!</h3>
            <p className='texet-[16px] text-black200'>Continue your growth with Craddule!</p>
            <form onSubmit={handleSubmit} className='mt-14'>
              <div className="mb-8 ">
                <label htmlFor="email" className='text-p18 pb-1'>Email</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border border-black400 px-3 py-2 rounded-full"
                />
              </div>
              <div className='relative'>
                <label htmlFor="password" className='text-p18 pb-1 block'>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-black400 px-3 py-2 rounded-full"
                />
                <span className="absolute top-9 right-5 cursor-pointer" onClick={() => handleTogglePassword(showPassword, setShowPassword)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className={showPassword ? 'hidden' : 'block'}>
                    <rect width="24" height="24" fill="none" />
                    <path fill="#526484" d="M2.54 4.71L3.25 4L20 20.75l-.71.71l-3.34-3.35c-1.37.57-2.87.89-4.45.89c-4.56 0-8.5-2.65-10.36-6.5c.97-2 2.49-3.67 4.36-4.82zM11.5 18c1.29 0 2.53-.23 3.67-.66l-1.12-1.13c-.73.5-1.6.79-2.55.79C9 17 7 15 7 12.5c0-.95.29-1.82.79-2.55L6.24 8.41a10.64 10.64 0 0 0-3.98 4.09C4.04 15.78 7.5 18 11.5 18m9.24-5.5C18.96 9.22 15.5 7 11.5 7c-1.15 0-2.27.19-3.31.53l-.78-.78C8.68 6.26 10.06 6 11.5 6c4.56 0 8.5 2.65 10.36 6.5a11.47 11.47 0 0 1-4.07 4.63l-.72-.73c1.53-.96 2.8-2.3 3.67-3.9M11.5 8C14 8 16 10 16 12.5c0 .82-.22 1.58-.6 2.24l-.74-.74c.22-.46.34-.96.34-1.5A3.5 3.5 0 0 0 11.5 9c-.54 0-1.04.12-1.5.34l-.74-.74c.66-.38 1.42-.6 2.24-.6M8 12.5a3.5 3.5 0 0 0 3.5 3.5c.67 0 1.29-.19 1.82-.5L8.5 10.68c-.31.53-.5 1.15-.5 1.82" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className={showPassword ? 'block' : 'hidden'}>
                    <rect width="24" height="24" fill="none" />
                    <path fill="#526484" d="M11.5 18c4 0 7.46-2.22 9.24-5.5C18.96 9.22 15.5 7 11.5 7s-7.46 2.22-9.24 5.5C4.04 15.78 7.5 18 11.5 18m0-12c4.56 0 8.5 2.65 10.36 6.5C20 16.35 16.06 19 11.5 19S3 16.35 1.14 12.5C3 8.65 6.94 6 11.5 6m0 2C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9" />
                  </svg>
                </span>
              </div>
              <div className='flex justify-between text-[16px] mt-3'>
                <div>
                  <input type="checkbox" name="remember_me" id="remember-me" />
                  <label htmlFor="remember-me ps-1">Remember me</label>
                </div>
                <div>
                  <p className='text-[#1B45BF]'>Forgot password?</p>
                </div>
              </div>
              <button type="submit" className='btn loginBtn' disabled={loading}>
                {loading ? <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' /> : <span>Login</span>}
              </button>
            </form>
            <p className='mt-8'>Not registered yet?<a className='' href='/signUp'>Create an Account</a></p>
        </div>
        <div className='bg-[#193FAE]'>
          <img src={design} alt="" className="w-[196px] h-[219px]" />
        </div>
      </div>
      <div className='mb-[100px]'></div>
    </>
  );
}

export default Login;
