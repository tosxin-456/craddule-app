import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import Time from './time';
import Progress from './progress';
import WorkLoad from './workLoad';
import Task from './task';
import Cost from './cost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';



function TrackPage ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/kpiPage`)
    return (

        <>

        <div className='container-fluid'>
            <Header />
            <div className='row'>
            <Menu /> 
                <div className='col-md-9'>
                    <img src={bci} className='bcA'></img>
                       <div className='div-kpi1'><p>KPI</p></div>
                <div className='centerKpi1'>
                <div  className='topButtonKpi'>
                <button className="btn btn-primary tFeem" type="button"  onClick={onClickHandler}>Create KPI</button>
                <button className="btn btn-primary tFeem1" type="button">Track KPI</button>
                <button className="btn btn-primary dropdown-toggle tFeem2" type="button" data-toggle="dropdown">Select Project</button>
                </div>

                {/* <div  className='bottomButtonKpi'>
                <button className="btn btn-primary  tFeems" type="button">Add a KPI<br></br><p className='txtc'>Add a KPI manually</p></button>
                <button className="btn btn-primary  tFeems1" type="button">Search for a KPI <br></br><p className='txtc'>Browse and add KPI's from the library</p></button>
                <button className="btn btn-primary  tFeems2" type="button">Add a KPI Template<p className='txtc'>Browse and add KPI's from the library</p></button>
                </div> */}

                        <div className='trackHeader'>
                <div className='progressKpi'>

                <div className='streakBar'>
                        <FontAwesomeIcon icon={faBoltLightning} className='boltBig'/>
                        </div>


                    <div>
                        <p className='Ustreak1'>Time spent on page</p>
                    <div>
                        <div className='kpiStreak'>
                        <p className='Ustreak'>You</p>
                        </div>
                    <div className='streak'>
                        <div className='streakBar'>
                        <FontAwesomeIcon icon={faBoltLightning} className='bolt'/>
                        </div>
                        <div>
                        <p className='streakP'>Time spent today: 1:30hr on design</p>
                        <progress value="40" max="100"></progress>
                        <p className='streakP'>7 days streak</p>
                        </div>
                    </div>
                    </div>
                    </div>
                    

                    <div>
                        <p className='Ustreak1'>Team Member</p>
                    <div>
                        <div className='kpiStreak'>
                        <p className='Ustreak'>Mike Odubekun</p>
                        </div>
                    <div className='streak'>
                        <div className='streakBar'>
                        <FontAwesomeIcon icon={faBoltLightning} className='bolt'/>
                        </div>
                        <div>
                        <p className='streakP'>Time spent today: 1:30hr on design</p>
                        <progress value="40" max="100"></progress>
                        <p className='streakP'>7 days streak</p>
                        </div>
                    </div>
                    </div>
                    </div>

                    <div>
                    <div className='vivian'>
                        <div className='kpiStreak'>
                        <p className='Ustreak'>Vivian London</p>
                        </div>
                    <div className='streak'>
                        <div className='streakBar'>
                        <FontAwesomeIcon icon={faBoltLightning} className='bolt'/>
                        </div>
                        <div>
                        <p className='streakP'>Time spent today: 1:30hr on design</p>
                        <progress value="40" max="100"></progress>
                        <p className='streakP'>7 days streak</p>
                        </div>
                    </div>
                    </div>
                    </div>

                    <div>
                    <div className='vivian'>
                        <div className='kpiStreak'>
                        <p className='Ustreak'>Mark Anthony</p>
                        </div>
                    <div className='streak'>
                        <div className='streakBar'>
                        <FontAwesomeIcon icon={faBoltLightning} className='bolt'/>
                        </div>
                        <div>
                        <p className='streakP'>Time spent today: 1:30hr on design</p>
                        <progress value="40" max="100"></progress>
                        <p className='streakP'>7 days streak</p>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                        </div>

                <div className='containerGraph'>
               <div> <Progress/></div>
                <Task/>
                
             </div>
         
             <div className='containerGraph'>
                <Time/>
                <div className='healthGraph'>
                   <div className="graphNam">Health</div>
                    <div className='health'>
                        <p className='healthP'>Time</p>
                        <p className='healthS'>14% ahead of schedule</p>
                        <di></di>
                    </div>
                    <hr className='healthRule'></hr>
                    <div className='health'>
                        <p className='healthP'>Task</p>
                        <p className='healthS'>14% ahead of schedule</p>
                        <di></di>
                    </div>
                    <hr className='healthRule'></hr>
                    <div className='health'>
                        <p className='healthP'>WorkLoad</p>
                        <p className='healthS'>14% ahead of schedule</p>
                        <di></di>
                    </div>
                    <hr className='healthRule'></hr>
                    <div className='health'>
                        <p className='healthP'>Progress</p>
                        <p className='healthS'>14% ahead of schedule</p>
                        <di></di>
                    </div>
                    <hr className='healthRule'></hr>
                    <div className='health'>
                        <p className='healthP'>Cost</p>
                        <p className='healthS'>14% ahead of schedule</p>
                        <di></di>
                    </div>

                  </div>
                
             </div>
             <div className='containerGraph'>
                <Cost/>
                <WorkLoad/>
                
             </div>
          
            
                </div> 
                <button className="btn btn-primary curveNext">Next</button>
          </div>
          </div>
          </div>
          </>
    );
}

export default TrackPage