import React, { useState } from 'react';
import acc from './images/log.png'; 
import { FetchUser, getUserIdFromToken } from './utils/startUtils';
import updateProject from './utils/projectUtils';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import HeaderIdeation from './component/headerIdeation';;


const Accelerate = () => {
  const [phases, setPhases] = useState([
    { title: 'IDEATION', content: 'The ideation phase is a creative process where teams/individuals can brainstorm and generate ideas to address specific problems or opportunities. This phase focuses on exploring a wide range of possibilities, encouraging innovative thinking, and refining concepts. The goal is to identify viable ideas that can be developed into successful products or businesses.' },
    { title: 'PRODUCT DEFINITION', content: 'The product definition phase involves clearly outlining the product’s goals, features, and specifications. During this phase, teams/individuals should define the target market, user needs, and technical requirements. This phase serves as a blueprint, ensuring alignment among stakeholders and guiding the subsequent design, development, and production processes.' },
    { title: 'INITIAL DESIGN', content: 'The initial design phase transforms ideas into tangible concepts through sketches, prototypes, and models. During this phase, teams focus on visualizing the products look, feel, and functionality, iterating on designs to meet user needs and technical requirements. It sets the foundation for detailed design and development.' },
    { title: 'VALIDATING AND TESTING', content: 'The validation and testing phase ensures that the product/service meets its design specifications and user needs. During this phase, the product undergoes rigorous testing for functionality, performance, and safety. Feedback from these tests is used to make necessary adjustments, ensuring the product is ready for market launch.' },
    { title: 'COMMERCIALIZATION', content: 'The commercialisation phase involves launching the product into the market. This phase includes finalizing production, marketing strategies, distribution, and sales channels. It focuses on scaling production, building brand awareness, and driving market adoption. The goal is to maximize product impact and achieve business objectives through successful market entry.' }
  ]);

  const [completedPhases, setCompletedPhases] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {access_token, userId} = getUserIdFromToken();

  FetchUser(userId, setUserDetails, setError, setLoading);

  const handlePhaseClick = (phase) => {
    setCompletedPhases(prev =>
      prev.includes(phase)
        ? prev.filter(p => p !== phase)
        : [...prev, phase]
    );
  };

  const handleContinueClick = () => {
    updateProject(completedPhases, 'Craddule demo', setLoading, navigate);
    console.log("Selected Phases:", completedPhases); // For debugging purposes
  };
  // const unselectedPhases = phases.filter(phase => 
  //   !completedPhases.some(completedPhase => completedPhase === phase.title)
  // );
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-[url('./images/pattern_big.png')] bg-contain bg-repeat z-[-999] opacity-0">
      </div>
      <div className='mx-24'>
        <div className='mt-10'>
          <h3 className="text-blue600 text-center">Hello, {userDetails?.firstName}!</h3>
          <h5 className="text-black400 text-center mt-8">What stages have you gone through in your Business.</h5>
          <h5 className="text-black400 text-center">Please select what you have done</h5>
        </div>
        <div className='grid grid-cols-12 gap-3 mt-14'>
          {phases.map((phase, index) => ( index<3 ?
            <div className='col-span-4' key={phase} onClick={() => handlePhaseClick(phase)}>
              <div className={`p-8 w-[402px] h-[416px] text-center rounded-[10px] text-white hover:bg-blue600 cursor-pointer ${completedPhases.includes(phase) ? 'bg-blue600' : 'bg-black500'}`}>
                <h6 className=''>{phase.title}</h6>
                <p className='mt-6 text-p18 font-light'>{phase.content}</p>
              </div>
            </div>
            :
              <div className={`col-span-6 ${index==4 ? 'justify-self-start':'justify-self-end'}`} key={phase} onClick={() => handlePhaseClick(phase)}>
                <div className={`p-8 w-[402px] h-[416px] text-center rounded-[10px] text-white hover:bg-blue600 cursor-pointer ${completedPhases.includes(phase) ? 'bg-blue600' : 'bg-black500'}`}>
                  <h6 className=''>{phase.title}</h6>
                  <p className='mt-6 text-p18 font-light'>{phase.content}</p>
                </div>
              </div>
          ))}
        </div>
      </div>
      <div className='my-14'>
        <button onClick={handleContinueClick} className='block py-3 px-52 bg-blue600 rounded-full text-white m-auto'>
          {loading ? <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' /> : <span>Continue</span>}
        </button>
      </div>
    </div>
  );
};

export default Accelerate;