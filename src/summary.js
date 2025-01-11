import React, { useEffect, useRef, useState } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faChevronDown, faBold, faItalic, faUnderline, faStrikethrough, faQuoteRight, faCode, faLink, faImage, faTextHeight, faListOl, faListUl, faSubscript, faSuperscript, faOutdent, faIndent, faAlignRight, faHeading } from '@fortawesome/free-solid-svg-icons';
import ReactQuill, { Quill } from 'react-quill';
import { jwtDecode } from "jwt-decode";
import ImageResize from 'quill-image-resize-vue';
import Tooltip from './component/tooltip';
import ImagePopup from './component/cradduleModal';
import axios from 'axios';
import nspell from 'nspell';

function Summary() {



    const [activeLink, setActiveLink] = useState("");
    const [activeId, setActiveId] = useState("");
    const [activeTime, setActiveTime] = useState("");
    const { phase } = useParams();
    const [images, setImages] = useState([]);
    const [types, setTypes] = useState([]);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [answersV, setAnswersV] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const projectId = localStorage.getItem('nProject');
    const [combinedAnswer, setCombinedAnswer] = useState('');
    const [answered, setAnswered] = useState([]);
    const [cat, setCat] = useState([]);
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

    const token = localStorage.getItem('access_token');
    const [value, setValue] = useState('');
    const [misspelledWords, setMisspelledWords] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionBoxPosition, setSuggestionBoxPosition] = useState({ top: 0, left: 0 });
    const [selectedWord, setSelectedWord] = useState(null);

    const [showScrollableDiv, setShowScrollableDiv] = useState(false);
    const [showScrollableDiv2, setShowScrollableDiv2] = useState(false);

    const navigate = useNavigate()

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

    const handleToggle = () => {
        setShowScrollableDiv(!showScrollableDiv);
    };

    const handleToggleSh = () => {
        setShowScrollableDiv2(!showScrollableDiv2);
    };

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

    // const handleInsertFile = (file) => {
    //     const newFile = API_BASE_URL + '/images/' + file;
    //     console.log(newFile);
    //     setCombinedAnswer((prevContent) => `${prevContent}<div contenteditable="true" style="display:inline-block; width:30%;"><img src="${newFile}" style="width:100%;" /></div>`);
    //     // setCombinedAnswer((prevContent) => `${prevContent}<img src="${newFile}" alt="Inserted File" />`);

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

    const onClickHandler = () => navigate(``)
    return (
        <>

            <Header />
            <div className={`main-content2 ${showScrollableDiv ? 'shrink' : ''}`}>

                <Menu />
                <div className='text-center'>
                    <p className='centerH'>Summary</p>
                    <p className='centerHp'>Make sure you answer all questions</p>
                </div>
                <div className="w-fit mr-[20px] ml-auto mb-[10px] " >
                </div>
                <div className='quiInt'>


                    <form >



                        <div className='container-textBs'>

                            {/* <ReactQuill ref={reactQuillRef} theme="snow" value={combinedAnswer} onChange={setCombinedAnswer} modules={modules} formats={formats}/> */}

                            {/* <textarea className='textBs' value={combinedAnswer} onChange={handleChange} id="summary"></textarea> */}

                            <div className="toolbar mt-4 p-1 mb-5 bg-[#E8ECF9] rounded-lg flex flex-wrap justify-start items-center font-sans gap-1">
                                <button
                                    onClick={() => formatText('bold')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faBold} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('italic')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faItalic} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('underline')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faUnderline} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('strikeThrough')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faStrikethrough} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('formatBlock', 'blockquote')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faQuoteRight} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('formatBlock', 'pre')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faCode} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={insertLink}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faLink} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={handleImagePopup}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faImage} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <select
                                    onChange={(e) => formatText('fontSize', e.target.value)}
                                    className="p-1 border rounded bg-transparent text-lg focus:outline-none"
                                >
                                    <option value="">Font Size</option>
                                    {[...Array(23)].map((_, i) => (
                                        <option key={i} value={i + 2}>
                                            {i + 2}
                                        </option>
                                    ))}
                                </select>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <select
                                    onChange={handleHeadingChange}
                                    className="p-1 border rounded bg-transparent text-lg focus:outline-none"
                                >
                                    <option value="">Heading</option>
                                    {[...Array(6)].map((_, i) => (
                                        <option key={i} value={`h${i + 1}`}>
                                            H{i + 1}
                                        </option>
                                    ))}
                                </select>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('insertOrderedList')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faListOl} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('insertUnorderedList')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faListUl} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('subscript')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faSubscript} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('superscript')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faSuperscript} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('outdent')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faOutdent} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('indent')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faIndent} />
                                </button>
                                <div className="h-5 border-l-2 border-gray-500 mx-1"></div>
                                <button
                                    onClick={() => formatText('direction', 'rtl')}
                                    type="button"
                                    className="p-1 hover:bg-gray-300 rounded text-lg"
                                >
                                    <FontAwesomeIcon width={11} icon={faAlignRight} />
                                </button>
                            </div>


                            <div
                                ref={editorRef}
                                contentEditable={true}
                                className="editor bg-[#EEEEEE] md:w-[80%] rounded-md m-auto "
                                onInput={handleEditorChange}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onClick={(e) => {
                                    const selection = window.getSelection();
                                    if (!selection.rangeCount) return;

                                    const range = selection.getRangeAt(0);
                                    const word = range.startContainer.textContent.slice(range.startOffset, range.endOffset);
                                    console.log(word);
                                    if (misspelledWords.includes(word)) {
                                        const rect = e.target.getBoundingClientRect();
                                        handleWordClick(word, rect);
                                    }
                                }}
                                style={{ whiteSpace: "pre-wrap", minHeight: "200px", border: "1px solid #ccc", padding: "10px" }}
                            />




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
                    <div className='qulis' key={index} onClick={() => handleClickSh(cat.questionSubType)} style={{ cursor: 'pointer' }}>
                        <p style={{ marginBottom: 7 }}>{cat.questionSubType}</p>
                    </div>
                ))}

            </div>
            <div className='w-fit m-auto mb-5 ' >
                <button className='bg-[#FFD700] px-3 py-1 rounded-full m-auto mb-5  text-[20px] font-medium ' >
                    End Section
                </button>

            </div>
        </>
    );
}

export default Summary