import React, { useState, useEffect } from "react";
import Header from './component/header';
import { CiLock,CiMemoPad,CiUser} from 'react-icons/ci';
import bolt from './images/bolt.png';
import ReactGA from "react-ga4";
import { handleClick, handleClickStorage, handleHome, handleLogout, updateStreak, getUserIdFromToken, FetchProjectDetails, FetchGoStatus, FetchTimelines, FetchTimelinesCount } from "./utils/startUtils";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectId = localStorage.getItem('nProject');
  const {access_token, userId} = getUserIdFromToken();
  const [projectDetails, setProjectDetails] = useState([]);

  const navigate = useNavigate();

  if (userId == null){
    navigate('/login');
  }

  FetchProjectDetails(projectId, setProjectDetails, setError, setLoading)

  FetchGoStatus(projectId, access_token, setUnlock)

  useEffect(() => {
  updateStreak(setStreak);
  }, []);
  
  FetchTimelines(projectId, setTimelines, setLoading, setError)

  FetchTimelinesCount(projectId, userId, access_token, setTimelineCount, setLoading, setError)

  return (
    <div className=''>
      <Header />
      <div className='container'>
          <button className="buttonLo" onClick={handleLogout}>Logout</button>
          <button className="buttonLo" onClick={handleHome} style={{float:'right'}}>Home</button>
          <div className="row">
              <div className="col-md-3">
                  <div className="caseBA" onClick={()=>handleClickStorage('BusinessCaseBuilder','/questionBusMain/Ideation/BusinessCaseBuilder/Introduction')}>
                      <p className="caseBAPV">View</p>
                      <p className="caseBAP">Ideation</p>
                      <p className="caseBAP2">Create your Idea from start to finish</p>
                      {/* <p className="caseBAP3">10:20pm 10.10.2022</p> */}
                      <p className="caseBAP2">7 Documents</p>
                  </div>
              </div>

              {projectDetails && !projectDetails.includes("Product Definition") && (
              <div className="col-md-3">
                <div 
                  className={`caseBA2 ${!unlock ? 'locked' : ''}`}  
                  onClick={unlock ? ()=>handleClick('/questionBusMain/ProductDefinition/BusinessAnalysisPack/CustomerSegments') : null}
                >
                  
                      <p className="caseBA2PV">View</p>
                      <p className="caseBA2P">Product Definition</p>
                      <p className="caseBA2P2">Design your business processes and flow</p>
                      {/* <p className="caseBA2P3">10:20pm 10.10.2022</p> */}
                      <p className="caseBA2P2">4 Documents</p>
                      
                  </div>
              </div>
              )}
              
              
          


              
                {projectDetails && !projectDetails.includes("Initial Design") && (
                <div className="col-md-3">
                  <div 
                  className={`caseBA3 ${!unlock ? 'locked' : ''}`}  
                  onClick={unlock ? ()=>handleClick('/questionBusMain/InitialDesign/ClaimTheDomain/DomainName') : null}
                  >
                    
                        <p className="caseBA3PV">View</p>
                        <p className="caseBA3P">Initial Design</p>
                        <p className="caseBA3P2">Plan design and add members to Team</p>
                        {/* <p className="caseBA3P3">10:20pm 10.10.2022</p> */}
                        <p className="caseBA3P2">2 Documents</p>
                        <div style={{paddingBottom:10}}></div>
                    </div>
                </div>
            )}

              {projectDetails && !projectDetails.includes("Validating and Testing") && (           
              <div className="col-md-3">
                  
                  <div 
                    className={`caseBA ${!unlock ? 'locked' : ''}`}  
                    onClick={unlock ? ()=>handleClick('/questionBusMain/ValidatingAndTesting/FullProductProjectReview/Review') : null}
                  >
                      <p className="caseBAPV">View</p>
                      <p className="caseBAP">Validating and Testing</p>
                      <p className="caseBAP2">Test and validate your prodduct</p>
                      {/* <p className="caseBAP3">10:20pm 10.10.2022</p> */}
                      <p className="caseBAP2">3 Documents</p>
                  </div>
              </div>
                )}

            {projectDetails && !projectDetails.includes("Commercialization") && (
            
              <div className="col-md-3">
                    <div 
                    // className={`caseBA2 ${!unlock ? 'locked' : ''}`}  
                    onClick={unlock ? ()=>handleClick('/questionBusMain/Commercialization/BringTheMVPToFullScale/GetTheMVPToFruition') : null}
                  >
                  
                      <p className="caseBA2PV">View</p>
                      <p className="caseBA2P">Commercialization</p>
                      <p className="caseBA2P2">Get your product ready to launch for production</p>
                      {/* <p className="caseBA2P3">10:20pm 10.10.2022</p> */}
                      <p className="caseBA2P2">2 Documents</p>
                      <div style={{paddingBottom:10}}></div>
                  </div>
              </div>
              )}

            <div className="col-md-3">
                  <div className="caseBA3" onClick={()=>handleClickStorage('Kpi', '/kpi')}>
                      <p className="caseBA3PV">View</p>
                      <p className="caseBA3P">KPI</p>
                      <p className="caseBA3P2">Create Custom Graphs that gives you more insight</p>
                      {/* <p className="caseBA3P3">10:20pm 10.10.2022</p> */}
                      <p className="caseBA3P2">6 Graph Types</p>
                  </div>
              </div>


              <div className="col-md-3">
                  <div className="caseBA4" onClick={()=>handleClick('/scrapView')}>
                      
                      <p className="caseBA4P">ScrapBook</p>
                      <p className="caseBA4P2">Create Notes that you can look back at later</p>

                      <button className="lookF">Have a Feel</button>

                  </div>
              </div>

              
              <div className="col-md-3">
                  <div className="caseBA3" onClick={()=>handleClick('/pitchDeckStart')}>
                      <p className="caseBA3PV">View</p>
                      <p className="caseBA3P">Pitch Deck</p>
                      <p className="caseBA3P2">Store Pitch Decks and have access to resources</p>
                      {/* <p className="caseBA3P3">10:20pm 10.10.2022</p> */}
                      <p className="caseBA3P2">5 Documents</p>
                      <div style={{paddingBottom:10}}></div>
                  </div>
              </div>



              {/* <div className="col-md-12">
                  <div className="innerStart2">
                      <div style={{padding:37}}>
                          <p className="ttas">Create Task</p>
                          <div className="row">
                              <div className="col-md-3">
                                  <p style={{marginBottom:0, fontSize:13}}>You can create task and assign</p>
                                  <p style={{marginBottom:0, fontSize:13}}>To team members</p>
                              </div>

                              <div className="col-md-9">
                                  <div className="upgi" onClick={()=>handleClick('/createTask')}>
                                      <p style={{marginBottom:0, color:"#fff"}}>Create Task</p>
                                      
                                  </div>
                              </div>
                              
                          </div>
                          
                      </div>
                    
                  </div>
              </div> */}
              <div className="col-md-12">
                  <div className="innerStart2">
                      <div style={{padding:37}}>
                          <p className="ttas">Share Phases</p>
                          <div className="row">
                              <div className="col-md-3">
                                  <p style={{marginBottom:0, fontSize:13}}>You Feel your file is ready</p>
                                  <p style={{marginBottom:0, fontSize:13}}>For review</p>
                              </div>

                              <div className="col-md-9">
                                  <div className="upgi" onClick={()=>handleClick('/sharePhase')}>
                                      <p style={{marginBottom:0, color:"#fff"}}>Review</p>
                                      
                                  </div>
                              </div>
                              
                          </div>
                          
                      </div>
                    
                  </div>
              </div>

              <div className="col-md-3">
                  <div className="innerStart">
                  
                      <div className="text-center">
                      <img src={bolt} alt="Streak" className="datImage m-auto" style={{width:"20%"}}/>
                      </div>
                          
                          <p className='dat2' style={{marginBottom:0}}>{streak} Days!</p>
                          <p className='dat2' style={{fontWeight:700}}>Streak</p>
                      
                  </div>
              </div>


              <div className="col-md-6">
                  <div className="innerStart">
                      <div style={{padding:37}}>
                          <p className="ttas">Total Task</p>
                          <div className="row">
                              <div className="col-md-3">
                              <p>{timelineCount !== '' ? timelineCount : 0}</p>
                              </div>

                              <div className="col-md-9">
                              {timelineCount !== '' && (
                                  <div className="upgi" onClick={()=>handleClick('/uploadTask')}>
                                  <p style={{marginBottom:0, color:"#fff"}}>Upload Files</p>
                                  </div>
                              )}
                              </div>
                              
                          </div>
                          
                      </div>
                    
                  </div>
              </div>



              <div className="col-md-3">
                  <div className="innerStart" style={{padding:20}}>
                      <p className="crh1">Craddule Hub</p>
                      <p className="crh2">View uploaded files in your project</p>
                      <button className="lookF" style={{marginTop:20, marginBottom:20}} onClick={()=>handleClick('/craddule')}>View Files</button>
                  </div>
              </div>
          </div>

          <div className="col-md-12">
                  <div className="innerStart2">
                      <div style={{padding:37}}>
                          <p className="ttas">Refer a Friend</p>
                          <div className="row">
                              <div className="col-md-3">
                                  <p style={{marginBottom:0, fontSize:13}}>Invite friends and collegues to join Craddule</p>
                              </div>

                              <div className="col-md-9">
                                  <div className="upgi" onClick={()=>handleClick('/referral')}>
                                      <p style={{marginBottom:0, color:"#fff"}}>Refer</p>
                                  </div>
                              </div>
                              
                          </div>
                          
                      </div>
                    
                  </div>
              </div>

          
          <div className="row">
          {timelines.map((timeline) => (
              <div className="col-md-3">
                  <div className='progTeam'>
                      <p className='teamP'>{timeline.task}</p>
                      <progress value={timeline.completionPercentage} max="100" className='progressB'></progress>
                      <p className='teamP2'>{timeline.completionPercentage}% Done</p>
                      <p className="caseBAPV" style={{color:"#fff", marginTop:30}} onClick={()=>handleClick('/TimelineView')}>View Feed</p>
                  </div>
              </div>
          ))}
          </div>


          <div className="row">
              <div className="col-md-3">
                  <div className="caseBA5" onClick={()=>handleClick('/generalSetting')}>
                      <CiLock className="m-auto" style={{color: "#fff",fontSize: 25}}/>
                      <p className="caseBA5P">Change Password</p>
                      
                      
                  </div>
              </div>

              <div className="col-md-3">
                  <div className="caseBA5" onClick={()=>handleClick('/profile')}>
                      <CiUser className="m-auto" style={{color: "#fff",fontSize: 25}}/>
                      <p className="caseBA5P">Edit Profile</p>
                      
                      
                  </div>
              </div>

              <div className="col-md-3">
                  <div className="caseBA5" onClick={()=>handleClick('/termAgreement')}>
                      <CiMemoPad className="m-auto" style={{color: "#fff",fontSize: 25}}/>
                      <p className="caseBA5P">Terms & Conditions</p>
                      
                      
                  </div>
              </div>


              <div className="col-md-3">
                  <div className="caseBA5" onClick={()=>handleClick('/privacy')}>
                      <CiMemoPad className="m-auto" style={{color: "#fff",fontSize: 25}}/>
                      <p className="caseBA5P">Privacy Policy</p>
                  </div>
              </div>

          </div>


          <div className="startWrap"></div>
      </div>    
    </div> 
  );
}

export default InflationRateGraph;
