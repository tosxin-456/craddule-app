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
import DatePicker from 'react-datepicker';
import { SketchPicker } from 'react-color'; // Importing SketchPicker from react-color
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import HeaderIdeation from './component/headerIdeation';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import fol from './images/fol.png';
import circle from './images/circle.png';
import home from './images/HOME.png';
import Header from './component/header';
import file from './images/file image.svg';

const CraddulePitchDeck = () => {
  const navigate = useNavigate()
  const [images, setImages] = useState([]);
  const projectId = localStorage.getItem('nProject');
  const prototypeType = localStorage.getItem('selectedPrototype');

  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [showPicker, setShowPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(''); // Initial color value

  // State variables to manage dropdown behavior
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const dropdownRef = useRef(null);
  const [types, setTypes] = useState([]);
  const [hubs, setHubs] = useState([]);

  const [setError, error] = useState('');

  const [users, setUsers] = useState([]);

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
  const inputFileRef = useRef(null); // Ref for the input element

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
  }, []);

  const moveImage = (dragIndex, hoverIndex) => {
    const dragImage = images[dragIndex];
    const updatedImages = [...images];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, dragImage);
    setImages(updatedImages);
  };

  
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
    noClick: true, // Prevent the default click behavior
  });
  
  const handleSubmit = () => {
    console.log('Submitting images:', images);
    handleUpload();
  };


  const [loading, setLoading] = useState(false);
  const onClickHandler = () => navigate(`/pageFrontView`)

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);

  };

  // Function to handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDropdownOpen(false);
  };


  //Second Dropdown

  // State variables to manage dropdown behavior
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectStage, setSelectStage] = useState('');
  const dropdownRef1 = useRef(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/hub/project/${projectId}`);
        console.log(response.data.data);
        setTypes(response.data.data);
        setHubs(response.data.data)

      } catch (error) {
        console.error('Error fetching types:', error);


      }
    };

    fetchTypes();
  }, []);
  
  const groupByHubType = (data) => {
    return data.reduce((acc, hub) => {
      if (!acc[hub.hubType]) {
        acc[hub.hubType] = { count: 0, items: [] };
      }
      acc[hub.hubType].count++;
      acc[hub.hubType].items.push(hub);
      return acc;
    }, {});
  };

  const groupedData = groupByHubType(hubs);




  return (
    <div>
      <Header />
      <div className="container relative">
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

        <div className='const'>
          <div className='row'>

            <div className='text-center'>
              <p className='taskHeader'>Craddule Hub</p>
              <p>Here you can view and upload your files</p>
            </div>
            <div className='modalStTask'>
              <div className="flex  justify-between ">
                {Object.entries(groupedData).map(([hubType, { count }]) => (
                  <div key={hubType} className="col-md-3">
                    <div className="hub-group">
                      {/* <Link to={`/types/${item._id}`} className="dd"> */}
                        <img src={file} className="fol" alt={hubType.hubFileName} />
                      <h3>{hubType}</h3>
                      <p> {count} page(s)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Toaster position="top-right" />
          </div>

        </div>
      </div>

    </div>



  );
};

export default CraddulePitchDeck;
