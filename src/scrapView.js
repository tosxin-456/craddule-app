import React, { useState,useEffect,useRef } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch,faChevronDown,faBold, faItalic, faUnderline, faStrikethrough, faQuoteRight, faCode, faLink, faImage, faTextHeight, faListOl, faListUl, faSubscript, faSuperscript, faOutdent, faIndent, faAlignRight, faHeading } from '@fortawesome/free-solid-svg-icons';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { jwtDecode } from "jwt-decode";
import ImageResize from 'quill-image-resize-vue';
import Tooltip from './component/tooltip';
import ImagePopup from './component/cradduleModal';
import axios from 'axios';
import nspell from 'nspell';
import API_BASE_WEB_URL from './config/apiConfigW';



function ScrapView ({ htmlContent })  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/video`);
     const [images, setImages] = useState([]);
     const [types, setTypes] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
     const [answers, setAnswers] = useState([]);
     const [answersV, setAnswersV] = useState([]);
     const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const projectId = localStorage.getItem('nProject');
  const [scrap, setScrap] = useState('');

   const access_token = localStorage.getItem('access_token');
  console.log(access_token);
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;
    console.log(userId);

  const questionType ="BusinessCaseBuilder";
  const questionSubType ="Introduction";
  const [value, setValue] = useState('');
  const [misspelledWords, setMisspelledWords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionBoxPosition, setSuggestionBoxPosition] = useState({ top: 0, left: 0 });
  const [selectedWord, setSelectedWord] = useState(null); 
  const [scraps, setScraps] = useState([]);

  const handleDelete = (id) => {
  
    console.log(id);
  };

  useEffect(() => {
    const fetchScrap = async () => {
      try {
        const scrapResponse = await fetch(API_BASE_URL + `/api/scrap/project/${projectId}`, {
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${access_token}` // Include the token in the request headers
            }
          });
        
      if(scrapResponse.status === 200) {
        // If summary exists, fetch the summary data
        const dataS = await scrapResponse.json();
        console.log(dataS);
        console.log("scrap "+dataS.data.scrap);
        setScraps(dataS.data);
       
     } else {
        
        const data = await scrapResponse.json();
        console.log(data);
        setLoading(false);
    }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchScrap();
  }, [projectId]);


  const onClickHandler27 = () => navigate(`/createScrapName`);


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
                <p className='centerHp'>Scrapbook</p>
                </div>
                {/* <link to={`/scrapCreateName`} > */}
                  <span className='addy' onClick={onClickHandler27}>+</span>
                {/* </link> */}
                <hr style={{marginBottom:0}}></hr>
                {scraps.map((scrap) => (
                   <Link to={`/createScrap/${scrap._id}`} className='dd'>
                    <div className='scarv'>
                      <div className='row'>
                          <div className='col-md-10'>
                            <p style={{marginBottom:0}}>{scrap.scrapName}</p>
                          </div>

                          {/* <div className='col-md-2'>
                            <span className='addy' onClick={() => handleDelete(scrap._id)}>-</span>
                          </div> */}
                      </div>
                     
                    </div>
                    
                  </Link>
                ))}
        
            <div class = "break"></div>
           
           
            
           
           
        </div> 

        
        
  </div>
  </div>
  <Toaster  position="top-right" />
  </div>
  </>
    );
}

export default ScrapView
