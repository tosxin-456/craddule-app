import React, { useState, useRef } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL, API_IMAGE_BASE_URL } from '../config/apiConfig';

export default function ImageModal({ open, onClose, setImage }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;

  const onClickHandler = () => navigate(`/pageFrontView`);

  if (!open) return null;

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file && file.size > 5 * 1024 * 1024) { // 5MB size limit
    toast.error('File is too large');
  } else if (file && !file.type.startsWith('image/')) {
    toast.error('Only image files are allowed');
  } else {
    setSelectedFile(file);
  }
};


  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedFile) {
      toast.error('No file selected');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.put(`${API_BASE_URL}/api/user/image/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${access_token}`,
        },
      });
      toast.success(response.data.message);
      const imageFile = response.data.image.split('/');
      setImage(imageFile[3]);
      setLoading(false);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Error uploading image');
      setLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return ReactDOM.createPortal(
    <>
      <div className='modalOv' id='modalOv'>
        <div className='fixed top-0 left-0 w-full h-full z-[-999]' onClick={() => { setSelectedFile(null); onClose(); }}></div>
        <div className='w-[800px] m-auto mt-5 bg-white rounded-xl translate-y-[20%]'>
          <div className='p-10 px-44'>
            <h4 className='font-semibold text-center'>Upload Picture</h4>
            <h6 className='text-[16px] text-black200 text-center font-light'>Set a new profile picture</h6>
            <form onSubmit={handleUpload} className='mt-14'>
              <div className='w-40 h-40 m-auto border-dashed border-2 border-gray900 bg-gray-300 rounded-xl cursor-pointer animate-pulse hover:bg-gray100' onClick={handleClick}>
                {selectedFile ? <p className='text-center translate-y-[100%]'>Image<br />Selected</p> : <p className='text-center translate-y-[100%]'>Click to<br />select image</p>}
                <input
                  id='profileImage'
                  className='hidden'
                  type="file"
                  name='image'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              <div className='flex justify-center mt-5'>
                <button type='submit' className={`py-3 px-5 w-[200px] bg-blue600 rounded-full text-white`} disabled={!selectedFile || loading}>
                  {loading ? <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' /> : <span>Upload</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>,
    document.getElementById('portal')
  );
}
