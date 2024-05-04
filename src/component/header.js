import React, { useState,useEffect } from 'react';
import p1 from './../images/p1.jpeg';
import p2 from './../images/p2.jpeg';
import p3 from './../images/p3.jpeg';
import p4 from './../images/p4.jpeg';
import p5 from './../images/p5.jpeg';
import p6 from './../images/p6.jpeg';
import { CiBellOn ,CiUser, CiChat2} from 'react-icons/ci';
import ChatToolModal from './chatToolModal';
import API_BASE_URL from '../config/apiConfig';
import { checkTokenValidity } from '../util/auth';

const Header = () => {
    const projectId = localStorage.getItem('nProject');
    const [isOpen, setIsOpen]= useState(false);
    const [projectName, setProjectName] = useState('');
    useEffect(() => {
        const { isValid, expired } = checkTokenValidity();
    
        if (!isValid || expired) {
          // Token doesn't exist or has expired, navigate user to login page
          window.location.href = '/login';
        }
      }, []);
      
    const fetchProjectName = async () => {
        try {
          const token = localStorage.getItem('access_token'); // Get the token from localStorage
          console.log(token);
          const response = await fetch(API_BASE_URL + `/api/project/user/${projectId}`, {
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch project name');
          }
          const data = await response.json();
          console.log(data);
          setProjectName(data.name);
        } catch (error) {
          console.error('Error fetching project name:', error);
        }
      };
  

  useEffect(() => {
    

    fetchProjectName();
  }, [projectId]);

    
    return(
        <>
    <div className="headerH">
        <div className='row'>
            <div className='col-md-2'>
                <p className='pName'>{projectName}</p>
                <p className='pSlogan'>Just Do It</p>

            </div>

            <div className='col-md-7'>
                {/* <div class="proTop">
                    <img src={p2} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p3} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p4} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p5} alt="Circular Image" className="circular-image-top"/>
                </div> */}

               

            </div>

            <div className='col-md-3'>
                <div className='fll'>
                    <span className='iconS2 mr'><CiBellOn /></span>
                   <span className='iconS2' type='button' onClick={()=>setIsOpen(true)}><CiChat2 /></span>
                </div>
            </div>
            <ChatToolModal open={isOpen} onClose={() => setIsOpen(false)}>

    </ChatToolModal>
        </div>
       
    </div>
    </>
    )
}

export default Header
