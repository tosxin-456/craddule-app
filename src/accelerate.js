import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleNotch,
  faLightbulb,
  faClipboardList,
  faPencilRuler,
  faFlaskVial,
  faRocket,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faChevronDown,
  faChevronUp,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FetchUser, getUserIdFromToken } from './utils/startUtils';
import updateProject from './utils/projectUtils';
import { useNavigate } from 'react-router-dom';

const Accelerate = () => {
  const phases = [
    {
      title: 'IDEATION',
      icon: faLightbulb,
      subtitle: 'Generate & Explore Ideas',
      content: 'The ideation phase is a creative process where teams/individuals can brainstorm and generate ideas to address specific problems or opportunities. This phase focuses on exploring a wide range of possibilities, encouraging innovative thinking, and refining concepts.',
      whatWeDo: [
        'Brainstorm creative solutions',
        'Identify market opportunities',
        'Research target problems',
        'Generate multiple concepts'
      ],
      detailedSteps: [
        'Conduct market research to understand current gaps and opportunities',
        'Use brainstorming techniques like mind mapping and SCAMPER method',
        'Analyze competitor solutions and identify differentiation opportunities',
        'Validate initial ideas through surveys and interviews',
        'Create idea evaluation matrices to rank concepts',
        'Document and organize all generated ideas for future reference'
      ]
    },
    {
      title: 'PRODUCT DEFINITION',
      icon: faClipboardList,
      subtitle: 'Define Goals & Requirements',
      content: 'The product definition phase involves clearly outlining the product\'s goals, features, and specifications. During this phase, teams/individuals should define the target market, user needs, and technical requirements.',
      whatWeDo: [
        'Define target market & users',
        'Set clear product goals',
        'Outline key features',
        'Create technical requirements'
      ],
      detailedSteps: [
        'Create detailed user personas and customer journey maps',
        'Define product vision, mission, and success metrics',
        'Prioritize features using frameworks like MoSCoW or Kano model',
        'Establish technical architecture and system requirements',
        'Set project timeline, budget, and resource allocation',
        'Create product roadmap with milestones and deliverables'
      ]
    },
    {
      title: 'INITIAL DESIGN',
      icon: faPencilRuler,
      subtitle: 'Create Prototypes & Models',
      content: 'The initial design phase transforms ideas into tangible concepts through sketches, prototypes, and models. During this phase, teams focus on visualizing the products look, feel, and functionality.',
      whatWeDo: [
        'Create sketches & wireframes',
        'Build interactive prototypes',
        'Design user interfaces',
        'Test usability concepts'
      ],
      detailedSteps: [
        'Develop low-fidelity wireframes and user flow diagrams',
        'Create high-fidelity mockups with visual design elements',
        'Build interactive prototypes using tools like Figma or Adobe XD',
        'Conduct initial usability testing with target users',
        'Iterate on design based on user feedback and testing results',
        'Finalize design specifications and create design system documentation'
      ]
    },
    {
      title: 'VALIDATING AND TESTING',
      icon: faFlaskVial,
      subtitle: 'Test & Refine Your Product',
      content: 'The validation and testing phase ensures that the product/service meets its design specifications and user needs. During this phase, the product undergoes rigorous testing for functionality, performance, and safety.',
      whatWeDo: [
        'Conduct user testing sessions',
        'Validate core assumptions',
        'Test functionality & performance',
        'Gather feedback & iterate'
      ],
      detailedSteps: [
        'Design and execute comprehensive testing protocols',
        'Conduct A/B tests to optimize user experience and conversion',
        'Perform technical testing including load, security, and compatibility tests',
        'Gather quantitative and qualitative feedback from beta users',
        'Analyze testing data and identify areas for improvement',
        'Implement necessary changes and conduct follow-up testing'
      ]
    },
    {
      title: 'COMMERCIALIZATION',
      icon: faRocket,
      subtitle: 'Launch & Scale Your Business',
      content: 'The commercialisation phase involves launching the product into the market. This phase includes finalizing production, marketing strategies, distribution, and sales channels.',
      whatWeDo: [
        'Develop go-to-market strategy',
        'Set up production & distribution',
        'Create marketing campaigns',
        'Scale business operations'
      ],
      detailedSteps: [
        'Finalize pricing strategy and revenue model',
        'Establish production processes and supply chain management',
        'Launch comprehensive marketing campaigns across multiple channels',
        'Set up sales processes and customer support systems',
        'Monitor key performance indicators and market response',
        'Scale operations based on market demand and feedback'
      ]
    }
  ];

  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [phaseSelections, setPhaseSelections] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    whatWeDo: false,
    detailedSteps: false
  });

  const navigate = useNavigate();
  const { access_token, userId } = getUserIdFromToken();

  // Fetch user details
  FetchUser(userId, setUserDetails, setError, setLoading);

  const handlePhaseCompletion = (hasUnderstood) => {
    const phase = phases[currentPhase];

    // Update phase selections
    setPhaseSelections(prev => ({
      ...prev,
      [phase.title]: hasUnderstood
    }));

    // Update completed phases array - using the same structure as original
    if (hasUnderstood && !completedPhases.some(p => p.title === phase.title)) {
      setCompletedPhases(prev => [...prev, phase]);
    } else if (!hasUnderstood && completedPhases.some(p => p.title === phase.title)) {
      setCompletedPhases(prev => prev.filter(p => p.title !== phase.title));
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const goToNextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
      setExpandedSections({ whatWeDo: false, detailedSteps: false }); // Reset expansions
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPhase = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
      setExpandedSections({ whatWeDo: false, detailedSteps: false }); // Reset expansions
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    setApiResponse(null);

    try {
      await updateProject(completedPhases, 'Craddule sprint', setLoading, navigate);

      console.log("Selected Phases:", completedPhases);

      setApiResponse({
        success: true,
        message: `Assessment completed successfully! You understood ${completedPhases.length} out of ${phases.length} phases.`,
        data: {
          completedPhases: completedPhases,
          projectName: 'Craddule sprint',
          phaseSelections: phaseSelections,
          totalPhases: phases.length,
          understoodCount: completedPhases.length
        }
      });

    } catch (error) {
      setApiResponse({
        success: false,
        message: 'Failed to submit assessment. Please try again.',
        error: error.message
      });
      setLoading(false);
    }
  };

  const phase = phases[currentPhase];
  const isUnderstood = phaseSelections[phase.title] === true;
  const isNotUnderstood = phaseSelections[phase.title] === false;
  const isUnselected = phaseSelections[phase.title] === undefined;

  return (
    <div
      style={{
        fontFamily: 'Manrope'
      }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      {/* Header with user greeting and Progress */}
      <div className="bg-white shadow-sm border-b">
        <div className="mx-6 md:mx-12 lg:mx-24 py-4">
          {/* User Greeting */}
          <div className="text-center mb-4">
            <p className="text-blue-600 text-xl md:text-2xl lg:text-3xl">
              Hello, {userDetails?.firstName}!
            </p>
            <p className="text-gray-600 mt-2 text-sm md:text-base lg:text-lg">
              Let's walk you through the 5 key phases of business development.
            </p>
            <p className="text-gray-600 text-xl font-bold md:text-base lg:text-lg">
              Read each phase and let us know if you understand the concepts
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <span className="text-sm text-gray-500">Phase</span>
              <div className="text-lg font-bold text-gray-800">
                {currentPhase + 1} of {phases.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Content */}
      <div className="mx-6 md:mx-12 lg:mx-24 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Phase Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={phase.icon} className="text-3xl text-blue-600" />
            </div>
            <p className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">{phase.title}</p>
            <p className="text-xl text-blue-600 mb-4">{phase.subtitle}</p>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              {phase.content}
            </p>
          </div>

          {/* Overview Info Box */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
            <div className="flex items-start">
              <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600 text-lg mt-1 mr-3" />
              <div>
                <p className="text-blue-800 font-medium mb-2">Phase Overview</p>
                <p className="text-blue-700 text-sm">
                  Take your time to read through this phase. You can expand the sections below for more detailed information, then let us know if you understand the concepts covered.
                </p>
              </div>
            </div>
          </div>

          {/* What We Do Section - Collapsible */}
          <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('whatWeDo')}
              className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
            >
              <div>
                <p className="text-xl font-bold text-gray-800">What We Do in This Phase</p>
                <p className="text-sm text-gray-500 mt-1">
                  {expandedSections.whatWeDo ? 'Click to collapse' : 'Click to expand details'}
                </p>
              </div>
              <FontAwesomeIcon
                icon={expandedSections.whatWeDo ? faChevronUp : faChevronDown}
                className="text-gray-400 text-lg"
              />
            </button>

            {expandedSections.whatWeDo && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {phase.whatWeDo.map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Detailed Steps Section - Collapsible */}
          <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
            <button
              onClick={() => toggleSection('detailedSteps')}
              className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
            >
              <div>
                <p className="text-xl font-bold text-gray-800">Detailed Steps & Activities</p>
                <p className="text-sm text-gray-500 mt-1">
                  {expandedSections.detailedSteps ? 'Click to collapse' : 'Click to expand step-by-step guide'}
                </p>
              </div>
              <FontAwesomeIcon
                icon={expandedSections.detailedSteps ? faChevronUp : faChevronDown}
                className="text-gray-400 text-lg"
              />
            </button>

            {expandedSections.detailedSteps && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="space-y-4 mt-4">
                  {phase.detailedSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <span className="text-sm font-semibold text-blue-600">{idx + 1}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Understanding Assessment */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-200">
            <p className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Do you understand this phase?
            </p>
            <p className="text-gray-600 text-center mb-6">
              Based on the information above, do you feel you understand the key concepts and activities in the {phase.title.toLowerCase()} phase?
            </p>

            {/* Selection Status Indicator */}
            {isUnselected && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <span className="text-yellow-800 font-medium">Please select your understanding level</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handlePhaseCompletion(true)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${isUnderstood
                  ? 'bg-green-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50'
                  }`}
              >
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                Yes, I understand
              </button>

              <button
                onClick={() => handlePhaseCompletion(false)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${isNotUnderstood
                  ? 'bg-red-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50'
                  }`}
              >
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                No, I need more clarity
              </button>
            </div>
          </div>

          {/* API Response Display */}
          {apiResponse && (
            <div className={`rounded-2xl p-6 mb-8 ${apiResponse.success
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
              }`}>
              <div className="flex items-start">
                <FontAwesomeIcon
                  icon={apiResponse.success ? faCheckCircle : faTimes}
                  className={`text-xl mr-3 mt-1 ${apiResponse.success ? 'text-green-600' : 'text-red-600'
                    }`}
                />
                <div>
                  <p className={`text-lg font-semibold mb-2 ${apiResponse.success ? 'text-green-800' : 'text-red-800'
                    }`}>
                    {apiResponse.success ? 'Assessment Complete!' : 'Error'}
                  </p>
                  <p className={`${apiResponse.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                    {apiResponse.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-6">
            <button
              onClick={goToPrevPhase}
              disabled={currentPhase === 0}
              className={`flex justify-center items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto ${currentPhase === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
              Previous Phase
            </button>

            {currentPhase === phases.length - 1 ? (
              <button
                onClick={handleFinish}
                disabled={loading}
                className="flex justify-center items-center px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {loading ? (
                  <FontAwesomeIcon icon={faCircleNotch} className="fa-spin mr-2" />
                ) : (
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                )}
                {loading ? 'Processing...' : 'Complete Assessment'}
              </button>
            ) : (
              <button
                onClick={goToNextPhase}
                className="flex justify-center items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Next Phase
                <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
              </button>
            )}
          </div>

          {/* Progress Summary */}
          <div className="mt-8 space-y-4">
            {/* Phase Understanding Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-lg font-semibold text-gray-800 mb-4">Understanding Assessment Summary</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {phases.map((p, idx) => {
                  const selection = phaseSelections[p.title];
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-sm ${selection === true
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : selection === false
                          ? 'bg-red-50 border-red-200 text-red-800'
                          : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                    >
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={
                            selection === true
                              ? faCheckCircle
                              : selection === false
                                ? faTimes
                                : faCircleNotch
                          }
                          className="mr-2"
                        />
                        <span className="font-medium">{p.title}</span>
                      </div>
                      <div className="text-xs mt-1">
                        {selection === true
                          ? 'Understood'
                          : selection === false
                            ? 'Needs clarity'
                            : 'Not assessed yet'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Overall Progress */}
            {completedPhases.length > 0 && (
              <div className="text-center">
                <div className="inline-flex items-center bg-blue-50 px-6 py-3 rounded-full border border-blue-200">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">
                    You understand {completedPhases.length} of {phases.length} phases so far
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accelerate;