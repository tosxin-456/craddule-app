import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Toaster, toast } from 'sonner'
import { API_BASE_URL } from './config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import HeaderIdeation from './component/headerIdeation';
import { useParams } from 'react-router-dom';
import logo from './images/logo.png';
import loginImage from './images/login.png';
import design from './images/design.png';
import { ToastContainer } from 'react-toastify';
import signUpImage from './images/signup.png'
function SignUp() {

  const location = useLocation();

  // Construct the full URL
  const link = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
  console.log(link);
  const access_token = localStorage.getItem('access_token');
  const [showPassword, setShowPassword] = useState(false);

  const [showCPassword, setShowCPassword] = useState(false);


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const { id } = useParams();
  console.log(id);
  const handleToggleCPassword = () => {
    setShowCPassword(!showCPassword);
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const onClickHandler = () => navigate(`/login`)


  //Register

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    link: link,
    firstName: '',
    email: '',
    phoneNumber: '',
    speciality: '',
    experience: '',
    uniqueCode: id,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    createUser(formData);


  };



  const createUser = async (data) => {
    setLoading(true);
    try {



      console.log(data);

      const response = await fetch(API_BASE_URL + '/api/share/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      });

      // const data = response.json();

      if (response.status === 200) {
        console.log(response.status);
        console.log(response);

        const responseData = await response.json(); // Parse JSON response

        // Access the access_token from the response data
        const { access_token } = responseData.data;

        // Do something with the access_token
        console.log('Access Token:', access_token);
        localStorage.setItem('access_token', access_token);
        setLoading(false);
        navigate(`/home`);
        console.log('User created successfully');
      } else {
        const result = await response.json();
        setLoading(false);
        toast.error(result['error']);
        console.error('Error:', result['error']);

      }
    } catch (error) {
      setLoading(false);
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      <div className='mt-[100px]'></div>
      <div className='w-[90%] m-auto lg:grid lg:grid-cols-2 bg-white rounded-xl'>
        <div className='bg-[#193FAE] hidden lg:block relative'>
          <img src={design} alt="" className="w-[196px] h-[219px] absolute bottom-0 right-0" />
          <img src={design} alt="" className="w-[196px] h-[219px] absolute top-0 left-0 rotate-180" />
          <div className='flex justify-center items-center h-full'>

            <div className='w-fit m-auto'>
              <img src={signUpImage} className='m-auto'></img>
              <h4 className='font-semibold text-white w-3/4 text-center m-auto mt-3'>We help guide your ideas.</h4>
              <p className='text-[16px] text-white w-2/3 text-center m-auto mt-2'>Innovate seamlessly and accomplish your goals.</p>
            </div>
          </div>
        </div>
        <div className=' lg:p-10 lg:px-20 p-5 px-12 pt-10 lg:pt-16 lg:pb-20'>
          <div className='flex justify-start items-center lg:gap-[6px] relative -top-8 lg:-left-12 -left-10'>
            <img src={logo} className='w-[40.12px] h-[40px]'></img>
            <span className='text-[16px] font-semibold'>Craddule</span>
          </div>

          <div className='pt-3 '>
            <h3 className='font-bold'>Sign Up</h3>
            <p className='texet-[16px] text-black200'>Become a Reviewer</p>

            <form onSubmit={handleSubmit}>
              <div className="inputs-container">
                <label htmlFor="email" className='lab'>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
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


                <label htmlFor="phone" className='lab'>Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="custom-input"
                />


                <label htmlFor="speciality">Select Expertise:</label>
                <select
                  id="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                  className="custom-input"
                >
                  <option value="">Select Expertise</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Actor">Actor</option>
                  <option value="Architect">Architect</option>
                  <option value="Artist">Artist</option>
                  <option value="Astronomer">Astronomer</option>
                  <option value="Author">Author</option>
                  <option value="Chef">Chef</option>
                  <option value="Coach">Coach</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Content Creator">Content Creator</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Designer">Designer</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Economist">Economist</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="Journalist">Journalist</option>
                  <option value="Lawyer">Lawyer</option>
                  <option value="Marketer">Marketer</option>
                  <option value="Musician">Musician</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Photographer">Photographer</option>
                  <option value="Pilot">Pilot</option>
                  <option value="Professor">Professor</option>
                  <option value="Psychologist">Psychologist</option>
                  <option value="Researcher">Researcher</option>
                  <option value="Scientist">Scientist</option>
                  <option value="Social Worker">Social Worker</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Technician">Technician</option>
                  <option value="Veterinarian">Veterinarian</option>
                  <option value="Writer">Writer</option>
                </select>

                <label htmlFor="phone" className='lab'>Years of Experience</label>
                <input
                  type="number"
                  id="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="custom-input"
                />



              </div>


              <button className='btn loginBtn' type="submit" disabled={loading}>
                {loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' />}
                {!loading && <span>Proceed</span>}

              </button>
            </form>

            {/* <p className='mt-8 font-medium text-[16px]'>Already on Craddule?<a className='ps-2 no-underline text-[#1B45BF]' href='/login'>Login</a></p> */}
          </div>
        </div>
        <div className='mb-[200px]'></div>
       <div/>
       <ToastContainer/>
      </div>
    </>
  );
}

export default SignUp;
