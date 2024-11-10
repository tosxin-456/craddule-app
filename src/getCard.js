import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {API_BASE_URL} from './config/apiConfig';
import 'react-phone-input-2/lib/style.css';
import { PaystackButton } from 'react-paystack';
import { jwtDecode } from "jwt-decode";
import { getUserIdFromToken } from './utils/startUtils';

function GetCard() {
  const {access_token, userId} = getUserIdFromToken();
  console.log(userId);

  const publicKey = "pk_live_ad719098c01b1d5e280aa45492782cb661b74d46";
  //const publicKey = "pk_test_5b18272091e43f312490878eb3f0002fb4242ac6";
  const [ email, setEmail ] = useState("");
  const [ amount, setAmount ] = useState(50);
  const [ name, setName ] = useState("");
  const [ timeRef, setTimeRef ] = useState("");
  const [ authCode, setAuthCode ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ show, setShow ] = useState(false);
  let currency = '';

  useEffect(() => {
    // Simulating fetching user details from an API
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(API_BASE_URL+'/api/user/'+userId, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        });
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            // Update user details state with fetched data
            const { firstName, lastName, email, phoneNumber, timeSent, authCode } = data;
            setEmail(email);
            setName(firstName +' '+lastName);
            setPhone(phoneNumber);
            setTimeRef(timeSent);
            setAuthCode(authCode);
            // console.log(data?.authCode)
            currency = phoneNumber.startsWith('234') ? 'NGN' : 'USD';

        } else {
            const data = await response.json();
            console.log(data);
            console.error('Failed to fetch user details');
        }
      } catch (error) {
          console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);
  
  const handlePaystackSuccessAction = (reference) => {
      console.log('Payment successful, reference:', reference.reference);
      verifyTransaction(reference.reference)
      // Call your success handler
  };

  const handlePaystackCloseAction = () => {
      console.log('Payment closed');
      alert("Transaction was not completed");
  };

  const componentProps = {
      email,
      amount: amount * 100,
      metadata: {
      name,
      phone,
      },
      currency: currency,
      publicKey,
      text: "Start Free Trial",
      onSuccess: handlePaystackSuccessAction,
      onClose: handlePaystackCloseAction,
  }

  const verifyTransaction = async (data) => {
    try {
      const res = await fetch(`https://api.paystack.co/transaction/verify/${data}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const response = await res.json();
      console.log(response.data.authorization.authorization_code)
      localStorage.setItem('auth_code', response.data.authorization.authorization_code);
      
      updateUser(response.data.authorization.authorization_code);
      //setResponse(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUser = async (authCode) => {
    console.log("at change")
    try {

      console.log(authCode);
      const response = await fetch(API_BASE_URL+'/api/user/auth/'+userId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({authCode}),
      });

      // const data = response.json();
      
      if (response.status === 200) {
        console.log(response.status);
        //console.log(response);
        const responseData = await response.json(); // Parse JSON response
        //console.log(responseData)
      } else {
        const result = await response.json();       
        console.error('Error:', result['error']);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const updateUserPop = async (trialPopUp) => {
    try {

      console.log(trialPopUp);
      const response = await fetch(API_BASE_URL+'/api/user/trialpopup/'+userId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({trialPopUp}),
      });

      // const data = response.json();
      
      if (response.status === 200) {
        console.log(response.status);
        //console.log(response);
        const responseData = await response.json(); // Parse JSON response
        //console.log(responseData)
      } else {
        const result = await response.json();       
        console.error('Error:', result['error']);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleClick = ()=>{
    setShow(false);
    updateUser();
    document.getElementsByClassName('cardBtn')[0].click();
    const day = new Date();
  }

  const handleCancel = ()=>{
    setShow(false)
    updateUserPop('true');
  }
  
  useEffect(()=>{
    console.log('here');
    if (email == '' || timeRef == ''){
      // console.log(email);
      // console.log(timeRef);
      // console.log('No email, no click');
    }
    else{
      console.log(email);
      console.log(timeRef);
      console.log(authCode);
      const today = new Date();
      const timereference = new Date(timeRef)
      const secondsToday = Math.floor(today.getTime()/1000);
      const seconds = Math.floor(timereference.getTime()/1000);
      console.log(seconds, secondsToday, secondsToday-seconds);
      if ((secondsToday-seconds) >= 1209609 && (!authCode || authCode=='')) {  
        console.log('clicked');
        setShow(true);
      }
    }
  }, [email, timeRef])

  return (
    <>
    <div className={show ? "w-full h-full fixed left-0 top-0 px-20":"hidden"} id='popup'>
      <div className='w-fit m-auto p-10 bg-white rounded-[30px] drop-shadow-lg translate-y-[50%]'>
        <h4 className='text-center mt-10'>Subscribe to Craddule</h4>
        <p className='text-gray800 text-center m-auto mb-5 w-[90%]'>To continue your journey and enjoy our various features, we would be collecting you card details to enable us set up your account for subsequent months. Please note that although we are not yet charging you for using Craddule, Paystack ( our payment Gateway ) charges a minimum of NGN 50, to ensure that the card details are legitimate</p>
        <div className='flex items-center gap-2 justify-center'>
          <button className='px-4 py-2 bg-blue600 rounded-[30px] text-white text-[16px]' onClick={handleClick}>Subscribe</button>
          <button className='px-4 py-2 bg-gray-600 rounded-[30px] text-white text-[16px]' onClick={handleCancel}>Not now</button>
        </div>
      </div>
    </div>
    <PaystackButton className='cardBtn hidden' id='cardBtn' {...componentProps} />
    </>
  );
}

export default GetCard;
