import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from "./config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { FaDownload, FaFilePdf, FaSyncAlt, FaArrowRight } from "react-icons/fa";
import { MdOutlineSummarize } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
import { Toaster, toast } from 'sonner';
import home from "./images/HOME.png";
import Header from "./component/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faChevronDown, faBold, faItalic, faUnderline, faStrikethrough, faQuoteRight, faCode, faLink, faImage, faTextHeight, faListOl, faListUl, faSubscript, faSuperscript, faOutdent, faIndent, faAlignRight, faHeading } from '@fortawesome/free-solid-svg-icons';
import {
    DocumentText, Bold, Italic, Underline, Strikethrough, Quote, Code, Image, AlignLeft, AlignCenter, AlignRight, Outdent, Indent, Subscript, Superscript, Edit2, Save, Trash, ListOrdered,
    ListOrderedIcon,
    ListMinus,
} from 'lucide-react';
import circle from './images/circle.png';
import bg from './images/pattern_landscape.png';
import feedback from './images/feedback.svg';


import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { jwtDecode } from "jwt-decode";
import ImageResize from 'quill-image-resize-vue';
import Tooltip from './component/tooltip';
import ImagePopup from './component/cradduleModal';
import axios from 'axios';
import nspell from 'nspell';


function PhaseSummary() {
    const [recentSummary, setRecentSummary] = useState("");
    const [previousSummary, setPreviousSummary] = useState(null);
    const [olderSummary, setOlderSummary] = useState(null);
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedSummary, setSelectedSummary] = useState("recent");
    const navigate = useNavigate();
    const projectId = localStorage.getItem("nProject");
    const token = localStorage.getItem("access_token");
    const { phase, category, subCategory } = useParams();
    const onClickHandler = () => navigate(`/video`);
    const [images, setImages] = useState([]);
    const [types, setTypes] = useState([]);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [answersV, setAnswersV] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [error, setError] = useState(null);
    const [combinedAnswer, setCombinedAnswer] = useState('');
    const [answered, setAnswered] = useState([]);
    const [cat, setCat] = useState([]);
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;
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
                // setError('Failed to fetch types');
                setLoading(false);
            }
        };

        fetchTypes();
    }, []);

    useEffect(() => {
        console.log("fetchAnswers");
        const fetchAnswers = async () => {
            console.log(API_BASE_URL + `/api/pdf/${projectId}/${category}`)
            try {
                const summaryResponse = await fetch(API_BASE_URL + `/api/pdf/${projectId}/${category}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the token in the request headers
                    }
                });

                if (summaryResponse.ok) {
                    const dataS = await summaryResponse.json();
                    console.log("data for summary:", dataS)
                    // If summary exists, fetch the summary data
                    if (dataS.data && Array.isArray(dataS.data)) {
                        console.log("Summary data array:", dataS.data);

                        const combinedSummary = dataS.data
                            .map((item) => {
                                const formattedSubType = item.questionSubType.replace(/([A-Z])/g, ' $1').trim();
                                return `<h2 style="text-align: center;">${formattedSubType}</h2><br>${item.summary}`;
                            })
                            .join('<br><br>');

                        setCombinedAnswer(combinedSummary); // Set the combined summary
                        console.log("Combined summary:", combinedSummary);
                    } else {
                        const response = await fetch(API_BASE_URL + `/api/pdf/single/${projectId}/${category}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}` // Include the token in the request headers
                            }
                        });

                        if (!response.ok) {
                            throw new Error('Failed to fetch answers');
                        }
                        const data = await response.json();
                        console.log(data);
                        console.log(data.data);
                        console.log(data.data[0].summary);
                        console.log('answers getting because no summary');
                        setAnswers(data.data);
                        const combined = data.data.map(answer => {
                            const formattedSubType = answer.questionSubType.replace(/([A-Z])/g, ' $1').trim();
                            return `<h4 style="text-align: center;">${formattedSubType}</h4><br>${answer.summary}`;
                        }).join('<br><br>');
                        console.log(combined);
                        setCombinedAnswer(combined);
                        setLoading(false);
                    }
                } else {
                    throw new Error('Failed to fetch summary');
                }
            } catch (error) {
                // setError(error.message);
                setLoading(false);
            }
        };

        fetchAnswers();
    }, []);







    const handleClick = (id) => {
        // Handle click event and set the selected answer
        navigate('/questionEdit/' + id);
    };

    const handleClickSh = (id) => {
        // Handle click event and set the selected answer
        console.log(id)
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
        console.log("on the save pdf.")
        try {
            setLoading(true);
            console.log(combinedAnswer);
            const summary = combinedAnswer;
            const response = await fetch(API_BASE_URL + '/api/pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ projectId, category, summary, userId, phase }),
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
        [{ size: [] }],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
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
    const module = {

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
        const newFile = API_BASE_URL + '/images/' + file;
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

    useEffect(() => {
        fetchSummaries();
    }, []);

    const phasePaths = [
        "Ideation",
        "ProductDefinition",
        "InitialDesign",
        "ValidatingAndTesting",
        "Commercialization"
    ];

    const fetchSummaries = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/test-new/questions/summary/${phase}/${projectId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            if (data.status === 200) {
                console.log(data)
                setRecentSummary(data.data.summary);
                setPreviousSummary(data.data.summary_one || null);
                setOlderSummary(data.data.summary_two || null);
                setCount(data.data.count)
            }
        } catch (error) {
            console.error("Error fetching summaries:", error);
        }
        setLoading(false);
    };

    const regenerateSummary = async () => {
        setLoading(true);
        try {
            await fetch(
                `${API_BASE_URL}/api/test-new/questions/summary/${phase}/${projectId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchSummaries();
        } catch (error) {
            console.error("Error regenerating summary:", error);
        }
        setLoading(false);
    };

    const getNextPhase = () => {
        const currentIndex = phasePaths.indexOf(phase);
        const nextPhase = currentIndex !== -1 && currentIndex < phasePaths.length - 1
            ? phasePaths[currentIndex + 1]
            : null;
        if (nextPhase) navigate(`/test-ai/${nextPhase}`);
    };

    const formatPhase = (text) => {
        return text
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const downloadPDF = () => {
        const element = document.getElementById("summary-content");
        html2pdf().from(element).save(`${formattedPhase}_Summary.pdf`);
    };

    const formattedPhase = formatPhase(phase);

    function Divider() {
        return <div className="h-6 border-[1.2px] border-gray-600 mx-1"></div>;
    }

    const [editedSummary, setEditedSummary] = useState("");


    const updateSummary = async () => {
        console.log(editedSummary, selectedSummary);

        if (!editedSummary.trim()) {
            alert("Summary cannot be empty.");
            return;
        }

        // Map selectedSummary to the corresponding field name
        const fieldMap = {
            recent: "summary",
            previous: "summary_one",
            older: "summary_two",
        };

        const selectedField = fieldMap[selectedSummary]; // Get the correct field

        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/test-new/questions/summary-update/${phase}/${projectId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    summary: editedSummary,
                    field: selectedField, // Sending mapped field to update
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Summary updated successfully.");
                window.location.reload()
            } else {
                alert(result.error || "Failed to update summary.");
            }
        } catch (error) {
            console.error("Error updating summary:", error);
            alert("Error updating summary.");
        } finally {
            setLoading(false);
        }
    };


    const [selectedField, setSelectedField] = useState("summary");

    return (
        <div

            style={{
                fontFamily: '"Manrope", sans- serif'
            }}>
            <Header />

            <div className="absolute inset-0 mt-[50px] ml-[60px]  z-[-100] bg-no-repeat bg-cover w-[200px] h-[200px] " style={{ backgroundImage: `url(${circle})` }}></div>

            <div className="flex flex-col items-center gap-6 p-4 md:p-8 bg-gray-100 min-h-screen">
                <div className="w-full max-w-2xl flex justify-between items-center mt-4 md:mt-10">
                    <button
                        onClick={() => navigate('/start')}
                        className="bg-[#193FAE] px-4 md:px-6 py-2 text-white rounded-3xl shadow-md hover:bg-[#162E8D] transition"
                    >
                        Back to Phases
                    </button>
                    <img src={home} alt="Home Icon" />
                </div>


                <h5 className="text-2xl md:text-4xl font-bold text-gray-900 text-center">
                    {formattedPhase} Phase Summary
                </h5>

                <div className="flex flex-wrap gap-3 mt-4">
                    <button
                        onClick={regenerateSummary}
                        disabled={count >= 2}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition 
        ${count >= 2 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}
                    >
                        <FaSyncAlt /> Regenerate
                    </button>

                    <button onClick={getNextPhase} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Next Phase <FaArrowRight />
                    </button>
                    {/* <button onClick={downloadPDF} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                        <FaDownload /> Download PDF
                    </button> */}
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
                    <div className="flex flex-col gap-2">
                        {recentSummary && (
                            <button
                                onClick={() => setSelectedSummary("recent")}
                                className={`p-2 rounded-lg ${selectedSummary === "recent" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                            >
                                <MdOutlineSummarize /> Version 1
                            </button>
                        )}

                        {previousSummary && (
                            <button
                                onClick={() => setSelectedSummary("previous")}
                                className={`p-2 rounded-lg ${selectedSummary === "previous" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                            >
                                <MdOutlineSummarize /> Version 2
                            </button>
                        )}

                        {olderSummary && (
                            <button
                                onClick={() => setSelectedSummary("older")}
                                className={`p-2 rounded-lg ${selectedSummary === "older" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                            >
                                <MdOutlineSummarize /> Version 3
                            </button>
                        )}
                    </div>


                    {/* className="min-h-[70vh] bg-white " */}
                    <div id="summary-content" className="  bg-[url('./images/pattern_landscape.png')]  bg-cover bg-no-repeat w-full p-4 md:p-6 bg-white shadow-lg rounded-xl border">
                        <div className='container-textBs'>
                            <div className='flex justify-between' >
                                <h4 className="text-[13px] md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                    <MdOutlineSummarize /> SUMMARY
                                </h4>
                                <button
                                    onClick={updateSummary}
                                    className="bg-blue-500 text-white px-1 py-[5px] rounded-lg shadow hover:bg-blue-600 transition"
                                >
                                    Save
                                </button>
                            </div>

                            <div className="p-2 space-y-2">
                                <div className="toolbar bg-gray-100 p-2 rounded-lg flex flex-wrap gap-1 md:justify-center justify-start items-center shadow-md">
                                    {/** Bold Button **/}
                                    <button
                                        onClick={() => formatText("bold")}
                                        type="button"
                                    >
                                        <Bold className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Italic Button **/}
                                    <button
                                        onClick={() => formatText("italic")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <Italic className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Underline Button **/}
                                    <button
                                        onClick={() => formatText("underline")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <Underline className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Strikethrough Button **/}
                                    <button
                                        onClick={() => formatText("strikeThrough")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <Strikethrough className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Blockquote Button **/}
                                    <button
                                        onClick={() => formatText("formatBlock", "blockquote")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <Quote className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Code Block Button **/}
                                    <button
                                        onClick={() => formatText("formatBlock", "pre")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <Code className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Link Button **/}
                                    <button
                                        onClick={insertLink}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <FontAwesomeIcon icon={faLink} className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Image Button **/}
                                    <button
                                        onClick={handleImagePopup}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <Image className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Font Size Dropdown **/}
                                    <select
                                        onChange={(e) => formatText("fontSize", e.target.value)}
                                        className="select-dropdown"
                                    >
                                        <option value="">Size</option>
                                        {[...Array(23)].map((_, i) => (
                                            <option key={i} value={i + 2}>
                                                {i + 2}
                                            </option>
                                        ))}
                                    </select>
                                    <Divider />
                                    {/** Heading Dropdown **/}
                                    <select
                                        onChange={handleHeadingChange}
                                        className="select-dropdown"
                                    >
                                        <option value="">Heading</option>
                                        {[...Array(6)].map((_, i) => (
                                            <option key={i} value={`h${i + 1}`}>
                                                H{i + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <Divider />
                                    {/** Ordered List Button **/}
                                    <button
                                        onClick={() => formatText("insertOrderedList")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <FontAwesomeIcon icon={faListOl} className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Unordered List Button **/}
                                    <button
                                        onClick={() => formatText("insertUnorderedList")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <FontAwesomeIcon icon={faListUl} className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Subscript Button **/}
                                    <button
                                        onClick={() => formatText("subscript")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <Subscript className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Superscript Button **/}
                                    <button
                                        onClick={() => formatText("superscript")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <Superscript className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Outdent Button **/}
                                    <button
                                        onClick={() => formatText("outdent")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <Outdent className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Indent Button **/}
                                    <button
                                        onClick={() => formatText("indent")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <Indent className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Align Right Button **/}
                                    <button
                                        onClick={() => formatText("direction", "rtl")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <AlignRight className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Align Center Button **/}
                                    <button
                                        onClick={() => formatText("direction", "center")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <AlignCenter className="w-4 h-4" />
                                    </button>
                                    <Divider />
                                    {/** Align Left Button **/}
                                    <button
                                        onClick={() => formatText("direction", "ltr")}
                                        type="button"
                                        className="btn-icon"
                                    >
                                        <AlignLeft className="w-4 h-4" />
                                    </button>
                                </div>


                            </div>

                            {loading ? (
                                <p className="text-gray-500 italic">Loading summary...</p>
                            ) : (
                                <div
                                    ref={editorRef}
                                    contentEditable={true}
                                    className="editor rounded-md shadow-inner min-h-[300px] p-4 break-words focus:outline-none"
                                    // onInput={handleEditorChange}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onInput={(e) => setEditedSummary(e.currentTarget.innerHTML)}
                                // dangerouslySetInnerHTML={isEditing ? { __html: editedSummary } : undefined}
                                >
                                    <ReactMarkdown>
                                        {selectedSummary === "recent" ? recentSummary : selectedSummary === "previous" ? previousSummary : olderSummary}
                                    </ReactMarkdown>
                                </div>

                            )}


                            {showImagePopup &&
                                <ImagePopup


                                    onClose={() => setShowImagePopup(false)}
                                    types={types}
                                    onInsertFile={handleInsertFile}
                                />
                            }

                        </div>

                    </div>
                </div>
            </div>
            <div
                className="fixed bottom-0 right-0 z-[-100] m-0 p-0 w-[250px] h-[250px] bg-no-repeat"
                style={{
                    backgroundImage: `url(${feedback})`,
                    backgroundSize: '100% 100%', // Stretches image to fit exactly
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    margin: '0',
                    padding: '0',
                }}
            ></div>
        </div>
    );
}

export default PhaseSummary;