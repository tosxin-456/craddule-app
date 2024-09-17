import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config/apiConfig';
import 'react-phone-input-2/lib/style.css';
import { PaystackButton } from 'react-paystack';
import { jwtDecode } from "jwt-decode";

function GetCard() {
  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;

  // const publicKey = "pk_live_ad719098c01b1d5e280aa45492782cb661b74d46";
  const publicKey = "pk_test_5b18272091e43f312490878eb3f0002fb4242ac6";
  const [ email, setEmail ] = useState("");
  const [ amount, setAmount ] = useState(50);
  const [ name, setName ] = useState("");
  const [ timeRef, setTimeRef ] = useState("");
  const [ authCode, setAuthCode ] = useState("");
  const [ phone, setPhone ] = useState("");
  let currency = '';
  useEffect(() => {
    // Simulating fetching user details from an API
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(API_BASE_URL+'/api/user/'+userId, {
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
              const { firstName, lastName, email, phoneNumber, timeSent } = data;
              setEmail(email);
              setName(firstName +' '+lastName);
              setPhone(phoneNumber);
              setTimeRef(timeSent);
              setAuthCode(data?.authCode)
              console.log(data?.authCode)
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

  const navigate = useNavigate()
  
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
        navigate(`/createProject`);
  


      } else {
        const result = await response.json();
        
          console.error('Error:', result['error']);
        
      }
    } catch (error) {

      console.error('An error occurred:', error);
    }
  };
  
  useEffect(()=>{
    if (email == '' || timeRef == ''){
      console.log('No email, no click');
    }
    else{
      console.log(email);
      console.log(timeRef);
      const today = new Date();
      const secondsToday = Math.floor(today.getTime()/1000);
      const seconds = Math.floor(timeRef.getTime()/1000);
      const secondsIn3Weeks = seconds + 1814400;
      if (seconds >= 1814400) {  
        document.getElementsByClassName('cardBtn')[0].click()
        console.log('clicked');
      }
    }
  }, [email, timeRef])

  return (
    <PaystackButton className='cardBtn hidden' id='cardBtn' {...componentProps} />
  );
}

export default GetCard;
