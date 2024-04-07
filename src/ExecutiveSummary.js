import React from 'react';
import bci from './images/bc.png';

function ExecutiveSummary ()  {
    return (
        <div className='col-md-10 align'>
        <div className='centerC'>
        <img src={bci} className='bcI'></img>

            <div className='text-center'>
                <p className='centerH'>Executive Summary</p>
                <p className='centerHp'>Make sure you answer all questions</p>
                <div class = "space"></div>
            </div>
            <p className='question'>Why do you want to start a Company?</p>
            <div className='container-textAs'>
                <textarea className='textAs'></textarea>
            </div>
            {/*<button className="btn btn-primary edit">Edit</button>
            <button className="btn btn-primary save">Save</button>*/}
            <p className= "save">Save</p>
            <p className= "edit">Edit</p>
            <div class = "break"></div>
        </div> 

        <button className="btn btn-primary curveNext">Next</button>
  </div>
    );
}

export default ExecutiveSummary