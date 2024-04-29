import React, { useState } from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';
import CollaboratorModal from './component/collaboratorModal'
import { useNavigate } from 'react-router-dom';




function SectionManagement ()  {

    //first dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
  
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
  
    // Function to toggle dropdown visibility
    const toggleDropdown2 = () => {
      setIsDropdownOpen2(!isDropdownOpen2);
    };
  
    // Function to handle option selection
    const handleOptionSelect2 = (option) => {
      setSelectedOption2(option);
      setIsDropdownOpen2(false);
    };

    //fourth dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const [selectedOption3, setSelectedOption3] = useState('');
  
    // Function to toggle dropdown visibility
    const toggleDropdown3 = () => {
      setIsDropdownOpen3(!isDropdownOpen3);
    };
  
    // Function to handle option selection
    const handleOptionSelect3 = (option) => {
      setSelectedOption3(option);
      setIsDropdownOpen3(false);
    };


     //fifth dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const [selectedOption4, setSelectedOption4] = useState('');
  
    // Function to toggle dropdown visibility
    const toggleDropdown4 = () => {
      setIsDropdownOpen4(!isDropdownOpen4);
    };
  
    // Function to handle option selection
    const handleOptionSelect4 = (option) => {
      setSelectedOption4(option);
      setIsDropdownOpen4(false);
    };

     //six dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen5, setIsDropdownOpen5] = useState(false);
    const [selectedOption5, setSelectedOption5] = useState('');
  
    // Function to toggle dropdown visibility
    const toggleDropdown5 = () => {
      setIsDropdownOpen5(!isDropdownOpen5);
    };
  
    // Function to handle option selection
    const handleOptionSelect5 = (option) => {
      setSelectedOption5(option);
      setIsDropdownOpen5(false);
    };

     //seventh dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen6, setIsDropdownOpen6] = useState(false);
    const [selectedOption6, setSelectedOption6] = useState('');
  
    // Function to toggle dropdown visibility
    const toggleDropdown6 = () => {
      setIsDropdownOpen6(!isDropdownOpen6);
    };
  
    // Function to handle option selection
    const handleOptionSelect6 = (option) => {
      setSelectedOption6(option);
      setIsDropdownOpen6(false);
    };

     //eight dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen7, setIsDropdownOpen7] = useState(false);
    const [selectedOption7, setSelectedOption7] = useState('');
  
    // Function to toggle dropdown visibility
    const toggleDropdown7 = () => {
      setIsDropdownOpen7(!isDropdownOpen7);
    };
  
    // Function to handle option selection
    const handleOptionSelect7 = (option) => {
      setSelectedOption7(option);
      setIsDropdownOpen7(false);
    };

    const navigate = useNavigate()
    const [isOpen, setIsOpen]= useState(false);


    const onClickHandler = () => navigate(`/pageShare`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
      {/*  <img src={bci} className='bcA'></img>*/}
        <div className='centerC'>
            
            <div><p className='centerH1a'>Team Management</p>
            <p className='centerHp1a'>View, manage your memebers and send invites</p>
            <button className="btn btn-primary curveN">Save changes</button>
            <button className="btn btn-primary curveI">Discard changes</button></div>
            <div className='bottonInput'><input type="text" className='input2' placeholder="Search.."></input>
            {/*<button className="btn btn-primary curveX">Chat and message</button>*/}
            <button className="btn btn-primary curvej" onClick={()=>setIsOpen(true)}>Send Invite</button>
</div>
              <div className='container-team'>
                    <div class="flex-container boxH1">
                    <div className='listTa'>Name</div>
                    <div className='listU'>Team Members Permission</div>
                    <div className='remvo'>Revoke team member access</div>
                </div>
                <div class="flex-container boxH">
                    <div className='listT1'>Adunni Arike</div>
                   { /*<div type="button" data-toggle="dropdown" className='dropdown-toggle lst'>Change permission</div>*/}
                    <div className="dropdown3 lst">
                <div className={`select3 ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">{selectedOption|| "Change Permission"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu3 ${isDropdownOpen ? 'menu-open3' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Allow")} className='lili'>Allow</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Rejected")} className='lili1'>Rejected</li>
                </ul>
            </div>


                   {/* <div type="button" data-toggle="dropdown" className='dropdown-toggle txtp1'>Choose</div>*/}
          
                <div className="dropdown3 txtp1">
                <div className={`select3 ${isDropdownOpen4 ? 'select-clicked' : ''}`} onClick={toggleDropdown4}>
                    <span classname="selected">{selectedOption4|| "Choose"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu ${isDropdownOpen4 ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect4("NO")} className='lili'>NO</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect4("YES")} className='lili1'>YES</li>
                </ul>
            </div>
            </div> 


                <div class="flex-container boxH">
                    <div className='listT2'>Jeddiah Joshua</div>
                    {/*<div type="button" data-toggle="dropdown" className='dropdown-toggle lstS'>Change permission</div>*/}
                    <div className="dropdown3 lstS">
                <div className={`select3 ${isDropdownOpen1 ? 'select-clicked' : ''}`} onClick={toggleDropdown1}>
                    <span classname="selected">{selectedOption1|| "Change Permission"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu ${isDropdownOpen1 ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect1("Allow")} className='lili'>Allow</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("Rejected")} className='lili1'>Rejected</li>
                </ul>
            </div>


                    {/*<div type="button" data-toggle="dropdown" className='dropdown-toggle txtp2'>Choose</div>*/}
                    <div className="dropdown3 txtp1">
                <div className={`select3 ${isDropdownOpen5 ? 'select-clicked' : ''}`} onClick={toggleDropdown5}>
                    <span classname="selected">{selectedOption5|| "Choose"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu ${isDropdownOpen5 ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect5("NO")} className='lili'>NO</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect5("YES")} className='lili1'>YES</li>
                </ul>
            </div>

                </div>  



                <div class="flex-container boxH">
                    <div className='listT3'>Mark Joel</div>
                  {/*  <div type="button" data-toggle="dropdown" className='dropdown-toggle lisS'>Change permission</div>*/}
                    <div className="dropdown3 lisS">
                <div className={`select3 ${isDropdownOpen2 ? 'select-clicked' : ''}`} onClick={toggleDropdown2}>
                    <span classname="selected">{selectedOption2|| "Change Permission"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu ${isDropdownOpen2 ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect2("Allow")} className='lili'>Allow</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Rejected")} className='lili1'>Rejected</li>
                </ul>
            </div>


                  {/*  <div type="button" data-toggle="dropdown" className='dropdown-toggle txtp3'>Choose</div>*/}
                    <div className="dropdown3 txtp3">
                <div className={`select3 ${isDropdownOpen6 ? 'select-clicked' : ''}`} onClick={toggleDropdown6}>
                    <span classname="selected">{selectedOption6 || "Choose"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu ${isDropdownOpen6 ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect6("NO")} className='lili'>NO</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect6("YES")} className='lili1'>YES</li>
                </ul>
            </div>

                </div> 



                <div class="flex-container boxH">
                    <div className='listT4'>Titilope Seun</div>
                   {/* <div type="button" data-toggle="dropdown" className='dropdown-toggle lstS1'>Change Permission</div>*/}
                    <div className="dropdown3 lstS1">
                <div className={`select3 ${isDropdownOpen3 ? 'select-clicked' : ''}`} onClick={toggleDropdown3}>
                    <span classname="selected">{selectedOption3|| "Change Permission"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu ${isDropdownOpen3 ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect3("Allow")} className='lili'>Allow</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect3("Rejected")} className='lili1'>Rejected</li>
                </ul>
            </div>


                   {/* <div type="button" data-toggle="dropdown" className='dropdown-toggle txtp4'>Choose</div>*/}
                    <div className="dropdown3 txtp4">
                <div className={`select3 ${isDropdownOpen7 ? 'select-clicked' : ''}`} onClick={toggleDropdown7}>
                    <span classname="selected">{selectedOption7 || "Choose"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu ${isDropdownOpen7 ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect7("NO")} className='lili'>NO</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect7("YES")} className='lili1'>YES</li>
                </ul>
            </div>

                </div>



                <div><input type="checkbox" id="checkbox" name="checkbox"></input>
                <label for="checkbox" className='checkbox' type='button'>NDA - Standard Non Disclosure Agreements (if neccessary for a project)</label></div>
                               
        </div> 
        </div>
        <CollaboratorModal open={isOpen} onClose={() => setIsOpen(false)}>

    </CollaboratorModal>   
          
  </div>
  </div>
  </div>
  </>
    );
}

export default SectionManagement
