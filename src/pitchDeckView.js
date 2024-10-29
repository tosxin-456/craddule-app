import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideMenu2P from './component/sideMenu2P';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'; // Import the modal library
import { faCircleNotch, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import circle from './images/circle.png';
import home from './images/HOME.png';
import file from './images/file image.svg';


const PitchDeck = () => {
  const navigate = useNavigate()



  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const projectId = localStorage.getItem('nProject');
  const type = "PitchDeck";
  const prototypeType = 'PitchDeck';
  const [loading, setLoading] = useState(false);

  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;

  const handleSubmit = () => {
    console.log('Submitting images:', images);
    handleUpload();
  };

  const handleUpload = async () => {
    setLoading(true);
    for (let index = 0; index < images.length; index++) {
      const selectedFile = images[index];
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('type', prototypeType);
      formData.append('projectId', projectId);
      formData.append('sequence', index); // Use the index as the sequence number
      formData.append('imageName', selectedFile.name); // Use the file name as the image name

      try {
        const response = await axios.post(`${API_BASE_URL}/api/pitchDeck/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access_token}`,
          }
        });
        console.log(response);
        toast.success("Image Uploaded");
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }

    if (prototypeType === "Prototype") {
      navigate('/prototype');
    } else if (prototypeType === "Wireframe") {
      navigate('/wireframe');
    }
  };

  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/hub/types/project/${type}/${projectId}`);
        console.log(response.data);
        setTypes(response.data.hubs);

      } catch (error) {
        console.error('Error fetching types:', error);


      }
    };

    fetchTypes();
  }, []);

  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = date.toLocaleDateString();
    return { time, formattedDate };
  };

  const openModal = (imageDetail) => {
    setSelectedImage(API_BASE_URL + `/images/${imageDetail.hubFile}`);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <div className='container relative'>
        <div className="absolute inset-0 mt-[60px] ml-[-20px] z-[-100] bg-no-repeat bg-cover w-[200px] h-[200px]" style={{ backgroundImage: `url(${circle})` }}></div>
        <div className="flex mt-[40px] justify-between items-center w-[100%]">
          <div className="w-fit">
            <button onClick={() => navigate(-1)} className='bg-[#193FAE] px-[30px] py-[5px] text-white rounded-3xl'>
              Back
            </button>
          </div>
          <div>
            <img src={home} alt="Home Icon" />
          </div>
        </div>

        <div className='text-center' style={{ marginTop: 50 }}>
          <p className='taskHeader'>Pitch Deck</p>

        </div>
        <div className='coverPit'>



          <div className='row'>
            {types.map((imageDetail, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <div className='imgCo'>
                    <div className="image-card">
                      {/* Display only the file logo */}
                      <img src={file} alt="file-logo" className="image-card-img" onClick={() => openModal(imageDetail)} />
                      {/* <FontAwesomeIcon icon={faDeleteLeft} className="edit-icon" /> */}
                    <p className='fileName'>{imageDetail.hubFileName}</p>
                    <p>1 page</p>
                    </div>

                    {/* Display file name and number of pages */}

                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center">
            {loading ? (
              <button disabled={true} className='submit-button'>
                <FontAwesomeIcon icon={faCircleNotch} className='fa-spin' />
              </button>
            ) : (
              <button onClick={handleSubmit} className='submit-button rounded-3xl'>Upload file</button>
            )}

            <button onClick={handleSubmit} className='border-solid border-[1px] p-[10px] border-[red] rounded-3xl delete-button ml-4'>Delete</button>
          </div>

        </div>


        <Modal isOpen={!!selectedImage} onRequestClose={closeModal} contentLabel="Image Modal" className="image-modal" overlayClassName="image-modal-overlay">
          <div className="modal-content2">
            <img src={selectedImage} alt="Full Size" className="full-size-image" />
            <button onClick={closeModal} className="close-button2">Close</button>
          </div>
        </Modal>


        <Toaster position="top-right" />


      </div>
    </>
  );
};

const ImagePreview = ({ image, index, moveImage, removeImage }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'image',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  drag(drop(ref));

  return (
    <div ref={ref} className="image-preview" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src={image.preview} alt={`preview-${index}`} />
      <button className="remove-button" onClick={() => removeImage(index)}>
        x
      </button>
    </div>
  );
};


export default PitchDeck;
