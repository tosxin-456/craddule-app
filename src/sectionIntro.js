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
import API_BASE_WEB_URL from './config/apiConfigW';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

Quill.register("modules/imageResize", ImageResize);



function SectionIntro ({ htmlContent })  {
    
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
  const [combinedAnswer, setCombinedAnswer] = useState('');

  const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

  const questionType ="BusinessCaseBuilder";
  const questionSubType ="Introduction";
  const token = localStorage.getItem('access_token');
  const [value, setValue] = useState('');
  const [formData, setFormData] = useState({
    summary: '',
    });
    
    useEffect(() => {
       
      fetchAnswerCut(); // Call the function to fetch the unanswered question
    }, [questionType, questionSubType, projectId]);
  
    useEffect(() => {
      const fetchTypes = async () => {
          try {
              const response = await axios.get(`${API_BASE_URL}/api/hub/types`);
              setImages(response.data);
              setLoading(false);
          } catch (error) {
              console.error('Error fetching types:', error);
              setError('Failed to fetch types');
              setLoading(false);
          }
      };
 
      fetchTypes();
  }, []);

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

  // const handleEditorChange = () => {
  //   // Get the current content of the editor
  //   const content = editorRef.current.innerHTML;

  //   const event = { target: { id: 'editor', value: content } };
  // // Call the handleChange function with the content
  //   handleChange(event);
   
  // };


  const handleEditorChange = () => {
    // Get the current selection range
   
    const content = editorRef.current.innerHTML;
    const event = { target: { id: 'editor', value: content } };
  
    // Call the handleChange function to update the state with the new content
    handleChange(event);
  
   
  };

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
  



  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
  ['link', 'image'],
  [{size: []}],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']         
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
      // handlers: {
      //   'image': () => {
      //     setShowImagePopup(true);
      //   }
      // }
    },
    
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar'] // Configure the image resize module
    }
  };
  const module =  {
  
      toolbar: toolbarOptions
  };

  const reactQuillRef = React.useRef(null);
  const accessToolbar = () => {
    // Check if ref is initialized
    if (reactQuillRef.current) {
      // Get the Quill editor instance
      const quill = reactQuillRef.current.getEditor();
      
      // Access the toolbar
      const toolbar = quill.getModule('toolbar').handlers.image;
      toolbar.addHandler('image', console.log("image toolbar"));
      //console.log(toolbar.handlers.image);

    } else {
      console.error('ReactQuill ref is not initialized');
    }
  };

  const fetchAnswerCut = async () => {
        
    try {
      const response = await fetch(`${API_BASE_URL}/api/answer/${projectId}/${questionType}/${questionSubType}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
        }
      });
  
      if (response.status === 200) {
        const data = await response.json();
        console.log(data)
        setAnswersV(data.data); // Adjust based on your API response structure
       
      }else{
        const result = await response.json();
        console.error('Error:', result['error']);
      }
  
      
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

 
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const editorRef = useRef(null);

  const handleImageSelect = (imageUrl) => {
    const quill = reactQuillRef.current.getEditor();
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', imageUrl);
    setShowImagePopup(false);
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const createMarkup = (html) => {
    return { __html: html };
  };
  const insertLink = () => {
    const url = prompt('Enter the link URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertImage = () => {
    const imageUrl = prompt('Enter the image URL:');
    if (imageUrl) {
      formatText('insertImage', imageUrl);
    }
  };
  const handleInput = () => {
    setCombinedAnswer(editorRef.current.innerHTML);
  };
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== combinedAnswer) {
      editor.innerHTML = combinedAnswer;
    }
  }, [combinedAnswer]);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      // Move the cursor to the end of the content
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editor);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  const handleHeadingChange = (event) => {
    const heading = event.target.value;
    if (heading) {
      formatText('formatBlock', heading);
    }
  };

  const handleImagePopup = () => {
    setShowImagePopup(!showImagePopup);
  };

  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);

  const toggleHeadingDropdown = () => setShowHeadingDropdown(!showHeadingDropdown);
//   createOrUpdateSummary();
  
const handleInsertFile = (file) => {
  const newFile = API_BASE_URL+'/images/'+file;
  console.log(newFile);
  setCombinedAnswer((prevContent) => `${prevContent}<div contenteditable="true" style="display:inline-block; width:30%;"><img src="${newFile}" style="width:100%;" /></div>`);
  // setCombinedAnswer((prevContent) => `${prevContent}<img src="${newFile}" alt="Inserted File" />`);

};

  useEffect(() => {
      const fetchSubtypeFiles = async () => {
          try {
              const response = await axios.get(`${API_BASE_URL}/api/hub/project/${projectId}`);
              setTypes(response.data.data);
              console.log(response.data);
             
          } catch (error) {
              console.error('Error fetching files:', error);
             
             
          }
      };
  
      fetchSubtypeFiles();
  }, []);


  const [resizingImage, setResizingImage] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [initialX, setInitialX] = useState(null);
  const [initialY, setInitialY] = useState(null);

  function handleImageResizing(event) {
    if (event.type === 'mousemove' && !isResizing) {
      return; // Ignore mousemove event if not resizing
    }
  
    const imageElement = event.target;
    if (imageElement.nodeName !== 'IMG') {
      return; // Ignore if the target is not an image element
    }
  
    if (event.type === 'mousedown') {
      startImageResize(event);
    } else if (event.type === 'mousemove') {
      if (isResizing) {
        resizeImage(event, imageElement);
      }
    } else if (event.type === 'mouseup') {
      stopImageResize();
    }
  }

  function startImageResize(event) {
    setIsResizing(true);
    setInitialX(event.clientX);
    setInitialY(event.clientY);
  }

  function resizeImage(event, imageElement) {
    const newWidth = imageElement.offsetWidth + (event.clientX - initialX);
    const newHeight = imageElement.offsetHeight + (event.clientY - initialY);
    imageElement.style.width = `${newWidth}px`;
    imageElement.style.height = `${newHeight}px`;
  }

  function stopImageResize() {
    setIsResizing(false);
    setInitialX(null);
    setInitialY(null);
  }

  function handleMouseMove(event) {
    if (!resizingImage) return;
  
    const { element, initialX, initialY, initialWidth, initialHeight } = resizingImage;
    const deltaX = event.clientX - initialX;
    const deltaY = event.clientY - initialY;
  
    const newWidth = initialWidth + deltaX;
    const newHeight = initialHeight + deltaY;
  
    element.style.width = newWidth + 'px';
    element.style.height = newHeight + 'px';
  }
  function handleMouseUp() {
    if (!resizingImage) return;

    // Reset resizing state
    setResizingImage(null);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

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
                <p className='centerH' onClick={accessToolbar}>Introduction</p>
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
            {answersV.map((answerV, index) => (
            <Link to={`/question/${answerV.questionId}`}>
                <div key={answerV._id} className="qul">
                <Tooltip content={answerV.answer}>
                
              
                    <p
                        className={`qulp ${hoveredIndex === index ? 'full' : ''}`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {hoveredIndex === index ? answerV.question : answerV.question.slice(0, 10) + '...'}
                    </p>
                    </Tooltip>
                    
                </div>
                 </Link>
            ))}
           
            <div className='container-textBs'>

            {/* <ReactQuill ref={reactQuillRef} theme="snow" value={combinedAnswer} onChange={setCombinedAnswer} modules={modules} formats={formats}/> */}
            
                {/* <textarea className='textBs' value={combinedAnswer} onChange={handleChange} id="summary"></textarea> */}


  <div class="toolbar">
  <button onClick={() => formatText('bold')} type='button'>
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button onClick={() => formatText('italic')} type='button'>
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button onClick={() => formatText('underline')} type='button'>
          <FontAwesomeIcon icon={faUnderline} />
        </button>
        <button onClick={() => formatText('strikeThrough')} type='button'>
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
        <button onClick={() => formatText('formatBlock', 'blockquote')} type='button'>
          <FontAwesomeIcon icon={faQuoteRight} />
        </button>
        <button onClick={() => formatText('formatBlock', 'pre')} type='button'>
          <FontAwesomeIcon icon={faCode} />
        </button>
        <button onClick={insertLink} type='button'>
          <FontAwesomeIcon icon={faLink} />
        </button>
        <button onClick={handleImagePopup} type='button'>
          <FontAwesomeIcon icon={faImage} />
        </button>
        <select onChange={(e) => formatText('fontSize', e.target.value)}>
          <option value="">Font Size</option>
          {[...Array(23)].map((_, i) => (
            <option key={i} value={i + 2}>{i + 2}</option>
          ))}
        </select>
        <div className="dropdownM">
          <button className="dropdown-toggle" onClick={toggleHeadingDropdown} type='button'>
            <FontAwesomeIcon icon={faHeading} /> <FontAwesomeIcon icon={faChevronDown} />
          </button>

        
            <select onChange={handleHeadingChange} className="headingDropdown">
                <option value="">Heading</option>
                {[...Array(6)].map((_, i) => (
                  <option key={i} value={`h${i + 1}`}>H{i + 1}</option>
                ))}
          </select>
     
        </div>
        <button onClick={() => formatText('insertOrderedList')} type='button'>
          <FontAwesomeIcon icon={faListOl} />
        </button>
        <button onClick={() => formatText('insertUnorderedList')} type='button'>
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button onClick={() => formatText('subscript')} type='button'>
          <FontAwesomeIcon icon={faSubscript} />
        </button>
        <button onClick={() => formatText('superscript')} type='button'>
          <FontAwesomeIcon icon={faSuperscript} />
        </button>
        <button onClick={() => formatText('outdent')} type='button'>
          <FontAwesomeIcon icon={faOutdent} />
        </button>
        <button onClick={() => formatText('indent')} type='button'>
          <FontAwesomeIcon icon={faIndent} />
        </button>
        <button onClick={() => formatText('direction', 'rtl')} type='button'>
          <FontAwesomeIcon icon={faAlignRight} />
        </button>
      
  </div>
  <div
      ref={editorRef}
      contentEditable={true}
      className="editor"
      onInput={handleInput}// Use onInput event instead of onChange for contenteditable elements
    //  onMouseDown={handleImageResizing}
    // onMouseMove={handleImageResizing}
    // onMouseUp={handleImageResizing}
    ></div>


                {showImagePopup && 
                  <ImagePopup 
                    
                    
                    onClose={() => setShowImagePopup(false)} 
                    types={types}
                    onInsertFile={handleInsertFile}
                  />
                }
            
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
