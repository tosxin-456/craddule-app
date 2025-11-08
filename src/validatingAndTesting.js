import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import logo from './images/Craddule logo - PNG 2 4.svg'
import onboard1 from './images/onboardingvalidating1.svg';
import { updateOnboardingStatus, UpdateOnboardingSeenStatus, getUserIdFromToken } from './utils/startUtils';
import { jwtDecode } from "jwt-decode";

function ValidatingOnboarding() {
    const token = localStorage.getItem('onboarding');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const projectId = localStorage.getItem('nProject');
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken?.userId || null;

    const handleNextClick = async () => {
        // Retrieve and parse the onboarding object from localStorage
        const onboarding = JSON.parse(localStorage.getItem('onboarding') || '{}');

        // Check if the Ideation phase is true
        if (onboarding.ValidatingAndTesting === true) {
            navigate(`/test-ai/ValidatingAndTesting`);
            return;
        }

        try {
            await UpdateOnboardingSeenStatus(projectId, userId, access_token, setError, 'ValidatingAndTesting');
            navigate(`/test-ai/ValidatingAndTesting`);
        } catch (error) {
            console.error('Error updating onboarding status:', error);
        }
    };

    return (
        <div className="flex w-full h-screen bg-[#E4BA05]">
            <div className="mt-[10px] ml-[10px]">
                <img src={logo} alt="Logo" className="w-[100px]" />
            </div>

            {/* Centered Image */}
            <div className="flex m-auto justify-center items-center h-full">
                <img src={onboard1} alt="Onboarding 1" className="w-2/3 h-auto object-cover" />
            </div>

            {/* Next Button at the bottom right */}
            <div className="absolute bottom-10 right-10">
                <button onClick={handleNextClick} className="bg-[#193FAE] text-white py-1 px-5 rounded-2xl">
                    Next
                </button>
            </div>
        </div>
    );
}

export default ValidatingOnboarding;