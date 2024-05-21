import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from '../config/apiConfig';
import fol from '../images/fol.png'; 
import { Link } from 'react-router-dom';


const ImagePopup = ({  onClose, onInsertFile}) => {

    const [selectedType, setSelectedType] = useState(null);
    const [selectedSubtype, setSelectedSubtype] = useState(null);
    const [subtypes, setSubtypes] = useState({});
    const [files, setFiles] = useState([]);
    const [types, setTypes] = useState([]);
    const [showTypes, setShowTypes] = useState(true); 
    const [showSubTypes, setShowSubTypes] = useState(true); 

    const handleTypeClick = (type) => {
      setSelectedType(type);
      setSelectedSubtype(null);
    };
  
    const handleSubtypeClick = (subtype) => {
      setSelectedSubtype(subtype);
    };
  
    const transformData = (data) => {
        const transformedData = {};
      
        data.forEach(item => {
          const { hubType, hubFileName, hubFile, hubSubType, _id } = item;
      
          if (!transformedData[hubType]) {
            transformedData[hubType] = {
              id: hubType,
              hubType,
              subtypes: {},
              files: [],
            };
          }
      
          if (hubSubType) {
            if (!transformedData[hubType].subtypes[hubSubType]) {
              transformedData[hubType].subtypes[hubSubType] = {
                id: hubSubType,
                name: hubSubType,
                files: [],
              };
            }
            transformedData[hubType].subtypes[hubSubType].files.push({ id: _id, name: hubFileName, file: hubFile });
          } else {
            transformedData[hubType].files.push({ id: _id, name: hubFileName, file: hubFile });
          }
        });
      
        return Object.values(transformedData);
      };

    const groupedData = transformData(types);

    console.log("types");
    console.log(types);
    
    const handleInsertClick = (file) => {
        console.log(file.hubFile);
        onInsertFile(file.hubFile);
      };
    
      
      useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/hub/types`);
                setTypes(response.data);
                
            } catch (error) {
                console.error('Error fetching types:', error);
                
                
            }
        };
   
        fetchTypes();
    }, []);

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const formattedDate = date.toLocaleDateString(); // e.g., "5/20/2024"
        const formattedTime = date.toLocaleTimeString(); // e.g., "2:59:31 PM"
        return `${formattedDate} ${formattedTime}`;
      };

    const fetchTypeDetails = async (data) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/hub/types/${data}`);
            setSubtypes(response.data.subTypes);
            console.log(response.data);
            setFiles(response.data.files);
            setShowTypes(false);
            setShowSubTypes(true);
            
        } catch (error) {
            console.error('Error fetching subtypes and files:', error);
            
           
        }
    };

    if(!onClose) return null
    return ReactDOM.createPortal (
        <>
     <div className='modalOv' >
           <div className='modalSt1'>
           <button className="btn btn-primary deleteNoButton modalX" onClick={onClose} >X</button>
            <div className='grid-container'>
            {showTypes && (
                    <div className='grid-container'>
                    {types.map((type) => (
                        <div key={type} className='grid-item' onClick={() => fetchTypeDetails(type)}>
                        <img src={fol} alt='folder icon' className='fol' />
                        <p className='folP'>{type}</p>
                        </div>
                    ))}
                    </div>
            )}



            {showSubTypes && (
                <div>
                     <div className='grid-container'>
                     {files.map((file, index) => (
                         <div key={index} className='grid-item'>
                             <img src={API_BASE_URL+`/images/${file.hubFile}`}  alt="Image 1"
                                 className="gallery-image imgA dd" onClick={() => handleInsertClick(file)}></img>
                                <p className='crap'>Uploaded at: {formatDateTime(file.timeSent)}</p>
                            
                            </div>
                     ))}
                     </div>
                     
                     <div className='grid-container'>
                         {Object.entries(subtypes).map(([subtype, subFiles]) => (
                             <div key={subtype} className='grid-item'>
                             
                                 
                                     <img src={fol} className='fol'></img>
                                     <p className='folP'>{subtype}</p>
                                 
                             
                             </div>
                         ))}
                     </div>
                     </div>
            )}               
            
            </div>
           </div>
    </div>
  </>,
            document.getElementById('portal')

     );
};

export default ImagePopup;
