// LandingPage.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './images/logoc.png';
import { useNavigate } from 'react-router-dom';
import ModalStart from './component/modalStartStop';
import Loading from './component/loading.js';  // Import the Loading component
import {
  useValidateToken,
  useFetchUserProjects,
  useFetchTeamProjects,
  useFetchReviewProjects,
  formatDate,
} from './utils/landingPageUtils.js'; // Import utilities
import GetCard from './getCard.js';
import { CheckOnboarding, getUserIdFromToken, handleLogoutLanding } from './utils/startUtils.js';

function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [reviewProjects, setReviewProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Utility hooks
  // useValidateToken();
  const { userId } = getUserIdFromToken();

  // Fetch data and update loading state
  useFetchUserProjects(userId, (data) => {
    setProjects(data);
    setIsLoading(false); // Set loading to false after fetching
  });
  useFetchTeamProjects(userId, setTeamMembers);
  useFetchReviewProjects(userId, setReviewProjects);

  const handleProjectClick = async(projectId, name, count) => {
    localStorage.setItem('nProject', projectId);
    localStorage.setItem('nProjectName', name);
    localStorage.setItem('nProjectCount', count);
    await CheckOnboarding()
    navigate(`/start`);
  };

  const handleProjectTeamClick = (projectId, name, count) => {
    localStorage.setItem('nProject', projectId);
    localStorage.setItem('nProjectName', name);
    localStorage.setItem('nProjectCount', count);
    navigate(`/start`);
  };

  const handleProjectReviewClick = (reviewId, name, count) => {
    console.log(name)
    localStorage.setItem('nReview', reviewId);
    localStorage.setItem('nProjectName', name);
    localStorage.setItem('nProjectCount', count);
    navigate(`/sharereview/${reviewId}`);
  };
//  console.log(reviewProjects.projectId)

  if (isLoading) {
    // Render the Loading component if data is still being fetched
    return <Loading label="Loading your projects..." />;
  }

  return (
    <div>
      <div className='fixed w-full h-full top-0 left-0 z-[-999] landP'>
      </div>
      <div className="absolute top-10 left-10 flex items-center justify-between gap-4">
        <img src={logo} alt="Logo" className="w-[86.49px] h-[90px]" />
        <button
          onClick={handleLogoutLanding}
          className="px-3 py-2 bg-yellow-500 text-white rounded-[5px] hover:bg-yellow-600 transition"
        >
          Logout
        </button>
      </div>
      <div className='container'>
        <div className='proSeg2'>
          <div className='text-center'>
            <p className='text-[18px] lg:text-[80px]  font-bold text-white'>{`${projects.length == 0 ? `BEGIN YOUR LAUNCH` : 'CONTINUE YOUR'}`}</p>
            <p className='text-[18px] lg:text-[80px] font-bold text-white'>{`${projects.length == 0 ? `TO SUCCESS` : 'JOURNEY'}`}</p>
          </div>

          <div className='lg:grid   lg:grid-cols-12 lg:gap-0 gap-5 justify-center '>
            <div className={`${projects.length == 0 ? 'col-span-12' : 'col-span-4'} m-auto mb-5`}>
              <div className='w-[311px] h-[202px] text-white cursor-pointer' onClick={() => setIsOpen(true)}>
                <div className='bg-blue800 h-full flex justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 20 20"><path fill="#FFFFFF" d="M10 0c.423 0 .766.343.766.766v8.467h8.468a.766.766 0 1 1 0 1.533h-8.468v8.468a.766.766 0 1 1-1.532 0l-.001-8.468H.766a.766.766 0 0 1 0-1.532l8.467-.001V.766A.77.77 0 0 1 10 0" /></svg>
                </div>
                <div className='bg-blue900 h-8 flex justify-center items-center'>
                  <span className='text-center'>Create Project</span>
                </div>
              </div>
            </div>
            {projects.map((project) => (
              <div className='lg:col-span-4 flex-row justify-center m-auto mb-5' key={project._id}>
                <div className='block w-[311px] h-[202px] text-white cursor-pointer' onClick={() => handleProjectClick(project._id, project.projectName, project.projectCount)}>
                  <div className='bg-blue800 h-full flex justify-center items-center'>
                    <span>Continue</span>
                  </div>
                  <div className='bg-blue900 h-8 flex justify-center items-center'>
                    <span className='text-center'>{project.projectName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional sections for team members and review projects */}
        <div className='container'>
        {teamMembers.map((member) => (
          <div className="lg:col-span-4 flex-row justify-center m-auto mb-5" key={member.projectId}>
            <div
              className="block w-[311px] h-[202px] text-white cursor-pointer"
              onClick={() =>
                handleProjectTeamClick(
                  member.projectId,
                  member.projectDetails.project,
                  member.projectDetails.projectCount
                )
              }
            >
              <div className="bg-blue800 h-full flex justify-center items-center">
                <span>Continue</span>
              </div>
              <div className="bg-blue900 h-8 flex justify-center items-center">
                <span className="text-center"> Team Project {member.projectDetails.project}</span>
              </div>
            </div>
          </div>
        ))}

          {reviewProjects.map((review) => (
            <div className="lg:col-span-4 flex-row justify-center m-auto mb-5" key={review._id}>
              <div
                className="block w-[311px] h-[202px] text-white cursor-pointer"
                onClick={() =>
                  handleProjectReviewClick(
                    review._id,
                    review.projectId.projectName,
                    review.projectId.projectCount
                  )
                }
              >
                <div className="bg-blue800 h-full flex justify-center items-center">
                  <span>Continue</span>
                </div>
                <div className="bg-blue900 h-8 flex justify-center items-center">
                  <span className="text-center"> Review Project {review.projectId.projectName}</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      <ModalStart open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default LandingPage;