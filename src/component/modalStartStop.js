import React, { useState }from  "react";
import ReactDOM from "react-dom";
import { jwtDecode } from "jwt-decode";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import {API_BASE_URL} from '../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function ModalStart({ open, onClose}){

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');  
  const [formData, setFormData] = useState({
    projectName: '',
  });
  const [formQData, setFormQData] = useState({
    answer: '',
  });
  const category ="NONE";
  const subCategoryPassed ="NONE";
  const [question, setQuestion] = useState('');
  const [showProjectModal, setShowProjectModal] = useState(true)
  const [showQuestionsModal, setShowQuestionsModal] = useState(false)

  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;

  // console.log(userId);

  
  const fetchUnansweredQuestion = async (projectId) => {
    setErrorMessage('');
    try {
      const response = await fetch(API_BASE_URL+`/api/new/question/${userId}/${projectId}/${category}/${subCategoryPassed}`);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        if (!data.data) {
            navigate(`/accelerate`);
        } else {
          console.log(data.data.questionOrder);
          setQuestion(data.data);
          setShowProjectModal(false)
          setFormQData({
            answer: '',
          });
          setShowQuestionsModal(true)
        }
      } else {
        const errorMessage = `Error fetching question: ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    } finally{
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleQChange = (e) => {
    setFormQData({
      ...formQData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject(formData);
  };

  const handleQSubmit = (e) => {
    e.preventDefault();
    createAnswer(formQData);
  };

  const handleProceed = async () => {
    onClose();
    console.log('closing');
  }
    
  const createProject = async (data) => {
    setLoading(true);
    try {
    // Include user ID in the data object
    data.userId = userId;  
    console.log(data);
    console.log(JSON.stringify(data));
      const response = await fetch(API_BASE_URL+'/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      });

      // const data = response.json();

      if (response.status === 200) {
        console.log(response.status);
        console.log(response);

        
        const responseData = await response.json();
        // setLoading(false);
        const projectId = responseData.data._id;
        localStorage.setItem("nProject",projectId);
        // navigate(`/firstQuestion`);
        console.log(responseData); // Parse JSON response
        console.log('Project created successfully');
        fetchUnansweredQuestion(projectId)
      } else {

        const result = await response.json();
        setLoading(false);
        setErrorMessage(result['error']);
        setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        
          console.error('Error:', result['error']);
      }
    } catch (error) {
        setLoading(false);
        setErrorMessage(error);
        setTimeout(() => {
            setErrorMessage('');
          }, 5000);
      console.error('An error occurred:', error);
    }
  };

  const createAnswer = async (data) => {
    setLoading(true);
    const projectId = localStorage.getItem('nProject'); 
    try {
      data.userId = userId;  
      data.questionId = question._id; 
      data.projectId = projectId; 
      data.questionType = category; 
      data.questionSubType = subCategoryPassed; 

      console.log(data);
      
      const response = await fetch(API_BASE_URL+'/api/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({data}),
      });

      if (response.status === 200) {
        // If submission is successful, fetch another question
        const responseData = await response.json();
        console.log(responseData);

        fetchUnansweredQuestion(projectId);
      } else {
        const result = await response.json();
        setLoading(false);
        setErrorMessage(result['error']);
        console.error('Error:', result['error']);
      }
    } catch (error) {
      //toast.error(result['error']);  
      setLoading(false);
      console.error('An error occurred:', error);
    }
  };

  if(!open) return null
  return ReactDOM.createPortal(
    <>
      <div className="modalOv"></div>
      {showProjectModal && 
        <div className="modalSt ">
        <div className="relative flex justify-end mb-3">
          <span onClick={handleProceed} className="block w-fit p-2 px-3 rounded-md border border-blue50 text-gray900 cursor-pointer">X</span>
        </div>
        <h4 className="text-center text-black400 mb-[30px]">New project name</h4>
        { errorMessage &&  <p className="createER">Project name is empty</p>}
          
        <form onSubmit={handleSubmit} className="px-[40px]">
        <div className="">
          {/* <label htmlFor="projectName" className="creT">Create Project</label> */}
          <input
              type="text"
              id="projectName"
              className="w-full p18 py-[20px] ps-[40px] rounded-[15px] bg-blue-50"
              placeholder="Project Name"
              value={formData.projectName}
              onChange={handleChange}

          />
          </div>
          <button type="submit" className="w-full bg-blue600 text-white rounded-[30px] mt-[40px] py-[14px]" disabled={loading}>
          { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
          { !loading &&  <h4 className=''>Continue</h4>}
              
          </button>
          
          </form>
          
      </div>}
      {showQuestionsModal && 
      <div className="modalSt">
        {/* <h4 className="text-center text-black400 mb-[30px]">New project name</h4> */}
        { errorMessage &&  <p className="createER">Answer is empty</p>}
            
        <form onSubmit={handleQSubmit}>
          <div className="">
            <input
              type="text"
              id="answer"
              className="w-full p18 py-[20px] ps-[40px] rounded-[15px] bg-blue-50"
              placeholder={question.question}
              value={formQData.answer} onChange={handleQChange}
            />
          </div>
          <button type="submit" className="w-full bg-blue600 text-white rounded-[30px] mt-[40px] py-[14px]" disabled={loading}>
            { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
            { !loading &&  <h4 className=''>Continue</h4>}
          </button>
        </form>
      </div>}
    </>,
    document.getElementById('portal')
  )
}