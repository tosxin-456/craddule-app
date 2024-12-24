import React, { useState, useEffect } from 'react';
import Header from './component/header';
import Menu from './component/menu';
import ShareModal from './component/shareModal';
import {API_BASE_URL} from './config/apiConfig';

import { useNavigate } from 'react-router-dom';
import ImageModal from './component/imageModal';
import { Toaster, toast } from 'sonner'
import { jwtDecode } from "jwt-decode";
import circle from './images/circle.png';
import feedback from './images/feedback.svg';
import home from './images/HOME.png';

function PageFeedback() {

  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;
  const projectId = localStorage.getItem('nProject');

  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    // Simulating fetching user details from an API
    const fetchFeedback = async () => {
        try {
          const response = await fetch(API_BASE_URL+'/api/feedback/'+projectId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,
            },
          });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data.data);

                setFeedback(data.data);
               
               
            } else {
                const data = await response.json();
                console.log(data);
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    fetchFeedback();
}, []);

  return (
    <>
      <Header />
      <div className="container relative">
        {/* Navigation */}
        <div className="flex mt-[40px] justify-between items-center w-full">
          <button
            onClick={() => navigate('/start')}
            className="bg-[#193FAE] px-6 py-2 text-white rounded-3xl"
          >
            Back
          </button>
          <img src={home} alt="Home Icon" />
        </div>

        {/* Background Circle */}
        <div
          className="absolute inset-0 mt-[40px] ml-5 sm:ml-16 z-[-100] bg-no-repeat bg-cover w-[150px] sm:w-[200px] h-[150px] sm:h-[200px]"
          style={{ backgroundImage: `url(${circle})` }}
        ></div>

        {/* Feedback Section */}
        <div className="col-md-12 mt-8">
          <div className="centerC">
            {/* Header */}
            <div className="text-center mb-6">
              <p className="centerH text-2xl font-semibold">Feedback</p>
            </div>

            {/* Feedback List */}
            <div className="rounded-xl space-y-4">
              {feedback.map((feedback, index) => (
                <div key={index} className="feedS p-4 bg-gray-100 rounded-md">
                  {/* Feedback Title */}
                  <p className="text-lg font-bold mb-2">{feedback.phase}</p>

                  {/* Flex Container for Email and Time */}
                  <div className="md:flex  gap-3 sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600 mb-2">
                    <p>From: {feedback.userId.email}</p>
                    <p>
                      {new Date(feedback.timeSent).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}{" "}
                      {new Date(feedback.timeSent).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>

                  </div>

                  {/* Feedback Content */}
                  <p className="text-[#545454]">{feedback.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default PageFeedback;