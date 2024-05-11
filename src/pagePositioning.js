import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png'; 
import success from './images/success.png'; 
import cloud from './images/cloud.png';
import Header from './component/header';
import { SketchPicker } from 'react-color'; // Importing SketchPicker from react-color
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';





function PagePositioning ()  {
    const navigate = useNavigate()

     const onClickHandler = () => navigate(``)
     const [color, setColor] = useState('#ffffff'); // Initial color
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  const handleButtonClick = () => {
    if (showPicker) {
      // If color picker is visible, hide it
      setShowPicker(false);
      // Handle adding color here when the color picker is hidden
      console.log('Selected color:', color);
      // Update the input value with the selected color
      const input = document.getElementById('colorInput');
      if (input) {
        input.value = color;
      }
    } else {
      // If color picker is not visible, show it
      setShowPicker(true);
    }
  };


    return (
        <>
 <div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        <div className='col-md-9'>

<img src={bci} className='bcA'></img>
     
<div className='centerC'>

    <div className='text-center'>
        <p className='centerH'>Positioning and Messaging</p>
        <p className='centerHp'>Here we create a brand</p>
    </div>

    <div className = "titleBrand">
    <p className='question textBrand'>Brand Name</p>
    <div className=''>
        <input className='longInput'
        placeholder='Enter Brand Name'
        />
        </div>
        </div>


    <div className = "titleBrand3">
    <p className="headBrand">Brand Logo</p>
    <div className=''>
        <div className='brandlogoA'>
        <img src={cloud} className='brandlogo'></img>
        </div>
        <button className="btn btn-primary buttonF">Upload your Brand Logo</button>
       </div>
    </div>


    <div className = "color-picker-container">
    <p className='headBrand'>Brand Color</p>
    <div className='divBrand'>
        {/* <input className='colorInput'
        placeholder='Add colors'
        /> */}
        <input
          id="colorInput"
          className='colorInput'
          placeholder='Add colors'
          readOnly // Make the input field read-only
        />
          <button
          className="btn btn-primary forColor"
          onClick={handleButtonClick} // Toggle color picker visibility or handle adding color
        >
          {showPicker ? 'Add Color' : 'Select Color'}
        </button>
      </div>
      {showPicker && (
        <div className="pickerStlyes"> 
        <SketchPicker
          color={color}
          onChange={handleChange}
          presetColors={[]}
          disableAlpha
        />
        </div>
      )}
       </div>


    <div className = "color-picker-container">
    <p className='headBrand'>Writing Font/ Style</p>
    <div className='divBrand'>
        <input className='colorInput'
        placeholder='Add fonts'
        />
        <button className="btn btn-primary forColor">Add Font</button></div>
    </div>


    <div className = "titleBrand2">
    <p className='headBrand'>Sologan</p>
    <div className=''>
        <input className='longInput'
        placeholder='Sologan'
        />
        </div>
        </div>


        <div className = "titleBrand2">
    <p className='headBrand'>Vision</p>
    <div className=''>
        <input className='longInput'
        placeholder='Vision'
        />
        </div>
        </div>


        <div className = "titleBrand2">
    <p className='headBrand'>Mission</p>
    <div className=''>
        <input className='longInput'
        placeholder='Mission'
        />
        </div>
        </div>


        <div className = "titleBrand2">
    <p className='headBrand'>Philosophy</p>
    <div className=''>
        <input className='longInput'
        placeholder='Philosophy'
        />
        </div>
        </div>


</div> 
<button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
   
  
</div>
</div>
</div>
  </>
    );
}

export default PagePositioning