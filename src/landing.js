// LandingPage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import depth from './images/depth.png';
import { useNavigate } from 'react-router-dom';
import ModalStart from './component/modalStartStop';
import Loading from './component/loading.js';  // Import the Loading component
import {
  useValidateToken,
  useFetchUserProjects,
  useFetchTeamProjects,
  useFetchReviewProjects,
  formatDate,
  getUserIdFromToken,
} from './utils/landingPageUtils.js'; // Import utilities
import GetCard from './getCard.js';

function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [reviewProjects, setReviewProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Utility hooks
  useValidateToken();
  const userId = getUserIdFromToken();

  // Fetch data and update loading state
  useFetchUserProjects(userId, (data) => {
    setProjects(data);
    setIsLoading(false); // Set loading to false after fetching
  });
  useFetchTeamProjects(userId, setTeamMembers);
  useFetchReviewProjects(userId, setReviewProjects);

  const handleProjectClick = (projectId, name, count) => {
    localStorage.setItem('nProject', projectId);
    localStorage.setItem('nProjectName', name);
    localStorage.setItem('nProjectCount', count);
    navigate(`/start`);
  };

  const handleProjectTeamClick = (projectId, name, count) => {
    localStorage.setItem('nProject', projectId);
    localStorage.setItem('nProjectName', name);
    localStorage.setItem('nProjectCount', count);
    navigate(`/start`);
  };

  const handleProjectReviewClick = (reviewId, name, count) => {
    localStorage.setItem('nReview', reviewId);
    localStorage.setItem('nProjectName', name);
    localStorage.setItem('nProjectCount', count);
    navigate(`/sharereview/${reviewId}`);
  };

  if (isLoading) {
    // Render the Loading component if data is still being fetched
    return <Loading label="Loading your projects..." />;
  }

  return (
    <div>
      <div className='landP'>
        <div className='container'>
          <div className='proSeg2'>
            <div className='text-center'>
              <p className='landT wow fadeInUp'>CONTINUE YOUR</p>
              <p className='landT2 wow fadeInDown'>JOURNEY</p>
            </div>

            <div className='row wow fadeInDown'>
              <div className='col-md-3'>
                <div className='addPro'>
                  <span className='plusP' onClick={() => setIsOpen(true)}>+</span>
                  <div className='addProSh'>
                    <p style={{ marginBottom: 0 }}>Create Project</p>
                  </div>
                </div>
              </div>
              {projects.map((member) => (
                <div className='col-md-3' key={member._id}>
                  <div onClick={() => handleProjectClick(member._id, member.projectName, member.projectCount)}>
                    <div className='addPro' style={{ paddingTop: '65px' }}>
                      <span className='plusP' style={{ fontSize: '20px' }}>Continue</span>
                      <div className='addProSh' style={{ marginTop: '70px' }}>
                        <p style={{ marginBottom: 0 }}>{member.projectName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional sections for team members and review projects */}
      <div style={{ backgroundColor: '#1b45bf', paddingBottom: '40px', paddingTop: '40px' }}>
        <div className='container'>
          {teamMembers.length > 0 && <p className='proSubTitle' style={{ color: '#fff' }}>Team Member</p>}
          {teamMembers.map((member) => (
            <div className='row wow fadeInDown' key={member.projectId}>
              <div className='col-md-3'>
                <div onClick={() => handleProjectTeamClick(member.projectId, member.projectDetails.project, member.projectDetails.projectCount)}>
                  <div className='addPro' style={{ paddingTop: '65px' }}>
                    <span className='plusP' style={{ fontSize: '20px' }}>Continue</span>
                    <div className='addProSh' style={{ marginTop: '70px' }}>
                      <p style={{ marginBottom: 0 }}>{member.projectDetails.project}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {reviewProjects.length > 0 && <p className='proSubTitle' style={{ color: '#fff' }}>Review Project</p>}
          {reviewProjects.map((review) => (
            <div className='row wow fadeInDown' key={review._id}>
              <div className='col-md-3'>
                <div onClick={() => handleProjectReviewClick(review._id, review.projectName, review.projectCount)}>
                  <div className='addPro' style={{ paddingTop: '65px' }}>
                    <span className='plusP' style={{ fontSize: '20px' }}>Continue</span>
                    <div className='addProSh' style={{ marginTop: '70px' }}>
                      <p style={{ marginBottom: 0 }}>{review.projectName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalStart open={isOpen} onClose={() => setIsOpen(false)} />
      <GetCard/>
    </div>
  );
}

export default LandingPage;