import React from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';




function SendFile ()  {
    return (
        <div className='col-md-5' >
           <div className='uploadSendBox'>
                <p className='closeIcon'>X</p>
              <p className='txt2'>View Shared File</p>
              <hr></hr>
              <div className='sendBox'>
                <p className='share'>View Shared File</p>
                <p className= 'share1'>Anyone with the link <a href='' className='anchor2'>can view</a></p>
                <input type="text" className='input3' placeholder="Search.."></input>
                <p className='copy'><a href='' className='anchor2'>copy me</a></p>
               <div className='text-center'>
                <div className='container-textAl'>
                <textarea className='textAb'></textarea>
            </div>                
            <button className="btn btn-primary curveSb">Share File</button>
           </div>
           </div>
           </div>          
        </div>
     );
}

export default SendFile