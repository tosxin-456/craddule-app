import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';




export default function GiveFeedbackModal({ open, onClose }) {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/viewDocument`)
    if (!open) return null
    return (
        <>

            <div className='modalOv'>
                <div className='modalSt'>
                    <button
                        className="close-button"
                        aria-label="Close"
                        onClick={onClose}
                    >
                       X
                    </button>
                    <div className='text-center bg-[#193FAE] text-white '>
                        <p className='centerGive'>Tell us more</p>
                        <p className='centerHgive'>let us know what you think</p>
                    </div>
                    <div className='container-textBs'>
                        <textarea className='textBk'></textarea>
                        <div className='giveButton'>
                            <p className='TitleGive bg-[#193FAE]' type='button' onClick={onClose}>Share Feedback</p>
                        </div>

                    </div>



                </div>
            </div>
        </>
    );
}
