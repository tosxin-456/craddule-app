import React, { useState, useEffect } from "react";
import Header from './component/header';
import { CiLock,CiMemoPad,CiUser} from 'react-icons/ci';
import bolt from './images/bolt.png';
import ReactGA from "react-ga4";
import { handleClick, handleClickStorage, handleHome, handleLogout, updateStreak, getUserIdFromToken, FetchProjectDetails, FetchGoStatus, FetchTimelines, FetchTimelinesCount, FetchUser } from "./utils/startUtils";
import { useNavigate } from "react-router-dom";
import ModalStart from "./component/modalStartStop";

function InflationRateGraph({ graphType }) {

  ReactGA.initialize("G-P450CRB987");
  ReactGA.send({
   hitType: "pageview",
   page: window.location.pathname,
   title: "Start Page"
  });
  
  const [streak, setStreak] = useState('');
  const [timelineCount, setTimelineCount] = useState('');
  const [timelines, setTimelines] = useState([]);
  const [unlock, setUnlock] = useState(false);
  const [unlockIn, setUnlockIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectId = localStorage.getItem('nProject');
  const [projectDetails, setProjectDetails] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {access_token, userId} = getUserIdFromToken();

  if (userId == null){
    navigate('/login');
  }
  FetchUser(userId, setUserDetails, setError, setLoading);

  FetchProjectDetails(projectId, setProjectDetails, setError, setLoading)

  FetchGoStatus(projectId, access_token, setUnlock, setUnlockIn)

  useEffect(() => {
    updateStreak(setStreak);
  }, []);
  
//   FetchTimelines(projectId, setTimelines, setLoading, setError)

  FetchTimelinesCount(projectId, userId, access_token, setTimelineCount, setLoading, setError)

  return (
    <div className=''>
      <Header />
      <div className='container'>
        <div className="flex justify-between items-center mt-10">
            <div>
                <h4 className="text-blue600">Hello, {userDetails?.firstName}!</h4>
                <h6 className="text-gray-800">Begin your launch to success!</h6>
            </div>
            <div className="grid">
                <button className='block px-3 py-2 bg-black400 rounded-[5px] mb-[15px] text-white' onClick={()=>setIsOpen(true)}>Create new project</button>
                <button className='block px-3 py-2 bg-none border border-black500 rounded-[5px]' onClick={()=>handleClick('/home')}>Select Project</button>
            </div>
        </div>
        <div className="grid grid-cols-5 gap-3 mt-14">
            <div className="col-span-4">
                <div className="grid grid-cols-4 gap-3">
                <div className="w-[225px] h-[305px] rounded-tr-[30px] rounded-bl-[30px] bg-[url('./images/ideation.png')] bg-no-repeat bg-cover cursor-pointer">
                    <div className="tilt-box bg-[#E8C400D9]" onClick={()=>handleClickStorage('BusinessCaseBuilder','/questionBusMain/Ideation/BusinessCaseBuilder/Introduction')}>
                        <button className="px-2 py-1 bg-black400 rounded-[10px] mb-[16px] text-white text-[14px]">View</button>
                        <p className="p18">Ideation</p>
                        <p className="text-[12px]">Create your Idea from start to finish</p>
                        <p className="text-[12px]">7 Documents</p>
                    </div>
                </div>

                {projectDetails && !projectDetails.includes("Product Definition") && (
                <div className={`w-[225px] h-[305px] rounded-tr-[30px] rounded-bl-[30px] bg-[url('./images/product_definition.png')] bg-no-repeat bg-cover cursor-pointer ${!unlock ? 'locked' : ''}`}>
                <div className={`tilt-box bg-[#333333DE] text-white ${!unlockIn ? 'lockedIn' : ''}`} onClick={unlock ? ()=>handleClick('/questionBusMain/ProductDefinition/BusinessAnalysisPack/CustomerSegments') : null}>
                        <button className="px-2 py-1 bg-white rounded-[10px] mb-[16px] text-black400 text-[14px]">View</button>
                        <p className="p18">Product Definition</p>
                        <p className="text-[12px]">Design your business processes and flow</p>
                        <p className="text-[12px]">4 Documents</p>
                        
                    </div>
                </div>
                )}

                {projectDetails && !projectDetails.includes("Initial Design") && (
                <div className={`w-[225px] h-[305px] rounded-tr-[30px] rounded-bl-[30px] bg-[url('./images/initial_design.png')] bg-no-repeat bg-cover cursor-pointer ${!unlock ? 'locked' : ''}`}>
                    <div 
                    className={`tilt-box bg-[#193FAEDE] text-white ${!unlockIn ? 'lockedIn' : ''}`}  
                    onClick={unlock ? ()=>handleClick('/questionBusMain/InitialDesign/ClaimTheDomain/DomainName') : null}
                    >
                        <button className="px-2 py-1 bg-white rounded-[10px] mb-[16px] text-black400 text-[14px]">View</button>
                        <p className="p18">Initial Design</p>
                        <p className="text-[12px]">Plan design and add members to Team</p>
                        <p className="text-[12px]">2 Documents</p>
                        <div style={{paddingBottom:10}}></div>
                    </div>
                </div>
                )}

                {projectDetails && !projectDetails.includes("Validating and Testing") && (           
                    <div className={`w-[225px] h-[305px] rounded-tr-[30px] rounded-bl-[30px] bg-[url('./images/validating.png')] bg-no-repeat bg-cover cursor-pointer ${!unlock ? 'locked' : ''}`}>
                        <div 
                        className={`tilt-box bg-[#FFD700DE] text-white ${!unlockIn ? 'lockedIn' : ''}`}  
                        onClick={unlock ? ()=>handleClick('/questionBusMain/ValidatingAndTesting/FullProductProjectReview/Review') : null}>
                        <button className="px-2 py-1 bg-black400 rounded-[10px] mb-[16px] text-white text-[14px]">View</button>
                            <p className="p18">Validating and Testing</p>
                            <p className="text-[12px]">Test and validate your prodduct</p>
                            {/* <p className="caseBAP3">10:20pm 10.10.2022</p> */}
                            <p className="text-[12px]">3 Documents</p>
                        </div>
                    </div>
                )}

                {projectDetails && !projectDetails.includes("Commercialization") && (
                    <div className={`w-[225px] h-[305px] rounded-tr-[30px] rounded-bl-[30px] bg-[url('./images/commercialization.png')] bg-no-repeat bg-cover cursor-pointer ${!unlock ? 'locked' : ''}`}>
                        <div 
                            className={`tilt-box bg-[#333333DE] text-[white] ${!unlockIn ? 'lockedIn' : ''}`}  
                            onClick={unlock ? ()=>handleClick('/questionBusMain/Commercialization/BringTheMVPToFullScale/GetTheMVPToFruition') : null}
                        >
                            <button className="px-2 py-1 bg-white rounded-[10px] mb-[16px] text-black400 text-[14px]">View</button>
                            <p className="p18">Commercialization</p>
                            <p className="text-[12px]">Get your product ready to launch for production</p>
                            {/* <p className="caseBA2P3">10:20pm 10.10.2022</p> */}
                            <p className="text-[12px]">2 Documents</p>
                            <div style={{paddingBottom:10}}></div>
                        </div>
                    </div>
                )}

                <div className={`w-[225px] h-[305px] rounded-tr-[30px] rounded-bl-[30px] bg-[url('./images/kpi.png')] bg-no-repeat bg-cover cursor-pointer`}>
                    <div className={`tilt-box bg-[#133188DE] text-white`} onClick={()=>handleClickStorage('Kpi', '/kpi')}>
                        <button className="px-2 py-1 bg-white rounded-[10px] mb-[16px] text-black400 text-[14px]">View</button>
                        <p className="p18">KPI</p>
                        <p className="text-[12px]">Create Custom Graphs that gives you more insight</p>
                        <p className="text-[12px]">6 Graph Types</p>
                    </div>
                </div>

                <div className="w-[225px] h-[305px] rounded-tr-[30px] rounded-bl-[30px] bg-[url('./images/scrab_book.png')] bg-no-repeat bg-cover border-3 border-black cursor-pointer">
                    <div className="tilt-box bg-[#E6E6E6D9] text-black400" onClick={()=>handleClick('/scrapView')}>
                        <button className="px-2 py-1 bg-white rounded-[10px] mb-[16px] text-black400 text-[14px]">View</button>
                        <p className="p18">ScrapBook</p>
                        <p className="text-[12px]">Create Notes that you can look back at later</p>
                        <p className="text-[12px]">6 Graph Types</p>
                    </div>
                </div>

                <div className="w-[225px] h-[305px] rounded-tr-[30px] rounded-bl-[30px] bg-[url('./images/pitch_deck.png')] bg-no-repeat bg-cover cursor-pointer">
                    <div className="tilt-box bg-[#193FAE99] text-white" onClick={()=>handleClick('/pitchDeckStart')}>
                        <button className="px-2 py-1 bg-white rounded-[10px] mb-[16px] text-black400 text-[14px]">View</button>
                        <p className="p18">Pitch Deck</p>
                        <p className="text-[12px]">Store Pitch Decks and have access to resources</p>
                        <p className="text-[12px]">5 Documents</p>
                        <div style={{paddingBottom:10}}></div>
                    </div>
                </div>
                </div>
            </div>

            <div className="col-span-1">
                <div className="bg-white p-3 rounded-[10px] bg-[url('./images/pattern.png')] bg-cover">
                    <h5 className="text-center">Your Task</h5>
                    <p className="block p18 p-0 mb-3 text-center text-black200">Total Task : {timelines.length}</p>
                    {timelines.map((timeline) => (
                        <div className='bg-blue50 p-3 ps-4 rounded-tr-[10px] rounded-bl-[10px] mb-3'>
                            <p className='text-[14px]'>{timeline.task}</p>
                            <div class="progress-bar -mt-3">
                                <div class="progress" style={{"width": `${timeline.completionPercentage}%`}}></div>
                            </div>
                            <p className='text-[10px]'>{timeline.completionPercentage}%</p>
                            <button className="block px-2 py-0 -mt-2 bg-black400 rounded-[10px] text-white text-[10px]">View task</button>
                        </div>
                    ))}
                    <button className="block m-auto px-3 py-2 bg-black400 rounded-[5px] mb-[16px] text-white text-[14px] disabled:opacity-70 disabled:cursor-not-allowed" disabled={timelines.length==0}>Manage tasks</button>
                </div>
            </div>
        </div>

        <div className="bg-white bg-[url('./images/pattern_landscape.png')] bg-contain rounded-[10px] mt-10">
            <div className="w-full py-16 px-5">
                <div className="flex justify-between items-center">
                    <div className="">
                        <h5 className="">Share Phases</h5>
                        <p className="text-[14px] text-black200">You feel your file is ready for review</p>
                    </div>
                    <button className="px-5 py-2 bg-black400 rounded-[5px] text-[14px] text-white" onClick={()=>handleClick('/sharePhase')}>Share</button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-12 gap-3 mt-10">
            <div className="col-span-3">
                <div className="bg-white py-[42px] rounded-[10px]">
                    <div className="flex justify-center items-center gap-4">
                        <img src={bolt} alt="Streak" className="" style={{width:"20%"}}/>
                        <div className="">
                            <h6 className=''>{streak} Days!</h6>
                            <h6 className='font-semibold'>Streak</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-6">
                <div className="bg-white py-[42px] px-[36px] rounded-[10px] flex justify-between items-center">
                    <div>
                        <h5 className="">Craddule Hub</h5>
                        <p className="text-[14px] text-black300">Upload and view uploaded files in your project</p>
                    </div>
                    <div>
                        <button className="block w-full px-3 py-2 bg-black400 rounded-[5px] mb-[16px] text-white text-[14px] " onClick={()=>handleClick('/craddule')}>View Files</button>
                        <button className="block w-full px-3 py-2 border border-black rounded-[5px] text-black400 text-[14px] " onClick={()=>handleClick('/craddule')}>Upload Files</button>
                    </div>
                </div>
            </div>

            <div className="col-span-3">
                <div className="bg-white py-[24px] px-[36px] rounded-[10px]">
                    <div>
                        <h5 className="text-center">Create task</h5>
                        <p className="text-[14px] text-black300 text-center">You can create task and assign to team members</p>
                        <button className="block w-full px-3 py-2 border bg-black400 rounded-[5px] text-white text-[14px] " onClick={()=>handleClick('/uploadTask')}>Upload Files</button>
                    </div>
                
                </div>
            </div>
        </div>

        <div className="bg-white bg-[url('./images/pattern_landscape.png')] bg-contain rounded-[10px] mt-10">
            <div className="w-full py-16 px-5">
                <div className="flex justify-between items-center">
                    <div className="">
                        <h5 className="">Refer a Friend</h5>
                        <p className="text-[14px] text-black200">Invite friends and collegues to join Craddule</p>
                    </div>
                    <button className="px-5 py-2 bg-black400 rounded-[5px] text-[14px] text-white" onClick={()=>handleClick('/referral')}>Refer</button>
                </div>
            </div>
        </div>

        <div className="flex justify-end gap-2 items-center mt-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="" width="50px" height="50px" viewBox="0 0 20 20"><path fill="black" d="M10 0c5.342 0 10 4.41 10 9.5c0 5.004-4.553 8.942-10 8.942a11 11 0 0 1-3.43-.546c-.464.45-.623.603-1.608 1.553c-.71.536-1.378.718-1.975.38c-.602-.34-.783-1.002-.66-1.874l.4-2.319C.99 14.002 0 11.842 0 9.5C0 4.41 4.657 0 10 0m0 1.4c-4.586 0-8.6 3.8-8.6 8.1c0 2.045.912 3.928 2.52 5.33l.02.017l.297.258l-.067.39l-.138.804l-.037.214l-.285 1.658a3 3 0 0 0-.03.337v.095q0 .007-.002.008c.007-.01.143-.053.376-.223l2.17-2.106l.414.156a9.6 9.6 0 0 0 3.362.605c4.716 0 8.6-3.36 8.6-7.543c0-4.299-4.014-8.1-8.6-8.1M5.227 7.813a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998m4.998 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998m4.997 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998"/></svg>
            <p className="text-[16px] font-semibold text-black500 mt-3">Tell us More</p>
        </div>

        <div className="grid grid-cols-12 gap-3 text-white mt-10">
            <div className="col-span-3 cursor-pointer">
                <div className="bg-black400 py-7 rounded-5" onClick={()=>handleClick('/generalSetting')}>
                <svg xmlns="http://www.w3.org/2000/svg"  className='m-auto' width="25px" height="25px" viewBox="0 0 24 24"><path fill="white" d="M17 9V7c0-2.8-2.2-5-5-5S7 4.2 7 7v2c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3v-7c0-1.7-1.3-3-3-3M9 7c0-1.7 1.3-3 3-3s3 1.3 3 3v2H9zm4.1 8.5l-.1.1V17c0 .6-.4 1-1 1s-1-.4-1-1v-1.4c-.6-.6-.7-1.5-.1-2.1s1.5-.7 2.1-.1c.6.5.7 1.5.1 2.1"/></svg>
                <p className="p20 text-center mt-2">Change Password</p>                      
                </div>
            </div>

            <div className="col-span-3 cursor-pointer">
                <div className="bg-black400 py-7 rounded-5" onClick={()=>handleClick('/profile')}>
                <svg xmlns="http://www.w3.org/2000/svg" className='m-auto' width="25px" height="25px" viewBox="0 0 24 24"><g fill="none"><path stroke="white" stroke-width="2" d="M21 12a8.96 8.96 0 0 1-1.526 5.016A8.99 8.99 0 0 1 12 21a8.99 8.99 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"/><path fill="white" d="M13 9a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3zm-1 1a1 1 0 0 1-1-1H9a3 3 0 0 0 3 3zm-1-1a1 1 0 0 1 1-1V6a3 3 0 0 0-3 3zm1-1a1 1 0 0 1 1 1h2a3 3 0 0 0-3-3zm-6.834 9.856l-.959-.285l-.155.523l.355.413zm13.668 0l.76.651l.354-.413l-.155-.523zM9 16h6v-2H9zm0-2a5 5 0 0 0-4.793 3.571l1.917.57A3 3 0 0 1 9 16zm3 6a7.98 7.98 0 0 1-6.075-2.795l-1.518 1.302A9.98 9.98 0 0 0 12 22zm3-4c1.357 0 2.506.902 2.876 2.142l1.916-.571A5 5 0 0 0 15 14zm3.075 1.205A7.98 7.98 0 0 1 12 20v2a9.98 9.98 0 0 0 7.593-3.493z"/></g></svg>
                <p className="p20 text-center mt-2">Edit Profile</p>
                </div>
            </div>

            <div className="col-span-3 cursor-pointer">
                <div className="bg-black400 py-7 rounded-5" onClick={()=>handleClick('/terms&conditions')}>
                <svg xmlns="http://www.w3.org/2000/svg" className='m-auto' width="25px" height="25px" viewBox="0 0 256 256"><path fill="white" d="m213.66 82.34l-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a8 8 0 0 0-2.34-5.66M160 176H96a8 8 0 0 1 0-16h64a8 8 0 0 1 0 16m0-32H96a8 8 0 0 1 0-16h64a8 8 0 0 1 0 16m-8-56V44l44 44Z"/></svg>
                    <p className="p20 text-center mt-2">Terms & Conditions</p>                      
                </div>
            </div>


            <div className="col-span-3 cursor-pointer">
                <div className="bg-black400 py-7 rounded-5" onClick={()=>handleClick('/privacy')}>
                <svg xmlns="http://www.w3.org/2000/svg" className='m-auto' width="25px" height="25px" viewBox="0 0 256 256"><path fill="white" d="m213.66 82.34l-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a8 8 0 0 0-2.34-5.66M160 176H96a8 8 0 0 1 0-16h64a8 8 0 0 1 0 16m0-32H96a8 8 0 0 1 0-16h64a8 8 0 0 1 0 16m-8-56V44l44 44Z"/></svg>
                    <p className="p20 text-center mt-2">Privacy Policy</p>
                </div>
            </div>

        </div>

        <div className="startWrap"></div>
      </div>    
      <ModalStart open={isOpen} onClose={() => setIsOpen(false)} />
    </div> 
  );
}

export default InflationRateGraph;
