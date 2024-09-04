import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import API_BASE_URL from '../config/apiConfig';
import { Toaster, toast } from 'sonner'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Make sure to set the root element for accessibility

const ModalQoute = ({ open, onClose, completedPhases }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  console.log(completedPhases);
  const updateProject = async (projectType) => {
    setLoading(true);
    console.log("Updating project...");
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;


    const projectId = localStorage.getItem('nProject');
    const data = {
      projectType,
      phases: completedPhases.map(phase => phase.title),
    };

    try {
      console.log("Request data:", data);

      const response = await fetch(`${API_BASE_URL}/api/project/type/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        console.log('Response:', responseData);

        toast.success('Project updated successfully!');
        setLoading(false);
        navigate('/loading');

      } else {
        const result = await response.json();
        console.error('Error:', result.error);
        toast.error(result.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      contentLabel="Selected Phases"
      className="Modal"
      overlayClassName="Overlay"
      style={{borderRadius: 25, width: 400}}
    >
      <p className='text-center'>We suggest this plans for you</p>
      {/* <ul>
        {completedPhases.map((phase, index) => (
          <li key={index}>
            <h3>{phase.title}</h3>
          </li>
        ))}
      </ul> */}
      {completedPhases.length > 1 ? (
                <div className='row'>
                    <div className="col-md-4" onClick={() => updateProject('Craddule Sprint')}>
                        <p className="opACC">Craddule Sprint</p>
                    </div>

                    <div className="col-md-4" onClick={() => updateProject('Craddule Pro')}>
                        <p className="opACC">Craddule Pro</p>
                    </div>
                    <div className="col-md-4" onClick={() => updateProject('Craddule Premium')}>
                        <p className="opACC">Craddule Premium</p>
                    </div>
                </div>
            ) : (
                <div className='row'>
                    <div className="col-md-6" onClick={() => updateProject('Craddule Pro')}>
                        <p className="opACC">Craddule Pro</p>
                    </div>

                    <div className="col-md-6" onClick={() => updateProject('Craddule Premium')}>
                        <p className="opACC">Craddule Premium</p>
                    </div>
                </div>
            )}
      {/* <button onClick={onClose} className='continueButton2'>Close</button> */}
      {/* <button className='continueButton2'>Continue</button> */}
    </Modal>
  );
};

export default ModalQoute;
