import React from 'react';





function GiveFeedbackModal ()  {
    return (
        <div className='col-md-5' >
           <div className='uploadBoxh'>
                <p className='closeIcon'>X</p>
              <p className='txt2'>View Shared File</p>
              <hr></hr>
              <div className='shareBox'>
                <p className='share'>View Shared File</p>
                <p className= 'share1'>Anyone with the link <a href='' className='anchor2'>can view</a></p>
                <div className='shareBox1'>
                <p className='shareA'>Already have an account on craddule</p>
                <p className= 'share1'><a href='' className='anchor2'>Not on craddule</a></p></div>
           </div>
           </div>          
        </div>
     );
}

export default GiveFeedbackModal