import React, { useEffect, useState } from 'react';
import bci from './images/bc.png'; 
import bro from './images/bro.png'; 
import Header from './component/header';
import Menu from './component/menu';
import SideMenu2 from './component/sideMenu2';
import SideMenu2P from './component/sideMenu2P';
import SideMenu2I from './component/sideMenu2I';
import SideMenu2C from './component/sideMenu2C';
import SideMenu2V from './component/sideMenu2V';
import API_BASE_URL from './config/apiConfig';
import { useNavigate,useParams } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import ModalVideo from './component/modalVideo';
import ideationPop from './component/ideationModal';
import ModalVideoN from './component/modalNewVideo';
import ReactGA from "react-ga4";

function QuestionBus() {
  
  ReactGA.initialize("G-P450CRB987");
  ReactGA.send({ 
   hitType: "pageview", 
   page: window.location.pathname, 
   title: "Questions" 
 });

    const navigate = useNavigate()
    
    const onClickHandler = () => navigate(``)
    const { phase,category,subCategory } = useParams();
    const [question, setQuestion] = useState(null);
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

    const [activeVideo, setActiveVideo] = useState("");
    const [activeLink, setActiveLink] = useState("");
    const [activeId, setActiveId] = useState("");
    const [activeTime, setActiveTime] = useState("");
    const [isOpen, setIsOpen]= useState(false);

    const projectId = localStorage.getItem('nProject');
    const [loading, setLoading] = useState(false);
    console.log(userId);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [name, setName] = useState('');
    const [mainCategory, setMainCategory] = useState('');

    const [showScrollableDiv, setShowScrollableDiv] = useState(false);
    const [subCategoryName, setSubCategoryName] = useState(null);
    const [answered, setAnswered] = useState([]);

    const projectCount = localStorage.getItem('nProjectCount');

  const [showPopup, setShowPopup] = useState(true);
  const [showYou, setShowYou] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

    const handleToggle = () => {
      setShowScrollableDiv(!showScrollableDiv);
    };
 
      // useEffect(() => {
      //   const fetchNextQuestion = async () => {
      //     try {
      //       const response = await fetch(`${API_BASE_URL}/api/finished/${projectId}/${category}/${subCategory}`, {
      //         method: 'GET',
      //         headers: {
      //           'Content-Type': 'application/json',
      //           'Authorization': `Bearer ${access_token}`,
      //         },
      //       });
            
      //       if (response.ok) {
      //         const data = await response.json();
      //         console.log(data);
      //         // subType.replace(/([A-Z])/g, ' $1').trim();
      //         setSubCategoryName(data.subCategoryName);
      //         fetchUnansweredQuestion(data.subCategory);
      //         getPrevious(data.subCategory);
      //       } else {
      //         console.error('Failed to fetch next question');
      //       }
      //     } catch (error) {
      //       console.error('Error fetching next question:', error);
      //     }
      //   };
    
      //   fetchNextQuestion();
      // }, [projectId, category]);
     
    useEffect(() => {
      setSubCategoryName(subCategory.replace(/([A-Z])/g, ' $1').trim());
      fetchUnansweredQuestion(subCategory);
      getPrevious(subCategory);
    }, []);

      const fetchUnansweredQuestion = async (subCategoryPassed) => {
        try {
          console.log(subCategoryPassed);
          const response = await fetch(API_BASE_URL+`/api/new/question/${userId}/${projectId}/${category}/${subCategoryPassed}`);
          if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            if (!data.data) {
                createFinish(subCategoryPassed);
                
            } else {
              console.log(data.data.premium);
              console.log(data.data.questionOrder);
              setQuestion(data.data);
              if(data.data.questionOrder ==  3){
                fetchRandomVideo();
              }
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
         data.questionSubType = subCategory; 

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

            fetchUnansweredQuestion(subCategory);
            setLoading(false);
            setFormData({
                     answer: '',
                  });
                  getPrevious(subCategory)
          } else {
            const result = await response.json();
            setLoading(false);
            toast.error(result['error']);
            console.error('Error:', result['error']);
          }
        } catch (error) {
            //toast.error(result['error']);  
            setLoading(false);
            console.error('An error occurred:', error);
        }
      };
      //submit answer

      

        const getPrevious = async (questionSubType) => {
          try {
            const scrapResponse = await fetch(API_BASE_URL + `/api/answer/answered/${category}/${questionSubType}/${projectId}`, {
                headers: {
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${access_token}` // Include the token in the request headers
                }
              });
            
          if(scrapResponse.status === 200) {
            // If summary exists, fetch the summary data
            const dataS = await scrapResponse.json();
            console.log("fire");
            console.log(dataS);
            setAnswered(dataS.data);
           
         } else {
            console.log("fireNo");
            const data = await scrapResponse.json();
            console.log(data);
            setLoading(false);
        }
          } catch (error) {
           
            setLoading(false);
          }
        };
      
        const handleClick = (id) => {
          // Handle click event and set the selected answer
          //history.push(`/questionEdit/${phase}/${id}`);
          navigate('/questionEdit/'+phase+'/'+id);
        };
        

        const createFinish = async (subCategoryPassed) => {
          setLoading(true);
          
          try {
          
  
            
            const response = await fetch(API_BASE_URL+'/api/finished', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
              },
              body: JSON.stringify({questionType:category, questionSubType:subCategoryPassed,projectId,userId}),
            });
      
            if (response.status === 200) {
              // If submission is successful, fetch another question
              const responseData = await response.json();
              console.log(responseData);
  
              
              setLoading(false);
              setFormData({
                       answer: '',
                    });
              navigate(`/questionBusMainSum/${phase}/${category}/${subCategoryPassed}`);
            } else {
              const result = await response.json();
              setLoading(false);
              toast.error(result['error']);
              console.error('Error:', result['error']);
            }
          } catch (error) {
              //toast.error(result['error']);  
              setLoading(false);
              console.error('An error occurred:', error);
          }
        };

        useEffect(() => {
          const fetchVideo = async () => {
            try {
              
              const response = await fetch(`${API_BASE_URL}/api/ourVideo/video/${phase}/beginning/${userId}/${projectId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${access_token}`,
                },
        
              });
              if (response.status === 200) {
                const data = await response.json();
                
                if (data.status == 'still watching') {
                  console.log(data);
                  console.log(data.video._id);
                  const newLink = data.video.videolink.replace('https://youtu.be/', '');
                  setActiveLink(newLink); // Assuming the video link is in the videolink field
                  setActiveId(data.video._id); 
                  setActiveTime(data.video.watchTime)// Assuming the video link is in the videolink field
                  setShowYou(true); // Open the modal if a video is found
                } else {
                  console.error('Video already watched or not found');
                }
              } else {
                console.error('Failed to fetch video. Status code: '+phase, response.status);
              }
            } catch (error) {
              console.error('Failed to fetch video:', error);
            }
          };
        
          fetchVideo();
        }, [phase]);

        //Check if user as started Section
        // useEffect(() => {
        //   const checker = async () => {
       
            
        //     try {
            
        //       const section = category        
        //       const response = await fetch(API_BASE_URL+'/api/checker', {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'Authorization': `Bearer ${access_token}`,
        //         },
        //         body: JSON.stringify({projectId, userId, section}),
        //       });
        
        //       if (response.status === 200) {
        //         // If submission is successful, fetch another question
        //         const responseData = await response.json();
        //         console.log(responseData);
        //         console.log(responseData.check);
        //         const check = responseData.check;
        //        if(responseData.check === 1){
        //           console.log("active do nothing");
        //           checkActiveIfEntered();
        //        }else{
                
        //           console.log("not active do shit");
        //           if(projectCount == 2){
        //             if(phase == 'Ideation'){
        //               const vid = 'https://youtu.be/__x1zapKHmc';
        //               const link = vid.replace('https://youtu.be/', '');
        //               setActiveLink(link); 
        //             }
  
        //             if(phase == 'ProductDefinition'){
        //               const vid = 'https://youtu.be/AY7efwPzoL0';
        //               const link = vid.replace('https://youtu.be/', '');
        //               setActiveLink(link); 
        //             }
  
        //             if(phase == 'InitialDesign'){
        //               const vid = 'https://youtu.be/v0KFI1yK0rA';
        //               const link = vid.replace('https://youtu.be/', '');
        //               setActiveLink(link); 
        //             }
        //           }else{
        //             fetchRandomVideo();
        //           }
                  
                  
        //           //
        //        }
    
    
    
        //       } else {
        //         const result = await response.json();
                
        //         toast.error(result['error']);
        //         console.error('Error:', result['error']);
        //       }
        //     } catch (error) {
        //         //toast.error(result['error']);  
                
        //         console.error('An error occurred:', error);
        //     }
        //   };
        //   checker();
        // }, []);

        const fetchRandomVideo = async () => {
          try {
            console.log('random');
            const videoSubType  = category;
            const response = await fetch(`${API_BASE_URL}/api/video/count/${userId}/${projectId}/${videoSubType}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
              },
            });
            console.log(response);
           
            if (response.status == 200) {
              const video = await response.json();
              console.log("vide show");
              console.log(video.video.videoLink);
              console.log(video._id);
              setActiveVideo(video.video); 
              const link = video.video.videoLink.replace('https://youtu.be/', '');
              setActiveLink(link); 
             
              setIsOpen(true);
              videoActive(video.video);
            } else {
              console.error('Error fetching video:', response.statusText);
            }
          } catch (error) {
            console.error('An error occurred while fetching the random video:', error.message);
          }
        };

        //set that user as been here before
        const videoActive = async (data) => {
          try {
            console.log("setting active");
            const videoId = data._id;
            console.log(videoId);
            const videoSubType  = category;
            const response = await fetch(`${API_BASE_URL}/api/video/active`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
              },
              body: JSON.stringify({ userId, projectId, videoId, videoSubType }),
            });
            console.log(response);
           
            if (response.status == 200) {
              const video = await response.json();
              console.log("vide show");
              console.log(video);
              console.log(video.video._id);
              setActiveId(video.video._id); 
             
            } else {
              console.error('Error fetching video:', response.statusText);
            }
          } catch (error) {
            console.error('An error occurred while fetching the random video:', error.message);
          }
        };
    
       
        //check if there is an active video not finished if the user as been here before
        const checkActiveIfEntered = async () => {
          try {
            console.log("in active when enetered");
            const videoSubType  = category;
            const response = await fetch(`${API_BASE_URL}/api/video/active/check`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
              },
              body: JSON.stringify({ userId, projectId, videoSubType }),
            });
            console.log(response);
           
            if (response.status == 200) {
              const video = await response.json();
             
              console.log(video);
              console.log(video.active);
              if(video.active){
                console.log(video.video.videoId.videoLink);
                console.log('true');
                setActiveVideo(video.video.videoId); 
                const link = video.video.videoId.videoLink.replace('https://youtu.be/', '');
                setActiveLink(link); 
                setActiveId(video.video._id); 
                // setActiveLink(video.video.videoId.videoLink); 
                //setIsOpen(true);
                setIsOpen(true)
              }else{
                 //fetchRandomVideo();
                console.log('false');
               
              }
             
            } else {
              console.error('Error fetching video:', response.statusText);
            }
          } catch (error) {
            console.error('An error occurred while fetching the random video:', error.message);
          }
        };

      return (

       
       
      

    <div className='container2'>
          {phase === 'Ideation' && <SideMenu2 />}
          {phase === 'ProductDefinition' && <SideMenu2P />}   
          {phase === 'InitialDesign' && <SideMenu2I />}   
          {phase === 'Commercialization' && <SideMenu2C />} 
          {phase === 'ValidatingAndTesting' && <SideMenu2V />} 
         <div className="main-content">
        
         <Header />
         <div className={`main-content2 ${showScrollableDiv ? 'shrink' : ''}`}>

         <div className='text-center'>
                    <p className='textHp'>{subCategoryName}</p>
                    <p className='textH'>Make sure you answer all questions</p>
                </div>
            
            <div>
              <div className='row'>
                  <div className='col-md-6'>
                    <p className='prq' onClick={handleToggle}>Previous Questions</p>
                  </div>
              </div>
               
            </div>
            
            <div className='centerC'>
           
                
                {question ? (
                <form onSubmit={handleSubmit}>
                <div>
            
                <p className='question'>{question.question}</p>
                <div className='container-textAs'>
                    <textarea className='textAs' id="answer"  value={formData.answer} onChange={handleChange}></textarea>
                </div>
                <p className='suggest'>{question.premium}</p>
                <button type="submit" className='btn btn-primary curveNext' disabled={loading}>
                
                    { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                    { !loading && <span>Next</span>}
                
                </button>
            
                </div>
                
                </form>
                ) : (
                    <p></p>
                )}
            </div> 
           
         </div>

         <div className={`scrollable-div ${showScrollableDiv ? 'show' : ''}`}>
            <button className="close-button" onClick={handleToggle}>X</button>
            {(answered || []).map((answered, index) => (
              <div className='qulis' key={index} onClick={() => handleClick(answered._id)} style={{ cursor: 'pointer' }}>
                <p style={{ marginBottom: 7 }}>{answered.questionId.question}</p>
              </div>
            ))}
            
            <ModalVideo open={isOpen} onClose={() => setIsOpen(false)} videoId={activeVideo ? activeVideo : ''} link={activeLink} id={activeId}>

</ModalVideo>

<ModalVideoN open={showYou} onClose={() => setShowYou(false)}  link={activeLink} id ={activeId} time={activeTime}>

</ModalVideoN>
            {/* Add more content as needed */}

            <ideationPop open={showPopup} onClose={() => setShowPopup(false)} >

</ideationPop>

            
        </div>
    </div>
</div> 

      );
    }




  export default QuestionBus;
