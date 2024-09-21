import React, { useState } from 'react';
import ModalQoute from './component/accModal';
import acc from './images/log.png'; 


const Accelerate = () => {
  const [phases, setPhases] = useState([
    { title: 'Ideation', content: 'The ideation phase is a creative process where teams/individuals can brainstorm and generate ideas to address specific problems or opportunities. This phase focuses on exploring a wide range of possibilities, encouraging innovative thinking, and refining concepts. The goal is to identify viable ideas that can be developed into successful products or businesses.' },
    { title: 'Product Definition', content: 'The product definition phase involves clearly outlining the product’s goals, features, and specifications. During this phase, teams/individuals should define the target market, user needs, and technical requirements. This phase serves as a blueprint, ensuring alignment among stakeholders and guiding the subsequent design, development, and production processes.' },
    { title: 'Initial Design', content: 'The initial design phase transforms ideas into tangible concepts through sketches, prototypes, and models. During this phase, teams focus on visualizing the products look, feel, and functionality, iterating on designs to meet user needs and technical requirements. It sets the foundation for detailed design and development.' },
    { title: 'Validating and Testing', content: 'The validation and testing phase ensures that the product/service meets its design specifications and user needs. During this phase, the product undergoes rigorous testing for functionality, performance, and safety. Feedback from these tests is used to make necessary adjustments, ensuring the product is ready for market launch.' },
    { title: 'Commercialization', content: 'The commercialisation phase involves launching the product into the market. This phase includes finalizing production, marketing strategies, distribution, and sales channels. It focuses on scaling production, building brand awareness, and driving market adoption. The goal is to maximize product impact and achieve business objectives through successful market entry.' }
  ]);

  const [completedPhases, setCompletedPhases] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const handlePhaseClick = (phase) => {
    setCompletedPhases(prev =>
      prev.includes(phase)
        ? prev.filter(p => p !== phase)
        : [...prev, phase]
    );
  };

  const handleContinueClick = () => {
    setIsOpen(true);
    console.log("Selected Phases:", completedPhases); // For debugging purposes
  };
  const unselectedPhases = phases.filter(phase => 
    !completedPhases.some(completedPhase => completedPhase === phase.title)
  );
  return (
    <div>
    <div className="accBack">
    <div className='container-fluid'>
      <div className='coverPit' style={{ backgroundColor: 'transparent' }}>
        <p className='whatS'>What stages have you gone through in your Business.</p>
        <p className='whatS'>Please Select what you have done</p>
        <div className='row' style={{marginTop:30}}>
          
          
          {phases.map((phase, index) => (
            <div className='col-md-4' key={phase} onClick={() => handlePhaseClick(phase)}>
            
              <div className={`accBox ${completedPhases.includes(phase) ? 'accBoxS' : ''}`}>
                <p className='ppitA'>{phase.title}</p>
                <p className='ppit2'>{phase.content}</p>
              </div>
            </div>
            
          ))}
          
           
          
         
        </div>

        <button onClick={handleContinueClick} className='continueButton'>Let's Give you Suggestions</button>
       
      </div>

      <ModalQoute
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
        completedPhases={completedPhases}
        style={{borderRadius: 25, width: 400}}
      />
    </div>
    </div>
    </div>
  );
};

export default Accelerate;