import React, { useState, useEffect } from 'react';
import '../randomModal.css';
import { handleClick } from '../utils/startUtils';

const ReferralModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasDismissed, setHasDismissed] = useState(false);
    const [clickedYes, setClickedYes] = useState(false);


    const showModalAfterRandomInterval = () => {
        const randomTime = Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;
        setTimeout(() => {
            setIsVisible(true);
        }, randomTime);
    };

    const showModalAfterFiveHours = () => {
        const fiveHours = 5 * 60 * 60 * 1000;
        setTimeout(() => {
            setHasDismissed(false);
            setIsVisible(true);
        }, fiveHours);
    };


    const showModalAfterLongTime = () => {
        const oneDay = 24 * 60 * 60 * 1000; 
        setTimeout(() => {
            setClickedYes(false); 
            setIsVisible(true);
        }, oneDay);
    };

    useEffect(() => {
        if (!hasDismissed && !clickedYes) {
            setIsVisible(true); 
        }

        const interval = setInterval(() => {
            if (!isVisible && !hasDismissed && !clickedYes) {
                showModalAfterRandomInterval();
            }
        }, 30000); 

        return () => clearInterval(interval); 
    }, [isVisible, hasDismissed, clickedYes]);

    const handleYesClick = () => {
        handleClick('/referral')
        alert("Thank you for the referral!");
        setIsVisible(false);
        setClickedYes(true); 
        showModalAfterLongTime(); 
    };

    const handleNoClick = () => {
        setIsVisible(false);
        setHasDismissed(true); 
        showModalAfterFiveHours(); 
    };

    return (
        <>
            {isVisible && (
                <div className="random-overlay">
                    <div className="random-content">
                        <div className='ml-auto w-fit'>
                        <button onClick={handleNoClick}>X</button>

                        </div>
                        <h2>Refer a Friend!</h2>
                        <p>Would you like to refer someone to our service?</p>
                        <div className="modal-buttons">
                            <button className='random-modal' onClick={handleYesClick}>Yes</button>
                            <button className='random-modal' onClick={handleNoClick}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReferralModal;
