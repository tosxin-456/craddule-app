import React, { useState } from 'react';
import cloud from './cloud.png'; 
import ReactDOM from "react-dom";
import {API_BASE_URL} from '../config/apiConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from "jwt-decode";




export default function ImageModal ( {open, onClose, setImage})  {

  
  const [isOpen, setIsOpen]= useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate()

  const onClickHandler = () => navigate(`/pageFrontView`)
  if(!open) return null
   
  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;  


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setWaiting(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedFile) {
      toast.error('No file selected');
      setLoading(false);
      return;
    }
    
    console.log(selectedFile);
    const formData = new FormData();
    formData.append('image', selectedFile);
    console.log(formData);

    try {
      const response = await axios.put(API_BASE_URL+'/api/user/image/'+userId, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${access_token}`
        }
      });
      console.log(response.data);
      // Handle successful upload
      toast.success(response.data.message)
      const imageFile = response.data.image.split('/');
      console.log(imageFile);
      setImage(imageFile[3]);
      setLoading(false);
      document.getElementById('closal').click();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error)
      setLoading(false);

      // Handle error
    }
  };

  const handleClose = () => {
    document.getElementById('modalOv').hidden = true;
  }
 
  const handleClick = () => {
    setWaiting(true);
    document.getElementById('profileImage').click();
  }

   return ReactDOM.createPortal (
      <>
      <div className='modalOv' id='modalOv'>
        <div className='fixed top-0 left-0 w-full h-full z-[-999]' id='closal' onClick={onClose}></div>
        <div className='w-[800px] m-auto mt-5 bg-white rounded-xl translate-y-[20%]'>
          <div className='p-10 px-44'>
            <h4 className='font-semibold text-center'>Upload Picture</h4>
            <h6 className='texet-[16px] text-black200 text-center font-light'>Set a new profile picture</h6>
              <form onSubmit={handleUpload} className='mt-14'>
                <div className='w-40 h-40 m-auto border-dashed border-2 border-gray900 bg-gray-300 rounded-xl cursor-pointer animate-pulse hover:bg-gray100' onClick={handleClick}>
                {selectedFile && <p className='text-center translate-y-[100%]'>Image<br/>Selected</p>}
                {!selectedFile && <p className='text-center translate-y-[100%]'>Click to<br/>select image</p>}
                  <input 
                    id='profileImage'
                    className='hidden'
                    type="file" 
                    name='image'
                    onChange={handleFileChange}
                    />
                  {/* <img src={cloud} className='logoIcon1'></img> */}
                </div>
                <div className='flex justify-center mt-5'>
                  <button type='submit' className={`py-3 px-5 w-[200px] bg-blue600 rounded-full text-white`} disabled={!selectedFile}>
                    {loading ? <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' /> : <span>Upload</span>}
                  </button>
                </div>
              </form>
          </div>
        </div>
        <ToastContainer/>
      </div>
        {/* <div className='modalOv'>
           <div className='modalSt2'>
                <p className='closeIcon' type='button' onClick={onClose} >X</p>
              <p className='txt2a'>Drag and Drop or Choose from Files</p>
              <hr></hr>
              <div className='uploadImage1'>
              <input 
              className='txtCa'
              type="file" 
              name='image'
              onChange={handleFileChange} 
              />
              <img src={cloud} className='logoIcon1'></img>          
           </div>
          
           <div className='shareImageDiv'><button type="submit" className="btn btn-primary curveImage" disabled={loading} onClick={handleUpload}>{ loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Upload Image</span>}
                
              </button>
                    </div>

           </div> 
           
             <Toaster  position="top-right" />
        </div> */}
        </>,
        document.getElementById('portal')
     );
}