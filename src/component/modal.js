import React from  "react";
import ReactDOM from "react-dom";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

export default function Modal({ open, onClose}){

    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/loading`)
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <div className="modalOv"></div>
            <div className="modalSt">
             <p onClick={onClose} className="">X</p>   
            <div className="input-containerC">
                {/* <label htmlFor="projectName" className="creT">Create Project</label> */}
                <input
                    type="text"
                    id="projectName"
                    className="bottom-border-input"
                    placeholder="Project Name"
                />
                </div>
                
                <span className='iconSB' onClick={onClickHandler}><span className="iconh"><HiOutlineArrowSmallRight /></span></span>
                {/* <button onClick={onClose}>Close</button> */}

            </div>
        </>,
        document.getElementById('portal')
    )

}