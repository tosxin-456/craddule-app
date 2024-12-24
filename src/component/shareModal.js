import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../config/apiConfig';
import { Toaster, toast } from 'sonner';

export default function ShareModal({ open, onClose, selectedPhase }) {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const navigate = useNavigate();
  const projectId = localStorage.getItem('nProject');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    projectId: projectId,
    link: ''
  });

  if (!open) return null;

  const token = localStorage.getItem('access_token');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }).catch((error) => {
      console.error('Failed to copy the link: ', error);
    });
  };

  const createReview = async (data) => {
    setLoading(true);
    console.log(selectedPhase)
    try {
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 8);
      const uniqueCode = timestamp.toString() + randomString;
      const link = "/share/start/" + uniqueCode;

      console.log(link);

      const updatedFormData = {
        ...data,
        link: link,
        uniqueCode: uniqueCode,
        projectId: projectId,
        email: data.email,
        phases: selectedPhase, // Send only the selected phase
      };

      const response = await fetch(API_BASE_URL + '/api/share/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.status === 200) {
        setLoading(false);
        console.log(response);
        setLink("https://app.craddule.com" + link);
        setSuccessMessage('Invitation sent successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 10000);

      } else {
        const result = await response.json();
        setLoading(false);
        console.error('Error:', result['error']);
      }
    } catch (error) {
      setLoading(false);
      console.error('An error occurred:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview(formData);
  };

  const handleClose = () => {
    setLink('');
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return ReactDOM.createPortal(
    <>
      <div className='modalOv'>
        <div className='modalSt'>
          <p type='button' onClick={handleClose} className='closeIcon'>X</p>
          {/* <hr></hr> */}
          <div className=''>
            <p className='text-center text-[25px] '>Share Phase</p>
            {link && (
              <div>
                {successMessage && (
                  <p className="sentCop">{successMessage}</p>
                )}
                <p className='text-center'>
                  <button className='cop' onClick={copyToClipboard}>
                    Copy Link
                  </button>
                </p>
              </div>
            )}
            <div className='text-start'>
              <form onSubmit={handleSubmit}>
                <div className=''>
                  <div className='items-center m-5 '>
                    <p>Email</p>
                    <input
                      type="text"
                      className='bg-[#E8ECF9] px-5 py-3 w-full rounded-2xl '
                      placeholder="Enter recipient email"
                      id="email"
                      value={formData.email} 
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <button className="bg-blue-900 w-full h-10 text-white rounded-3xl" typeof='submit' style={{ marginLeft: 5 }}>
                  {loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' />}
                  {!loading && <span> Send</span>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
