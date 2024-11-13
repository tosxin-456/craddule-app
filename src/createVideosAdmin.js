import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import {API_BASE_URL} from './config/apiConfig';

function CreateVideo() {
  const navigate = useNavigate();
  const onClickHandler = () => navigate(`/loadingPage`);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    videolink: '',
    Phase: '',
    watchTime: '',
    showWhen: 'beginning', // Default to 'beginning'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createVideo(formData);
  };

  const createVideo = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/ourVideoAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        setLoading(false);
        toast.success("Video created successfully");
        console.log('Video created successfully:', responseData);
        //navigate(`/video/${responseData.data._id}`);
      } else {
        const result = await response.json();
        setLoading(false);
        toast.error(result.error);
        console.error('Error:', result.error);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Failed to create video');
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='container'>
      <div className='wholeP'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='loginH'>
              <p className='lgT'>Create Video</p>
              <p className='lgT2'>Add a new video to the system</p>

              <form onSubmit={handleSubmit}>
                <div className="inputs-container">
                  <label htmlFor="videolink" className='lab'>Video Link</label>
                  <input
                    type="text"
                    id="videolink"
                    value={formData.videolink}
                    onChange={handleChange}
                    className="custom-input"
                    required
                  />
                </div>

                <div className="inputs-container">
                  <label htmlFor="Phase" className='lab'>Phase</label>
                  <input
                    type="text"
                    id="Phase"
                    value={formData.Phase}
                    onChange={handleChange}
                    className="custom-input"
                    required
                  />
                </div>

                <div className="inputs-container">
                  <label htmlFor="watchTime" className='lab'>Watch Time (in seconds)</label>
                  <input
                    type="text"
                    id="watchTime"
                    value={formData.watchTime}
                    onChange={handleChange}
                    className="custom-input"
                    required
                  />
                </div>

                <div className="inputs-container">
                  <label htmlFor="showWhen" className='lab'>Show When</label>
                  <select
                    id="showWhen"
                    value={formData.showWhen}
                    onChange={handleChange}
                    className="custom-input"
                    required
                  >
                    <option value="beginning">Beginning</option>
                    <option value="end">End</option>
                  </select>
                </div>

                <button type="submit" className='btn loginBtn' disabled={loading}>
                  {loading ? <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' /> : <span>Create Video</span>}
                </button>
              </form>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='halfWh'>
              <div className='blurry'>
                <p>"You will never do anything in this world without courage. It is the greatest quality of the mind next to honor."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default CreateVideo;
