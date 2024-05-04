import React, { useState } from 'react';
import cloud from './cloud.png'; 
import ReactDOM from "react-dom";
import API_BASE_URL from './apiConfig';
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from "jwt-decode";




export default function ImageModal ( {open, onClose})  {

  
   const [isOpen, setIsOpen]= useState(false);
   const [selectedImage, setSelectedImage] = useState(null);
   const [errorMessage, setErrorMessage] = useState('');


    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        imageUrl: '',
      });
    

      const navigate = useNavigate()
      const onClickHandler = () => navigate(`/pageFrontView`)
      if(!open) return null
   
      const access_token = localStorage.getItem('access_token');
       const decodedToken = jwtDecode(access_token);
       const userId = decodedToken.userId;

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
        const file = e.target.files[0];
  console.log(file.name); // Outputs the name of the selected file
  console.log(file); // Outputs the File object representing the selected file
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

        
         // Check if the image format is supported
         if (!formData.imageUrl.match(/\.(jpg|jpeg|png)$/i)) {
          toast.error('Invalid image format. Only JPG, JPEG, and PNG are supported.');
        }
        
      console.log(formData);
      console.log("check before")
      userImageUpdate(formData);
    
       
      };
    
      const userImageUpdate = async (data) => {
        setLoading(true);
        console.log("at change");
        try {

          
        console.log(data);
        console.log(JSON.stringify(data));
          const response = await fetch(API_BASE_URL+'/api/user/update-image/'+userId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,
            },
            body: formData,
          });

         // const data = response.json();
    
          if (response.status === 200) {
            console.log(response.status);
            console.log(response);
            const responseData = await response.json(); // Parse JSON response
            console.log(responseData)
      
     
      //const { token } = responseData; // Access token directly from response
      setLoading(false);
      // Save access token to local storage
    
         
          } else {
            const result = await response.json();
            setLoading(false);
            toast.error(result['error']);
              console.error('Error:', result['error']);
            //console.error('Failed to create User');
          }
        } catch (error) {
          setLoading(false);
          console.error('An error occurred:', error);
        }
      };



   const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setSelectedImage(droppedFiles[0]);
    }
  };
 

   return ReactDOM.createPortal (
      <>
        <div className='modalOv' nDrop={handleDrop} onDragOver={handleDragOver} >
           <div className='modalSt2'>
                <p className='closeIcon' type='button' onClick={onClose} >X</p>
                <form onSubmit={handleSubmit}>
              <label className='txt2a'>Drag and Drop or Choose from Files</label>
              <hr></hr>
              
              <div className='uploadImage1'>
              <input 
              className='txtCa'
              id="imageUrl" 
              type="file" 
              value={formData.imageUrl}
              onChange={handleChange} 
              />
              <img src={cloud} className='logoIcon1'></img>
               {/* <p className='txtC'>Drag and drop </p>*/}
               {/* <p className='txt1'>Maximum 50MB file size <br></br>JPG, PNG, or GIF format</p>  */}           
           </div>
          
           <div className='shareImageDiv'><button type="submit" className="btn btn-primary curveImage" disabled={loading}>{ loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Upload Image</span>}
                
              </button>
                    </div>
                    </form>
           </div> 
             <Toaster  position="top-right" />
         
        </div>
        </>,
        document.getElementById('portal')
     );
}