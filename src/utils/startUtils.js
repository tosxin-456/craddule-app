import { useEffect } from "react";
import API_BASE_URL from '../config/apiConfig';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const handleClick = (url) => {
    window.location.href = url;
};

export const handleClickStorage = (selectedCase, url) => {
    localStorage.setItem('selectedCase', selectedCase);
    window.location.href = url;
};

// Function to handle logout
export const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
};
  
// Function to handle home redirection
export const handleHome = () => {
    window.location.href = '/home';
};

// Update Streak
export const updateStreak = async (setStreak) => {
  try {
    const token = localStorage.getItem('access_token'); 
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const projectId = localStorage.getItem('nProject');

    const response = await axios.post(`${API_BASE_URL}/api/streak/`, { userId, projectId });
    setStreak(response.data.streak);
  } catch (error) {
    console.log(error.response);
  }
};

// Decode JWT token and get user ID
export const getUserIdFromToken = () => {
  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId
  return {access_token, userId};
};

export const FetchProjectDetails = (projectId, setProjectDetails, setError, setLoading) => {
  useEffect(() => {
    const fetchProjectDetails = async () => {
      console.log("getting details")
      const id = projectId;
      console.log("getting details:"+ id)
        try {
            const response = await fetch(`${API_BASE_URL}/api/project/project/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
              const responseData = await response.json();
              console.log('Response:', responseData.data.phases);
              setProjectDetails(responseData.data.phases);
            }else{
              const result = await response.json();
              console.error('Error:', result.error);
            }          
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (projectId) {
        fetchProjectDetails();
    }
  }, [projectId, setProjectDetails, setError, setLoading]);
};

export const FetchGoStatus = (projectId, access_token, setUnlock) => {
  useEffect(() => {
    // Define an async function to fetch goStatus data
    const fetchGoStatus = async () => {
      try {
        // Make API request to check goStatus with Bearer token
        const response = await fetch(`${API_BASE_URL}/api/project/go/${projectId}/Ideation/Approved`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`, // Include Bearer token
            'Content-Type': 'application/json'
          }
        });

        // Check if the response status is 200
        if (response.status === 200) {
          const data = await response.json();
          console.log("go status");
          console.log(data.message);
          console.log(data.allCompleted);
          setUnlock(data.allCompleted);
        } else {
          const data = await response.json();
          console.log(data.message);
          console.log('Failed to fetch goStatus. Please try again later.');
        }
      } catch (err) {
        console.log('An error occurred while checking goStatus.');
      } finally {
        //setLoading(false);
      }
    };

    // Call the async function
    fetchGoStatus();
  }, [projectId, access_token, setUnlock]);
};

export const FetchTimelines = (projectId, setTimelines, setLoading, setError) => {
  useEffect(() => {
    const fetchTimelines = async () => {
      try { 
        const response = await axios.get(API_BASE_URL+`/api/algo/${projectId}`);
        console.log(response);
        setTimelines(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTimelines();
  }, [projectId, setTimelines, setLoading, setError]);
};

export const FetchTimelinesCount = (projectId, userId, access_token, setTimelineCount, setLoading, setError) => {
  useEffect(() => {
    const fetchTimelinesCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/timeline/count/projects/${userId}/${projectId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
          },
        });       
        if(response.ok) {
          const data = await response.json();
          console.log(data);
          console.log(data.count);
        setTimelineCount(data.count);
        setLoading(false);
        
        } else {
          console.error('Failed count');
        }
        
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchTimelinesCount();
  }, [projectId, userId, access_token, setTimelineCount, setLoading, setError]);
};