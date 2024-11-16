import React, { useEffect, useState } from 'react';
import Header from './component/header';
import SideMenu2 from './component/sideMenu2';
import { useNavigate } from 'react-router-dom';
import home from './images/HOME.png';
import circle from './images/circle.png';
import HeaderIdeation from './component/headerIdeation';
import { handleClick, handleClickStorage, getUserIdFromToken, FetchGraphData, FetchGraphDataDesign } from "./utils/startUtils";
import feedback from './images/feedback.svg';
import SideMenu2I from './component/sideMenu2I';
import { API_BASE_URL } from "./config/apiConfig";
const token = localStorage.getItem("access_token");

function DesignMain() {
    const navigate = useNavigate();
    const [showScrollableDiv, setShowScrollableDiv] = useState(false);
    const [businessCaseBuilderPercentage, setBusinessCaseBuilderPercentage] = useState(0);
    const [customFinancialProjectPercentage, setCustomFinancialProjectPercentage] = useState(0);
    const [projectPercentage, setProjectPercentage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [percentage, setPercentage] = useState(null);
    const [percentageS, setPercentageS] = useState(null);

    const projectId = localStorage.getItem('nProject');
    const { access_token, userId } = getUserIdFromToken();

    useEffect(() => {
        const fetchPercentage = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/algo/${projectId}/ClaimTheDomain`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    const data = await response.json();
                    console.log(response);
                    setPercentage(data.percentage);
                } else {
                    console.error(
                        `Error fetching percentage: ${response.status} - ${response.statusText}`
                    );
                }
            } catch (error) {
                console.error("Error fetching percentage:", error);
            }
        };

        if (projectId) {
            fetchPercentage();
        }
    }, [projectId]);

    useEffect(() => {
        const fetchPercentage2 = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/algo/${projectId}/StakeholdersEngagement`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    const data = await response.json();
                    console.log(response);
                    setPercentageS(data.percentage);
                } else {
                    console.error(
                        `Error fetching percentage: ${response.status} - ${response.statusText}`
                    );
                }
            } catch (error) {
                console.error("Error fetching percentage:", error);
            }
        };

        if (projectId) {
            fetchPercentage2();
        }
    }, [projectId]);

    useEffect(() => {
        const loadGraphData = async () => {
            try {
                const data = await FetchGraphDataDesign(userId, projectId, access_token);
                setBusinessCaseBuilderPercentage(data.businessCaseBuilderPercentage || 0);
                setCustomFinancialProjectPercentage(data.customFinancialProjectPercentage || 0);
                setProjectPercentage(data.projectPercentage || 0);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId && projectId) {
            loadGraphData();
        }
    }, [userId, projectId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ fontFamily: '"Manrope", sans-serif' }} className="container2">
            <SideMenu2I />
            <div className="main-content">
                <HeaderIdeation />
                <div className="container relative">
                    <div className="absolute inset-0 mt-[80px] ml-[20px] sm:ml-[60px] z-[-100] bg-no-repeat bg-cover w-[150px] sm:w-[200px] h-[150px] sm:h-[200px]"
                        style={{ backgroundImage: `url(${circle})` }}
                    ></div>
                    <div className="main-content2">
                        <div className="flex mt-[40px] justify-between items-center w-[100%]">
                            <div className="w-fit">
                                <button onClick={() => navigate('/start')} className='bg-[#193FAE] px-[30px] py-[5px] text-white rounded-3xl'>
                                    Back
                                </button>
                            </div>
                            <div>
                                <img src={home} alt="Home Icon" />
                            </div>
                        </div>
                        <div className="bacWHI mt-[20px]">
                            <div className="m-auto">
                                <p className="text-center font-bold text-[14px] sm:text-[17px]">
                                    Phase progress
                                </p>
                                <p className="text-center text-[#8A8A8A] font-semibold text-[9px] sm:text-[10px]">
                                    Here you see your progress and how far you've gone
                                </p>
                            </div>
                            <div className=' lg:flex lg:justify-evenly ' >
                                <div className="flex flex-row sm:flex-col w-full lg:w-[45%] m-auto space-y-2 sm:space-y-0">

                                    {/* Business Case Builder Progress */}
                                    <div className="w-full sm:w-auto">
                                        <p className="text-center font-bold text-[14px] sm:text-[15px]">
                                            Claim Domain
                                        </p>
                                        <div className="bg-[#0B1D50] p-[10px] sm:p-[15px] px-[20px] sm:px-[40px] text-white rounded-md text-center">
                                            <div className="flex justify-center items-center">
                                                <svg width="100" height="60" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M 10,50 A 40,40 0 1,1 90,50"
                                                        fill="none"
                                                        stroke="#e0e0e0"
                                                        strokeWidth="10"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M 10,50 A 40,40 0 1,1 90,50"
                                                        fill="none"
                                                        stroke="#1B45BF"
                                                        strokeWidth="10"
                                                        strokeDasharray="126"
                                                        strokeDashoffset={126 - (percentage) * 126}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="mt-[-20px] sm:mt-[-30px]">{percentage}%</p>
                                            <p className="text-[12px] sm:text-[14px]">progress</p>
                                            <button
                                                onClick={() =>
                                                    navigate('pdfEnd/InitialDesign')
                                                }
                                                className="m-auto bg-[#1B45BF] px-2 py-1 rounded-lg text-white text-[12px] sm:text-[14px]"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </div>

                                    {/* Custom Financial Project Progress */}
                                    <div className="w-full sm:w-auto sm:ml-auto">
                                        <p className="text-center font-bold text-[14px] sm:text-[15px]">Stakeholder Engagement</p>
                                        <div className="bg-[#0B1D50] p-[10px] sm:p-[15px] px-[20px] sm:px-[40px] text-white rounded-md text-center">
                                            <div className="flex justify-center items-center">
                                                <svg width="100" height="60" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M 10,50 A 40,40 0 1,1 90,50"
                                                        fill="none"
                                                        stroke="#e0e0e0"
                                                        strokeWidth="10"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M 10,50 A 40,40 0 1,1 90,50"
                                                        fill="none"
                                                        stroke="#1B45BF"
                                                        strokeWidth="10"
                                                        strokeDasharray="126"
                                                        strokeDashoffset={126 - (percentageS) * 126}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="mt-[-20px] sm:mt-[-30px]">{percentageS}%</p>
                                            <p className="text-[12px] sm:text-[14px]">progress</p>
                                            <button
                                                onClick={() => navigate('pdfEnd/InitialDesign')}
                                                className="m-auto bg-[#1B45BF] px-2 py-1 rounded-lg text-white text-[12px] sm:text-[14px]"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </div>


                                </div>
                                <div className="flex flex-row sm:flex-col w-full lg:w-[45%] m-auto ml-[30px] space-y-2 sm:space-y-0">

                                    {/* Business Case Builder Progress */}
                                    <div className="w-full sm:w-auto">
                                        <p className="text-center font-bold text-[14px] sm:text-[15px]">
                                            Stakeholders Feedback
                                        </p>
                                        <div className="bg-[#0B1D50] p-[10px] sm:p-[15px] px-[20px] sm:px-[40px] text-white rounded-md text-center">
                                            <div className="flex justify-center items-center">
                                                <svg width="100" height="60" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M 10,50 A 40,40 0 1,1 90,50"
                                                        fill="none"
                                                        stroke="#e0e0e0"
                                                        strokeWidth="10"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M 10,50 A 40,40 0 1,1 90,50"
                                                        fill="none"
                                                        stroke="#1B45BF"
                                                        strokeWidth="10"
                                                        strokeDasharray="126"
                                                        strokeDashoffset={126 - (businessCaseBuilderPercentage / 100) * 126}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="mt-[-20px] sm:mt-[-30px]">{businessCaseBuilderPercentage}%</p>
                                            <p className="text-[12px] sm:text-[14px]">progress</p>
                                            <button
                                                onClick={() =>
                                                    navigate('pdfEnd/InitialDesign')
                                                }
                                                className="m-auto bg-[#1B45BF] px-2 py-1 rounded-lg text-white text-[12px] sm:text-[14px]"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </div>

                                    {/* Custom Financial Project Progress */}
                                    <div className="w-full sm:w-auto sm:ml-auto">
                                        <p className="text-center font-bold text-[14px] sm:text-[15px]">Summary PDF</p>
                                        <div className="bg-[#0B1D50] p-[10px] sm:p-[15px] px-[20px] sm:px-[40px] text-white rounded-md text-center">
                                            <div className="flex justify-center items-center">
                                                <svg width="100" height="60" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M 10,50 A 40,40 0 1,1 90,50"
                                                        fill="none"
                                                        stroke="#e0e0e0"
                                                        strokeWidth="10"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M 10,50 A 40,40 0 1,1 90,50"
                                                        fill="none"
                                                        stroke="#1B45BF"
                                                        strokeWidth="10"
                                                        strokeDasharray="126"
                                                        strokeDashoffset={126 - (customFinancialProjectPercentage / 100) * 126}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="mt-[-20px] sm:mt-[-30px]">{customFinancialProjectPercentage}%</p>
                                            <p className="text-[12px] sm:text-[14px]">progress</p>
                                            <button
                                                onClick={() =>
                                                    navigate('pdfEnd/InitialDesign')
                                                }
                                                className="m-auto bg-[#1B45BF] px-2 py-1 rounded-lg text-white text-[12px] sm:text-[14px]"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className=' lg:flex lg:justify-center ' >
                                <div className="flex flex-row sm:flex-col w-full lg:w-[45%] m-auto space-y-2 sm:space-y-0  mt-[30px] ">

                                    {/* Business Case Builder Progress */}
                                    <div className="w-full m-auto sm:w-auto">
                                        <p className="text-center font-bold text-[14px] sm:text-[15px]">
                                         Go no GO
                                        </p>
                                        <div className="bg-[#0B1D50] p-[10px] sm:p-[15px] px-[20px] sm:px-[40px] text-white rounded-md text-center">
                                            <div className="flex justify-center items-center">
                                                <svg width="100" height="60" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M 10,50 A 40,40 0 1,1 90,50"
                                                        fill="none"
                                                        stroke="#e0e0e0"
                                                        strokeWidth="10"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M 10,50 A 40,40 0 1,1 90,50"
                                                        fill="none"
                                                        stroke="#1B45BF"
                                                        strokeWidth="10"
                                                        strokeDasharray="126"
                                                        strokeDashoffset={126 - (businessCaseBuilderPercentage / 100) * 126}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="mt-[-20px] sm:mt-[-30px]">{businessCaseBuilderPercentage}%</p>
                                            <p className="text-[12px] sm:text-[14px]">progress</p>
                                            <button
                                                onClick={() =>
                                                    navigate('pdfEnd/InitialDesign')
                                                }
                                                className="m-auto bg-[#1B45BF] px-2 py-1 rounded-lg text-white text-[12px] sm:text-[14px]"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 right-0 z-[-100] m-0 p-0 w-[150px] h-[150px] bg-no-repeat"
                style={{
                    backgroundImage: `url(${feedback})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    margin: '0',
                    padding: '0',
                }}
            ></div>
        </div>
    );
}

export default DesignMain;
