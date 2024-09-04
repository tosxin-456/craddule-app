import React, { useState,useEffect }from  "react";
import ReactDOM from "react-dom";
import { jwtDecode } from "jwt-decode";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function ModalQuestion({ open, onClose}){

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

    const projectId = localStorage.getItem('nProject');
    const [errorMessage, setErrorMessage] = useState('');  
    const category ="NONE";
    const subCategoryPassed ="NONE";
    const [question, setQuestion] = useState('');
   

      const fetchUnansweredQuestion = async () => {
        try {
          
          const response = await fetch(API_BASE_URL+`/api/new/question/${userId}/${projectId}/${category}/${subCategoryPassed}`);
          if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            if (!data.data) {
               //navigate to loading
               navigate(`/accelerate`);
               //navigate(`/loading`);
            } else {
              console.log(data.data.questionOrder);
              setQuestion(data.data);
            }
            // setQuestion(data.data); // Set the fetched question to state
          } else {
            const errorMessage = `Error fetching question: ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error('An error occurred:', error.message);
        }
      };

      useEffect(() => {
     

      fetchUnansweredQuestion();
    }, []);

    const [formData, setFormData] = useState({
        answer: '',
        });

        const handleChange = (e) => {
            setFormData({
              ...formData,
              [e.target.id]: e.target.value,
            });
          };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        createAnswer(formData);
      };

    const createAnswer = async (data) => {
        setLoading(true);
        
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

            fetchUnansweredQuestion();
            setLoading(false);
            setFormData({
                     answer: '',
                  });
          } else {
            const result = await response.json();
            setLoading(false);
           
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
            <div className="modalSt">
            { errorMessage &&  <p className="createER">Answeris empty</p>}
               
            <form onSubmit={handleSubmit}>
            <div className="input-containerC">
                {/* <label htmlFor="projectName" className="creT">Create Project</label> */}
                <input
                    type="text"
                    id="answer"
                    className="bottom-border-input"
                    placeholder={question.question}
                    value={formData.answer} onChange={handleChange}
                    // value={formData.projectName}
                    // onChange={handleChange}
                />
                </div>
                <button type="submit" className="createBT" disabled={loading}>
                { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin colw'/>}
                { !loading &&  <span className='iconSB'><span className="iconh"><HiOutlineArrowSmallRight /></span></span>}
                   
                </button>
                
                </form>
               
            </div>
        </>,
        document.getElementById('portal')
    )

}