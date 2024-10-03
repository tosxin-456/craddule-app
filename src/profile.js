import React, { useState, useEffect, useRef } from 'react';
import p1 from './images/p1.jpeg';
import Header from './component/header';
import { API_BASE_URL, APP_BASE_URL } from './config/apiConfig';
import { useNavigate } from 'react-router-dom';
import ImageModal from './component/imageModal';
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import BreadCrumb from './component/breadCrumb';
import PhoneInput from 'react-phone-input-2';

const Profile = () => {
  // State variables to manage dropdown behavior
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [referralCount, setReferralCount] = useState(null);
  const [copied, setCopied] = useState(false);
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const dropdownRef = useRef(null);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  //Second Dropdown
  // State variables to manage dropdown behavior
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState('');
  const dropdownRef1 = useRef(null);


  // Function to toggle dropdown visibility
  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  // Function to handle option selection
  const handleOptionSelect1 = (option) => {
    setSelectedOption1(option);
    setIsDropdownOpen1(false);
  };


  //Third Dropdown
  // State variables to manage dropdown behavior
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState('');
  const dropdownRef2 = useRef(null);


  // Function to toggle dropdown visibility
  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  // Function to handle option selection
  const handleOptionSelect2 = (option) => {
    setSelectedOption2(option);
    setIsDropdownOpen2(false);
  };


  //fourth Dropdown
  // State variables to manage dropdown behavior
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState('');
  const dropdownRef3 = useRef(null);


  // Function to toggle dropdown visibility
  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };

  // Function to handle option selection
  const handleOptionSelect3 = (option) => {
    setSelectedOption3(option);
    setIsDropdownOpen3(false);
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  // Close dropdown when clicking outside of it 1
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when clicking outside of it 2
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
        setIsDropdownOpen1(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when clicking outside of it 3
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setIsDropdownOpen2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when clicking outside of it 4
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) {
        setIsDropdownOpen3(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;

  //Register

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingDiscard, setLoadingDiscard] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(API_BASE_URL + '/api/user/' + userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        // Update user details state with fetched data
        const { firstName, lastName, email, phoneNumber, image } = data;
        setFormData({ firstName, lastName, email, phoneNumber });
        const imageFile = image.split('/');
        console.log(imageFile)
        setImage(imageFile[3]);
      } else {
        const data = await response.json();
        console.log(data);
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  console.log(formData)
  useEffect(() => {
    // Simulating fetching user details from an API
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('click')
    updateUser(formData);
  };

  const updateUser = async (data) => {
    setLoading(true);
    console.log("at change")
    try {

      console.log(data);
      const response = await fetch(API_BASE_URL + '/api/user/' + userId, {
        method: 'PUT',
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
        console.log(responseData)
        toast.success(responseData.message)

        setLoading(false);

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

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${APP_BASE_URL}/signUp/${referralCode}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 5000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const submitForm = () => {
    document.getElementById('userUpdateForm').click();
  }

  const handleDiscard = () => {
    setLoadingDiscard(true)
    fetchUserDetails();
    setLoadingDiscard(false)
  }

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user/referralcode/get/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setReferralCode(data.referralCode);
        } else {
          console.error('Error fetching user referral code:', await response.json());
        }
      } catch (err) {
        console.log('here')
        console.log(err);
      }
    }
    fetchCode()
  }, [])

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user/referral/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setReferralCount(data);
        } else {
          console.error('Error fetching user referrals:', await response.json());
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchReferrals()
  }, [])

  console.log(image)

  return (

    <>
      <Header />
      <BreadCrumb page={'Profile'} />

      <div className="mx-40 mt-5 p-10 px-20 bg-white rounded-[30px]">
        <h4 className='text-center mt-8'>My Profile</h4>
        <p className='text-gray800 text-center mb-10'>Your profile is a record of your personal information that defines who you are</p>
        <div className='flex justify-end gap-3 mt-5'>
          <button className="px-3 py-2 bg-blue600 text-white rounded-full" disabled={loading} onClick={submitForm}>
            {loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' />}
            {!loading && <span>Save changes</span>}
          </button>
          <button className="px-3 py-2 border border-gray900 rounded-full" disabled={loadingDiscard} onClick={handleDiscard}>
            {loadingDiscard && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' />}
            {!loadingDiscard && <span>Discard changes</span>}
          </button>
        </div>

        <div className="grid grid-cols-12 ">
          <div className='col-span-4 mt-10'>
            <p className='text-center font-semibold text-p18'>Profile picture/company logo</p>
            <div className='mt-4'>
              <img
                src={image ? (API_BASE_URL + '/images/users/' + image) : 'https://www.gravatar.com/avatar/c7763a1c6be16ffb347e8500434b61eb?s=200&r=pg&d=mm'}
                className='rounded-full w-[287px] h-[287px] m-auto'
                alt='User avatar'
                type='button'
              />
              <button className="block px-5 py-3 m-auto mt-4 bg-blue600 rounded-[30px] text-white text-[12px] justify-self-center" onClick={() => setIsOpen(true)}>
                <span>Change picture</span>
              </button>
            </div>
          </div>
          <div className='col-span-1'></div>
          <div className='col-span-7 mt-16'>
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="mt-[16px]">
                  <label htmlFor="firstName" className='text-p18 font-semibold pb-1 block'>First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-black400 px-3 py-[10px] rounded-full"
                  />
                </div>

                <div className="mt-[16px]">
                  <label htmlFor="lastName" className='text-p18 font-semibold pb-1 block'>Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-black400 px-3 py-[10px] rounded-full"
                  />
                </div>

                <div className="mt-[16px]">
                  <label htmlFor="email" className='text-p18 font-semibold pb-1 block'>Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-black400 px-3 py-[10px] rounded-full"
                  />
                </div>

                <div className="mt-[16px]">
                  <label htmlFor="phoneNumber" className='text-p18 font-semibold pb-1 block'>Phone Number</label>
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
                </div>
              </div>
              <button type='submit' id='userUpdateForm' className="px-3 py-2 bg-blue600 text-white rounded-full hidden" disabled={loading} onClick={() => submitForm()}>
                {loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' />}
                {!loading && <span>Save changes</span>}
              </button>
            </form>
          </div>
          <ImageModal open={isOpen} onClose={() => { setIsOpen(false) }} setImage={setImage}>
          </ImageModal>
          <ToastContainer />
        </div>
        <div className='mt-10 border-1 border-dashed border-black100 rounded-[30px] p-10'>
          <h4 className='text-center mt-10'>Refer a friend</h4>
          <p className='text-gray800 text-center mb-5'>Refer friend and get free gift when the join and complete their application</p>
          <div className='w-fit m-auto'>
            <p className="mb-1">Your referral link:</p>
            <div className='flex gap-3 items-center'>
              <div className="px-4 py-2 bg-black50 rounded-[10px]">
                <span className='p8'>{`${APP_BASE_URL}/signUp/${referralCode}`}</span>
              </div>
              <button className='px-3 py-1 bg-blue600 rounded-[30px] text-white text-[12px]' onClick={handleCopy}>{copied ? 'Copied!' : 'Copy link'}</button>
            </div>
          </div>
          <div className="mt-5 p-10 bg-gray200 rounded-[20px]">
            <h5 className='text-center'>Track friends you’ve referred</h5>

            <div className='mx-40 mt-5'>
              <div className='flex justify-between text-[16px]' >
                <p>Visited Craddule</p>
                <p>{referralCount ? referralCount.visited : '0'}</p>
              </div>
              <div className='flex justify-between'>
                <p>Subscribed</p>
                <p>{referralCount ? referralCount.subscribed : '0'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile
