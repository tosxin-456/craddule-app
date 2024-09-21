import React, { useState,useEffect,useRef } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import SideMenu2 from './component/sideMenu2';
import SideMenu2P from './component/sideMenu2P';
import SideMenu2I from './component/sideMenu2I';
import SideMenu2C from './component/sideMenu2C';
import SideMenu2V from './component/sideMenu2V';
import { useNavigate, Link,useParams } from 'react-router-dom';
import {API_BASE_URL} from './config/apiConfig';
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
import ModalQoute from './component/modalQoute';
function QuestionBusIntro() {

    const navigate = useNavigate()
    const { phase,category, subCategory } = useParams();
    const onClickHandler = () => navigate(`/quote`);
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
 const [answered, setAnswered] = useState([]);
 const [cat, setCat] = useState([]);
 const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);
   const userId = decodedToken.userId;

   const [activeId, setActiveId] = useState("");
   const [isOpen, setIsOpen]= useState(false);
   const [activeQuote, setActiveQuote] = useState("");

 const token = localStorage.getItem('access_token');
 const [value, setValue] = useState('');
 const [misspelledWords, setMisspelledWords] = useState([]);
 const [suggestions, setSuggestions] = useState([]);
 const [suggestionBoxPosition, setSuggestionBoxPosition] = useState({ top: 0, left: 0 });
 const [selectedWord, setSelectedWord] = useState(null); 

 const [showScrollableDiv, setShowScrollableDiv] = useState(false);
 const [showScrollableDiv2, setShowScrollableDiv2] = useState(false);

    const handleToggle = () => {
      setShowScrollableDiv(!showScrollableDiv);
    };

    const handleToggleSh = () => {
      setShowScrollableDiv2(!showScrollableDiv2);
    };

 const [formData, setFormData] = useState({
   summary: '',
   });
   
  //  useEffect(() => {
      
  //    fetchAnswerCut(); // Call the function to fetch the unanswered question
  //  }, [category, subCategory, projectId]);
 
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
  getPrevious(subCategory);
 }, []);

 useEffect(() => {
  getPreviousCategories(category);
 }, []);

 useEffect(() => {
  console.log("fetchAnswers");
   const fetchAnswers = async () => {
     try {
       const summaryResponse = await fetch(API_BASE_URL + `/api/summary/${projectId}/${category}/${subCategory}`, {
           headers: {
             'Content-Type': 'application/json', 
             'Authorization': `Bearer ${token}` // Include the token in the request headers
           }
         });
       
     if(summaryResponse.ok) {
      const dataS = await summaryResponse.json();
       // If summary exists, fetch the summary data
       if(dataS.data) {
            
            console.log(dataS);
            console.log(dataS.data.summary);
            setCombinedAnswer(dataS.data.summary);
        } else {
            const response = await fetch(API_BASE_URL + `/api/new/question/${category}/${subCategory}/${projectId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch answers');
            }
            const data = await response.json();
            console.log(data);
            console.log('answers getting because no summary');
            setAnswers(data.data);
            const combined = data.data.map(answer => answer.answer).join('<br><br>');
            console.log(combined);
            setCombinedAnswer(combined);
            setLoading(false);
            fetchPreviousSummary(combined);
          }
      } else {

            
      }
     } catch (error) {
       setError(error.message);
       setLoading(false);
     }
   };

   fetchAnswers();
 }, [category, subCategory, projectId]);


 //insert summary if it has not being created
   const fetchPreviousSummary = async (data) => {
     try {
       const summaryResponse = await fetch(API_BASE_URL + `/api/summary/${projectId}/${category}/${subCategory}`, {
           headers: {
             'Content-Type': 'application/json', 
             'Authorization': `Bearer ${token}` // Include the token in the request headers
           }
         });
       
     if(summaryResponse.ok) {
      const dataS = await summaryResponse.json();
       // If summary exists, fetch the summary data
       if(dataS.data) {
            console.log(dataS);
            console.log(dataS.data.summary);
           // setCombinedAnswer(dataS.data.summary);
        } else {
          createOrUpdateSummary3(data)
          }
      } else {

            
      }
     } catch (error) {
       setError(error.message);
       setLoading(false);
     }
   };


//  useEffect(() => {
//    // Combine all answers into one string
//    const combined = answers.map(answer => answer.answer).join('\n');
//    setCombinedAnswer(combined);
//  }, [answers]);

 // const handleEditorChange = () => {
 //   // Get the current content of the editor
 //   const content = editorRef.current.innerHTML;

 //   const event = { target: { id: 'editor', value: content } };
 // // Call the handleChange function with the content
 //   handleChange(event);
  
 // };
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

const getPreviousCategories = async () => {
  try {
    const scrapResponse = await fetch(API_BASE_URL + `/api/finished/cat/${projectId}/${category}/`, {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${access_token}` // Include the token in the request headers
        }
      });
    
  if(scrapResponse.status === 200) {
    // If summary exists, fetch the summary data
    const dataS = await scrapResponse.json();
    console.log("fireCat");
    console.log(dataS);
    setCat(dataS.data);
   
 } else {
    console.log("fireCat");
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
  navigate('/questionEdit/'+phase+'/'+id);
};

const handleClickSh = (id) => {
  // Handle click event and set the selected answer
  console.log(id)
 getPrevious(id);
 handleToggleSh();
 handleToggle();
};

 const handleEditorChange = () => {
   // Get the current selection range
  
    const content = editorRef.current.innerHTML;
    const event = { target: { id: 'editor', value: content } };
   // checkSpelling(event.target.innerText);
 
   // Call the handleChange function to update the state with the new content
  

   const newText = content || '';
   setCombinedAnswer(content);
   console.log(content);
   console.log("checking error");
   console.log(newText);
//    checkSpelling(newText);

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
       const questionType=category;
       const questionSubType=subCategory;
     const response = await fetch(API_BASE_URL +'/api/summary', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}` 
       },
       body: JSON.stringify({ projectId, questionType, questionSubType, summary,userId }),
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
 const createOrUpdateSummary3 = async (data) => {
  const summary = data;
  try {
      setLoading(true);
      console.log(combinedAnswer);
      
      const questionType=category;
      const questionSubType=subCategory;
    const response = await fetch(API_BASE_URL +'/api/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ projectId, questionType, questionSubType, summary,userId }),
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
 

useEffect(() => {
  const checker = async () => {

    
    try {
    
      const section = subCategory        
      const response = await fetch(API_BASE_URL+'/api/checker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({projectId, userId, section}),
      });


      console.log(projectId);
      if (response.status === 200) {
        // If submission is successful, fetch another question
        const responseData = await response.json();
        console.log(responseData);
        console.log(responseData.check);
        const check = responseData.check;
        console.log("about to check:", check)
       if(responseData.check === "1"){
          console.log("active do nothing");
          
       }else{
          console.log("not active do shit");
          fetchRandomQuote();
       }



      } else {
        const result = await response.json();
        
        toast.error(result['error']);
        console.error('Error:', result['error']);
      }
    } catch (error) {
        //toast.error(result['error']);  
        
        console.error('An error occurred:', error);
    }
  };
  checker();
}, []);


const fetchRandomQuote = async () => {
  try {
    console.log('random');
    const response = await fetch(`${API_BASE_URL}/api/quote/count/${userId}/${projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
    });
    console.log(response);
   
    if (response.status == 200) {
      const quote = await response.json();
      console.log("quote show");
      console.log(quote);
      console.log(quote.Quote.quote);
      console.log(quote.Quote.quote);
      setActiveQuote(quote.Quote.quote); 
      setActiveId(quote.Quote._id); 
      setIsOpen(true);
    } else {
      console.error('Error fetching quote:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred while fetching the random quote:', error.message);
  }
};


//check if there is an active quote not finished if the user as been here before
const checkActiveIfEntered = async () => {
  try {
    console.log("in active when enetered");
    const quoteSubType  = category;
    const response = await fetch(`${API_BASE_URL}/api/quote/active/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify({ userId, projectId, quoteSubType }),
    });
    console.log(response);
   
    if (response.status == 200) {
      const quote = await response.json();
     
      console.log(quote);
      console.log(quote.active);
      if(quote.active){
     
        console.log('true');
        setActiveId(quote.quote._id); 
       
        setIsOpen(true);
      }else{
         //fetchRandomQuote();
        console.log('false');
       
      }
     
    } else {
      console.error('Error fetching quote:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred while fetching the random quote:', error.message);
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
       console.log("here i am");
   try {
     const response = await fetch(`${API_BASE_URL}/api/answer/${projectId}/${category}/${subCategory}`, {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
       }
     });
 
     if (response.status === 200) {
       const data = await response.json();
       console.log(data)
       setAnswers(data.data); // Adjust based on your API response structure
      
     }else{
       const result = await response.json();
       console.error('Error:', result);
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
     console.log("in ref");
     console.log(combinedAnswer);
   }
 }, [combinedAnswer]);

 const loadDictionary = async () => {
   const affResponse = await fetch('/dictionaries/en.aff');
   const aff = await affResponse.text();
 
   const dicResponse = await fetch('/dictionaries/en.dic');
   const dic = await dicResponse.text();
   console.log(dic);
   return nspell({ aff, dic });
 };


 const escapeRegExp = (string) => {
   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
 };
 
 

 const highlightMisspelledWords = () => {
   //if (!editorRef.current) return;


   const selection = window.getSelection();
   const range = selection.getRangeAt(0);
   const startContainer = range.startContainer;
   const startOffset = range.startOffset;
 
   const startMarker = document.createElement("span");
   startMarker.id = "start-marker";
   range.insertNode(startMarker);
   
   console.log(misspelledWords);
   if (misspelledWords.length === 0) {
     console.log("no words")
     //editorRef.current.innerHTML = combinedAnswer;
     return;
   }
 
   let innerHTML = combinedAnswer;
   const words = innerHTML.split(/(\s+)/); // Split by spaces, keeping the spaces in the array
 
   //const words = innerHTML.split(/(\b|\s+)/);
   const tempContainer = document.createElement('div');
   tempContainer.innerHTML = combinedAnswer;
   const textNodes = getTextNodes(tempContainer);
 
 textNodes.forEach(node => {
   let nodeText = node.nodeValue;
   misspelledWords.forEach(word => {
     const escapedWord = escapeRegExp(word);
     const regex = new RegExp(`\\b${escapedWord}\\b`, 'g');
     nodeText = nodeText.replace(regex, `<span style="background-color: darkblue; color: white;">${word}</span>`);
   });
   const newNode = document.createElement('span');
   newNode.innerHTML = nodeText;
   node.replaceWith(...newNode.childNodes);
 });


 
 console.log(tempContainer.innerHTML);
 editorRef.current.innerHTML = tempContainer.innerHTML;
 restoreCursorPosition();

   // Highlight misspelled words
   // for (let i = 0; i < words.length; i++) {
   //   const word = words[i];
   //   if (misspelledWords.includes(word.trim())) {
   //     words[i] = `<span style="background-color: darkblue; color: white;">${word}</span>`;
   //   }
   // }

   // console.log(words);
   // setCombinedAnswer(words);
   //editorRef.current.innerHTML = words.join('');
 };

 const getTextNodes = (node) => {
   let textNodes = [];
   if (node.nodeType === Node.TEXT_NODE) {
     textNodes.push(node);
   } else {
     for (let child of node.childNodes) {
       textNodes = textNodes.concat(getTextNodes(child));
     }
   }
   return textNodes;
 };

 const restoreCursorPosition = () => {
   const startMarker = document.getElementById("start-marker");
   if (!startMarker) return;
 
   const range = document.createRange();
   const selection = window.getSelection();
 
   range.setStartBefore(startMarker);
   range.collapse(true);
   selection.removeAllRanges();
   selection.addRange(range);
 
   // Clean up marker
   startMarker.parentNode.removeChild(startMarker);
 };
 const checkSpelling = async (text) => {
   if (!text) return;
   console.log("now checking");
   const spell = await loadDictionary();
   const words = text.split(/\s+/);
   const misspelled = words.filter(word => !spell.correct(word));
   console.log(misspelled);
   setMisspelledWords(misspelled);
   console.log("what was passed");
   console.log(misspelledWords);
   highlightMisspelledWords();
   
 };

 const showSuggestions = async (word, rect) => {
   const spell = await loadDictionary();
   const suggestions = spell.suggest(word);
   console.log(word);
   console.log(spell);
   console.log(suggestions);
   setSuggestions(suggestions);
   setSuggestionBoxPosition({ top: rect.bottom, left: rect.left });
 };

 const handleWordClick = (word, rect) => {
   console.log("here sugg");
   console.log(word);
   setSelectedWord(word);
   showSuggestions(word, rect);
 };

 const applySuggestion = (suggestion) => {
   // const editor = editorRef.current;
   // const html = editor.innerHTML;
   // const newHtml = html.replace(new RegExp(`\\b${misspelledWords[0]}\\b`, 'g'), suggestion);
   // editor.innerHTML = newHtml;
   // setCombinedAnswer(newHtml);
   // setSuggestions([]);

   if (!selectedWord) return; // Check if a word is selected

   const editor = editorRef.current;
   const html = editor.innerHTML;

   // Create a regex to match only the selected word
   const escapedWord = selectedWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
   const newHtml = html.replace(new RegExp(`\\b${escapedWord}\\b`, 'g'), suggestion);

   editor.innerHTML = newHtml;
   setCombinedAnswer(newHtml);
   checkSpelling(newHtml);
   setSelectedWord(null); // Reset selected word
   
 };

 const handleSuggestionClick = (suggestion) => {
   if (!selectedWord) return; // Check if a word is selected

   const editor = editorRef.current;
   const html = editor.innerHTML;

   // Create a regex to match only the selected word
   const escapedWord = selectedWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
   const newHtml = html.replace(new RegExp(`\\b${escapedWord}\\b`, 'g'), suggestion);

   editor.innerHTML = newHtml;
   setCombinedAnswer(newHtml);
   checkSpelling(newHtml);
   setSelectedWord(null); // Reset selected word
 };

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
 const separateSubCategory = (subCategory) => {
  return subCategory.replace(/([A-Z])/g, ' $1').trim();
};
 const separatedSubCategory = separateSubCategory(subCategory);


 const onClickNext = () => navigate(`/questionBusMain/${phase}/${category}`);

 const handleMouseDown = (event) => {
   if (event.target.tagName === 'IMG') {
     setResizingImage(event.target);
     setInitialX(event.clientX);
     setInitialY(event.clientY);
     setIsResizing(true);
   }
 };

 const handleMouseMove = (event) => {
   if (isResizing && resizingImage) {
     const deltaX = event.clientX - initialX;
     const deltaY = event.clientY - initialY;
     const newWidth = resizingImage.clientWidth + deltaX;
     const newHeight = resizingImage.clientHeight + deltaY;
     resizingImage.style.width = `${newWidth}px`;
     resizingImage.style.height = `${newHeight}px`;
     setInitialX(event.clientX);
     setInitialY(event.clientY);
   }
 };

 const handleMouseUp = () => {
   if (isResizing) {
     setIsResizing(false);
     setResizingImage(null);
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
                    <p className='textHp'>{separatedSubCategory}</p>
                    <p className='textH'>Make sure you answer all questions</p>
                </div>
            
                <div className='row'>
                  <div className='col-md-6'>
                    <p className='prq' onClick={handleToggle}>Previous Questions</p>
                  </div>

                  {/* <div className='col-md-6'>
                    <p className='prq' onClick={handleToggleSh} style={{float:"right"}}>Previous Categories</p>
                  </div> */}
              </div>
            
            <div className='quiInt'>

            
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
        <select onChange={(e) => formatText('fontSize', e.target.value)} className="headingDropdown" style={{marginRight: 10}}>
          <option value="">Font Size</option>
          {[...Array(23)].map((_, i) => (
            <option key={i} value={i + 2}>{i + 2}</option>
          ))}
        </select>
        <div className="dropdownM">
         
        
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
      onInput={handleEditorChange}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              
              />
  

                {showImagePopup && 
                  <ImagePopup 
                    
                    
                    onClose={() => setShowImagePopup(false)} 
                    types={types}
                    onInsertFile={handleInsertFile}
                  />
                }
             {/* <button type="button" className='btn btn-primary curveNext' onClick={onClickNext} style={{marginTop:20}}> Next</button> */}
            </div>

                
            </form>
            </div>

            
         </div>

         <div className={`scrollable-div ${showScrollableDiv ? 'show' : ''}`}>
            <button className="close-button" onClick={handleToggle}>X</button>
            {(answered || []).map((answered, index) => (
              <div className='qulis' key={index} onClick={() => handleClick(answered._id)} style={{ cursor: 'pointer' }}>
                <p style={{ marginBottom: 7 }}>{answered.questionId.question}</p>
              </div>
            ))}
           
            {/* Add more content as needed */}
        </div>

        <div className={`scrollable-div ${showScrollableDiv2 ? 'show' : ''}`}>
            <button className="close-button" onClick={handleToggleSh}>X</button>
            

            {(cat || []).map((cat, index) => (
            <div className='qulis'   key={index} onClick={() => handleClickSh(cat.questionSubType)} style={{cursor:'pointer'}}>
                <p style={{marginBottom:7}}>{cat.questionSubType}</p>
            </div>
           ))}
           
            {/* Add more content as needed */}
        </div>

        <ModalQoute open={isOpen} onClose={() => setIsOpen(false)} quote={activeQuote ? activeQuote : ''}  quoteId={activeId}>

</ModalQoute>
    </div>
    <Toaster  position="top-right" />
</div> 

      );
    }




  export default QuestionBusIntro;
