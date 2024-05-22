import React, { useState, useEffect } from 'react';
import Header from './component/header';
import Menu from './component/menu';
import ShareModal from './component/shareModal';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import axios from 'axios';
const phaseNames = [
  'Ideation',
  'Product Definition',
  'Prototyping',
  'Initial Design',
  'Validating and Testing',
  'Commercialization'
];

function PageShare() {
  const [share, setShare] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [circles, setCircles] = useState(new Array(6).fill(false));

  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;
  const { id } = useParams();
  // Clear localStorage on initial load

  const fetchShare = async () => {
    
    try {
      console.log(userId);
      const response = await fetch(`${API_BASE_URL}/api/share/review/${userId}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
        }
      });
      
      console.log("here");
      console.log("here");
      if (response.status === 200) {
        const data = await response.json();
        console.log(data.data);
        setShare(data.data);
        
      }else{
        const result = await response.json();
        console.error('Error:', result['error']);
      }
     
    } catch (err) {
     
      console.log(err);
    }
  };

  useEffect(() => {
    fetchShare();
  },[] );


  return (
    <>
      <div className='container-fluid'>
        
        <div className='row'>
          
        <div className='col-md-2'>
        </div>
          <div className='col-md-8'>
            <div className='centerC'>
              <div className='text-center'>
                <p className='centerH'>Share</p>
                <p className='centerHp'>Here you can share your work</p>
              </div>
              <div className='BoxPhase1'>
                <p className='centerH1v'>Phase</p>
                {share.map((phase, index) => (
                  <div className='BoxPhase' key={index}>
                    <div className='boxView'><p className='heading'>{phase}</p></div>
                    
                  </div>
                ))}
                <div className='boxView'>
                  <button className="btn btn-primary curveP" onClick={() => setIsOpen(true)}>Share</button>
                </div>
                
              </div>
            </div>
          </div>

          <div className='col-md-2'>
        </div>
        </div>
      </div>
    </>
  );
}

export default PageShare;
