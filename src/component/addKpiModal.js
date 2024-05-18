import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";





export default function AddKpiModal ({open, onClose})  {
    const [isOpen, setIsOpen]= useState(false);

//first dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownRef = useRef(null);
  
    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    // Function to handle option selection
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setIsDropdownOpen(false);
    };

    //second dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState('');
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

     //third dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState('');
    const dropdownRef2 = useRef(null);
  
    // Function to toggle dropdown visibility
    const toggleDropdown2 = () => {
      setIsDropdownOpen2(!isDropdownOpen2);
    };
  
    // Function to handle option selection
    const handleOptionSelect2 = (option) => {
      setSelectedOption2(option);
      setIsDropdownOpen2(false);
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

 // Close dropdown when clicking outside of it 3
 useEffect(() => {
  const handleClickOutside = (event) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
          setIsDropdownOpen2(false);
      }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

    if(!open) return null

    return ReactDOM.createPortal (
        <>
        <div className='modalOv' >
           <div className='modalSt1'>
                <p className='closeIcon' onClick={onClose} type='button'>X</p>
              <p className='txt2'>Add KPI</p>
              <div className='whiteKpi'>
              <p className='details'>Details of the KPI</p>
             <div className='addKpiBox'>
                <div className='kpiname'><p>KPI Name</p><input className='inpt' type="text" placeholder="Search.."></input></div> 
                <div className='kpiname'><p>KPI Description</p><input className='inpt' type="text" placeholder="Search.."></input></div> 
                
                
                <div className='kpiname'><p>Category</p>
                {/* <button className="btn-primary dropdown-toggle bttn1" type="button" data-toggle="dropdown">KPI Category</button> */}
                <div ref={dropdownRef} className="dropdown3 bttn1">
                <div className={`select6 ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">{selectedOption|| "KPI Category"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu9 ${isDropdownOpen ? 'menu-open9' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("KPI Category 1")} className='kpiCat'>KPI Category 1</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("KPI Category 2")} className='kpiCat'>KPI Category 2</li>
                </ul>
            </div>
                </div> 







                <div className='kpiname'><p>Unit</p>
                {/* <button className="btn-primary dropdown-toggle bttn1" type="button" data-toggle="dropdown">Select</button> */}
                <div ref={dropdownRef1} className="dropdown3 bttn1">
                <div className={`select6 ${isDropdownOpen1 ? 'select-clicked' : ''}`} onClick={toggleDropdown1}>
                    <span classname="selected">{selectedOption1|| "Select"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu9 ${isDropdownOpen1 ? 'menu-open9' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect1("12%")} className='kpiCat'>12%</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("#12,000")} className='kpiCat'>#12,000</li>
                </ul>
            </div>
                </div> 




                <div className='kpiname'><p>Type of Graph</p>
                {/* <button className="btn-primary dropdown-toggle bttn1" type="button" data-toggle="dropdown">Select</button> */}
                <div ref={dropdownRef2} className="dropdown3 bttn1">
                <div className={`select6 ${isDropdownOpen2 ? 'select-clicked' : ''}`} onClick={toggleDropdown2}>
                    <span classname="selected">{selectedOption2|| "Select"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu9 ${isDropdownOpen2 ? 'menu-open9' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect2("Allow")} className='kpiCat'>Bar Chart</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Rejected")} className='kpiCat'>Pie Chart</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Rejected")} className='kpiCat'>Histogram</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Rejected")} className='kpiCat'>Radar Graph</li>
                </ul>
            </div>
                </div> 
                <div className='kpiname'><p>Add Axis(x)</p><input className='inpt' type="text" placeholder="Search.."></input></div> 
                <div className='kpiname'><p>Add Axis(y)</p><input className='inpt' type="text" placeholder="Search.."></input></div>  
                </div>         
             <button className="btn btn-primary kpib">Cancel</button>
              <button className="btn btn-primary kpibA">Save</button>
              </div>          
           </div>
        </div>
        </>,
        document.getElementById('portal')
     );
}
