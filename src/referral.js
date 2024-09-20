import React, { useState, useEffect } from "react";
import Header from './component/header';
import {API_BASE_URL, APP_BASE_URL} from './config/apiConfig';
import refer from './images/refer.png';
import { handleClick, handleClickStorage, handleHome, handleLogout, updateStreak, getUserIdFromToken, FetchProjectDetails, FetchGoStatus, FetchTimelines, FetchTimelinesCount } from "./utils/startUtils";

function Referral() {

  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState('');
  const {userId} = getUserIdFromToken();

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

  useEffect(()=>{
    const fetchCode = async()=>{
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
  })

  return (
    <>
        <Header />
        <div className="mb-20"></div>
        <div className="w-fit m-auto mt-20 p-10 bg-white rounded-[30px]">
          <div className='grid grid-cols-12 gap-10'>
              <div className='col-span-6'>
                <h4 className='text-center mt-10'>Refer a friend</h4>
                <p className='text-gray800 text-center mb-5'>Here you can invite a friend or colleagues  to join Craddule</p>
                <div>
                    <p className="-mb-0">Your referral link:</p>
                    <div className="px-4 py-2 bg-black50 flex items-center rounded-[10px]">
                        <h8>{`${APP_BASE_URL}/signUp/${referralCode}`}</h8>
                    </div>
                    <button className='px-3 py-1 mt-1 bg-blue600 float-right rounded-[30px] text-white text-[12px]' onClick={handleCopy}>{copied ? 'Copied!' : 'Copy link'}</button>
                </div>
                <div className="mt-20">
                    <p className="-mb-0">Refer by Email</p>
                    <input className="block px-4 py-2 bg-black50 w-full rounded-[10px]" placeholder="Enter recipient email" />
                    <button className='px-3 py-1 mt-1 bg-blue600 float-right rounded-[30px] text-white text-[12px]'>Send Referral</button>
                </div>
              </div>
              <div className='col-span-6'>
                  <img src={refer} className="w-[435px] h-[495px]"/>
              </div>
          </div>
        </div>
    </>
  );
}

export default Referral;
