import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from "./images/Craddule logo - PNG 2 4 (2).svg";
import onboard1 from "./images/onboardingdesign1.svg";
import {
  updateOnboardingStatus,
  UpdateOnboardingSeenStatus,
  getUserIdFromToken,
} from "./utils/startUtils";
import { jwtDecode } from "jwt-decode";

function DesignOnboarding() {
  const access_token = localStorage.getItem("access_token");
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken?.userId || null;
  const token = localStorage.getItem("onboarding");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectId = localStorage.getItem("nProject");
  console.log(access_token, userId);

  const handleNextClick = async () => {
    const onboarding = JSON.parse(localStorage.getItem("onboarding") || "{}");

    if (onboarding.InitialDesign === true) {
      navigate(`/test-ai/InitialDesign`);
      return;
    }

    try {
      await UpdateOnboardingSeenStatus(
        projectId,
        userId,
        access_token,
        setError,
        "InitialDesign"
      );
      navigate(`/test-ai/InitialDesign`);
    } catch (error) {
      console.error("Error updating onboarding status:", error);
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#193FAE]">
      <div className="mt-[10px] ml-[10px]">
        <img src={logo} alt="Logo" className="w-[100px]" />
      </div>

      {/* Centered Image */}
      <div className="flex m-auto justify-center items-center h-full">
        <img
          src={onboard1}
          alt="Onboarding 1"
          className="w-2/3 h-auto object-cover"
        />
      </div>

      {/* Next Button at the bottom right */}
      <div className="absolute bottom-10 right-10">
        <button
          onClick={handleNextClick}
          className="bg-[white] text-black py-1 px-5 rounded-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DesignOnboarding;