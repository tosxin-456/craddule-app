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
import OrangeCheckbox from './component/checkBox';
import Header from './component/header';
import circle from './images/circle.png';
import home from './images/HOME.png';
import feedback from './images/feedback.svg';


const CreateTask = () => {
  const navigate = useNavigate()

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
  const [teamMembers, setTeamMembers] = useState([]);
  const [setError, error] = useState('');

  const [users, setUsers] = useState([]);



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


  // Function to toggle dropdown visibility
  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  // Function to handle option selection
  const handleOptionSelect1 = (option) => {
    setSelectedOption1(option);
    setIsDropdownOpen1(false);

  };

  // Function to handle date selection
  const handleDateSelect1 = (date) => {
    setSelectedDate1(date);
    setIsDropdownOpen1(false);
  };






  // Close dropdown when clicking outside of it 1
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when clicking outside of it 2
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
        setIsDropdownOpen1(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setShowPicker(!showPicker); // Toggle color picker visibility
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex); // Update selected color
  };


  const [formData, setFormData] = useState({
    task: '',

  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeStage = (event) => {
    setSelectStage(event.target.value);
  };

  const handleChangeUsers = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
  };
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedU, setIsCheckedU] = useState(false);

  const handleCheckboxChange = (e) => {
    console.log(e.target.checked);
    setIsChecked(e.target.checked);
  };
  const handleCheckboxChangeU = (e) => {
    console.log(e.target.checked);
    setIsCheckedU(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectId = localStorage.getItem('nProject');

    const updatedFormData = {
      color: selectedColor,
      startDate: selectedDate,
      endDate: selectedDate1,
      projectId: projectId,
      phase: selectStage,
      users: selectedUsers,
      question: isChecked,
      upload: isCheckedU,
      ...formData,
    };

    console.log(updatedFormData);
    createTask(updatedFormData);


  };



  useEffect(() => {
    fetchTeamMembers();
  }, []);
  const fetchTeamMembers = async () => {
    try {
      console.log(projectId);
      const response = await fetch(`${API_BASE_URL}/api/team/${projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
        }
      });

      console.log("here");
      console.log("here");
      if (response.status === 200) {
        const data = await response.json();
        console.log(data.data);
        const userOptions = data.data.map(user => ({
          value: user.userId._id,
          label: user.userId.firstName
        }));
        console.log(userOptions);
        setUsers(userOptions);

        console.log(teamMembers)
        setLoading(false);
      } else {
        const result = await response.json();
        console.error('Error:', result['error']);
      }

    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };



  const createTask = async (data) => {
    console.log("here");
    setLoading(true);

    try {
      console.log(data);
      console.log(JSON.stringify(data));
      const response = await fetch(API_BASE_URL + '/api/timeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setLoading(false);
        console.log(response.status);
        console.log(response);
        // window.location.reload();
        toast.success('Task Added');

        console.log('Task created successfully');
      } else {
        const result = await response.json();
        setLoading(false);
        toast.error(result['error']);
        console.error('Error:', result['error']);
      }
    } catch (error) {
      setLoading(false);
      console.error('An error occurred:', error);
      console.log(error.response.data);
    }
  };


  return (
    <div>
      <Header />
      <div className="container relative">
        <div
          className="absolute inset-0 mt-16 ml-[-20px] z-[-100] bg-no-repeat bg-cover w-48 h-48"
          style={{ backgroundImage: `url(${circle})` }}
        ></div>

        <div className="flex mt-10 justify-between items-center w-full">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-900 px-8 py-2 text-white rounded-3xl"
          >
            Back
          </button>
            <div className="text-center">
              <p className="text-xl font-semibold">Create Task</p>
              <p className="text-gray-600">Here you can create and assign tasks</p>
            </div>
          <img src={home} alt="Home Icon" />
        </div>

        <div className="mt-2 md:mt-1 mb-3 m-auto md:w-[80%] bg-white rounded-xl p-4  ">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-6">
              <div className="md:flex  gap-6">
                {/* Task Name Input */}
                <div className="flex flex-col w-full md:w-1/2">
                  <label htmlFor="task" className="text-sm font-medium text-gray-700 mb-2">
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="task"
                    value={formData.task}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Color Selection */}
                <div className="flex flex-col w-full md:w-1/2">
                  {showPicker && (
                    <div className="pickerStylesT">
                      <SketchPicker
                        color={selectedColor}
                        onChange={handleColorChange}
                        presetColors={[]}
                        disableAlpha
                      />


                    </div>
                  )}
                  <p className="text-sm font-medium text-gray-700 mb-2">Color</p>
                  <div className="flex items-center gap-4">
                    <input
                      id="color"
                      className="border rounded-lg p-2 flex-grow focus:outline-none"
                      placeholder="Select Color"
                      readOnly
                      value={selectedColor} // Display selected color in the input field
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleButtonClick}
                      type="button"
                    >
                      {showPicker ? "Add Color" : "Select Color"}
                    </button>
                  </div>
                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Task */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Task</label>
                  <select
                    value={selectStage}
                    onChange={handleChangeStage}
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="BusinessCaseBuilder">Business Case Builder</option>
                    <option value="BusinessAnalysisPack">Business Analysis Pack</option>
                    <option value="ValuePropositionPack">Value Proposition Pack</option>
                    <option value="SuccessMatrix">Success Matrix</option>
                    <option value="DetailedMarketingStrategies">Detailed Marketing Strategies</option>
                    <option value="ClaimTheDomain">Claim The Domain</option>
                    <option value="StakeholdersEngagement">Stakeholders Engagement</option>
                    <option value="FullProductOrProjectReview">Full Product Or Project Review</option>
                    <option value="DetailedMarketingRtmTesting">Detailed Marketing Testing</option>
                    <option value="DevelopmentCostReview">Development Cost Review</option>
                    <option value="BringTheMVPToFullScale">Bring The MVP To Full Scale</option>
                    <option value="ExecuteTheMarketingAndRouteToMarketStrategies">Execute Marketing Route</option>
                  </select>
                </div>

                {/* Start Date */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* End Date */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <DatePicker
                    selected={selectedDate1}
                    onChange={(date) => setSelectedDate1(date)}
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>


              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700 mb-2">Select Team Member</label>
                <Select
                  isMulti
                  options={users}
                  value={selectedUsers}
                  onChange={handleChangeUsers}
                  className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select Team Member"
                />
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Questions</span>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isCheckedU}
                    onChange={handleCheckboxChangeU}
                    className="h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Upload</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-900 px-8 py-2 text-white rounded-3xl disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />
                ) : (
                  <span>Create Task</span>
                )}
              </button>
            </div>
          </form>

          <Toaster position="top-right" />
        </div>
      </div>
      <div className="fixed bottom-0 right-0 z-[-100] m-0 p-0 w-[150px] h-[150px] bg-no-repeat"
        style={{
          backgroundImage: `url(${feedback})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          margin: '0',
          padding: '0',
        }}
      ></div>
    </div>
  );

};

export default CreateTask;
