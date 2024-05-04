import React, { useState,useEffect } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

function SectionIntro ()  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/video`);

     const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const projectId = localStorage.getItem('nProject');
  const [combinedAnswer, setCombinedAnswer] = useState('');

  const questionType ="BusinessCaseBuilder";
  const questionSubType ="Introduction";
  const token = localStorage.getItem('access_token');

  const [formData, setFormData] = useState({
    summary: '',
    });
    
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const summaryResponse = await fetch(API_BASE_URL + `/api/summary/${projectId}/${questionType}/${questionSubType}`, {
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
          });
        
      if(summaryResponse.ok) {
        // If summary exists, fetch the summary data
        const dataS = await summaryResponse.json();
        console.log(dataS);
        console.log(dataS.data.summary);
        setCombinedAnswer(dataS.data.summary);
     } else {
        const response = await fetch(API_BASE_URL + `/api/new/question/BusinessCaseBuilder/Introduction/${projectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch answers');
        }
        const data = await response.json();
        console.log(data);
        setAnswers(data.data);
        setLoading(false);
    }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [questionType, questionSubType, projectId]);

  useEffect(() => {
    // Combine all answers into one string
    const combined = answers.map(answer => answer.answer).join('\n \n');
    setCombinedAnswer(combined);
  }, [answers]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCombinedAnswer(value);
}
  const handleSubmit = (e) => {
    e.preventDefault();
    createOrUpdateSummary();
    
  };

  const createOrUpdateSummary = async (data) => {
    try {
        setLoading(true);
        console.log(combinedAnswer);
        const summary = combinedAnswer;
      const response = await fetch(API_BASE_URL +'/api/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ projectId, questionType, questionSubType, summary }),
      });
  
      if (!response.ok) {
        setLoading(false);
        toast.error("can't save");
        ///throw new Error('Failed to create or update summary');
      }

      const data = await response.json();
      setLoading(false);
      toast.success("Saved");
      console.log(data.message); // Log success message
  
     
    } catch (error) {
      console.error('Error creating or updating summary:', error.message);
      // Handle error
    }
  };
  
  
//   createOrUpdateSummary();
  
    return (
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
            <img src={bci} className='bcA'></img>
        <div className='lenght'>
                    <div className='text-center'>
                <p className='centerH'>Introduction</p>
                <p className='centerHp'>Make sure you answer all questions</p>
                </div>
                <form onSubmit={handleSubmit}>    
            <button className="btn btn-primary buttonE" type='submit'>
                { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Save</span>}
            </button>
            {/* <button className="btn btn-primary buttonS">Edit</button> */}
            {/*<p className= "buttonE">Save</p>
            <p className= "buttonS">Edit</p>*/}
            <div class = "break"></div>
            

           
            <div className='container-textBs'>
            
                <textarea className='textBs' value={combinedAnswer} onChange={handleChange} id="summary"></textarea>
            
            </div>

                
            </form>
            
           
           
        </div> 

        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
        
  </div>
  </div>
  <Toaster  position="top-right" />
  </div>
  </>
    );
}

export default SectionIntro
