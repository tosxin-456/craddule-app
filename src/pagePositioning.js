import React from 'react';
import bci from './images/bc.png'; 
import success from './images/success.png'; 
import cloud from './images/cloud.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';





function PagePositioning ()  {
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/sectionPrototype`)
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
    <div class = "break"></div>
    <p className='question textBrand'>Brand Name</p>
    <div className='container-textAt'>
        <textarea className='textAs'></textarea>
    </div>

    <div class = "break"></div>
    
    <div>
    <p className="question textBrand">Brand Logo</p>
    <div>
        <div className='brandlogoA'><img src={cloud} className='brandlogo'></img></div>
       <button className="btn btn-primary buttonF">Upload you Brand Logo</button></div>
    </div>

    <div className = "break"></div>

    <div>
    <p className='question textBrand'>Brand Color</p>
    <div>
        <div className='createBrand'><p className='createBrandA'>Add colors</p></div>
       <button className="btn btn-primary buttonG">Add Color</button></div>
    </div>

    <div className = "break"></div>

    <div>
    <p className='question textBrand'>Writing Font/ Style</p>
    <div>
      <div className= 'createBrand'><p className='createBrandA'>Add Font</p></div>
        <button className="btn btn-primary buttonH">Add Font</button></div>
    </div>

    <div className = "break"></div>

    <p className='question textBrand'>Slogan</p>
    <div className='container-textAt textAA'>
        <textarea className='textAs'></textarea>
    </div>

    <div className = "break"></div>

    <p className='question textBrand'>Vission</p>
    <div className='container-textAt textAA'>
        <textarea className='textAs'></textarea>
    </div>

    <div className = "break"></div>

    <p className='question textBrand'>Mission</p>
    <div className='container-textAt textAA'>
        <textarea className='textAs'></textarea>
    </div>

    <div className = "break"></div>

    <p className='question textBrand'>Philosophy</p>
    <div className='container-textAt textAA'>
        <textarea className='textAs'></textarea>
    </div>

    <div className = "break"></div>

</div> 
<button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
   
  
</div>
</div>
</div>
  </>
    );
}

export default PagePositioning