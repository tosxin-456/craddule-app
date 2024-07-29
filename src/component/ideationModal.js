import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import '../App.css'; // Import the CSS file for styling and animations
export default function IdeationModal({ open, onClose}){

  const [showFirstText, setShowFirstText] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);

  useEffect(() => {
    setShowFirstText(true);

    const timer1 = setTimeout(() => {
      setShowSecondText(true);
    }, 3000); // Delay for the second text to appear

    const timer2 = setTimeout(() => {
      //onClose();
    }, 7000); // Dismiss the popup after 7 seconds

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onClose]);

  if(!open) return null
  return ReactDOM.createPortal(
    <>
    <div className="popup-container">
      <div className={`text-container ${showFirstText ? 'fade-in' : ''} ${showSecondText ? 'move-up' : ''}`}>
        <h1>KPI</h1>
      </div>
      {showSecondText && (
        <div className="text-container fade-in">
          <h1>Ideation</h1>
          <p>
            When we begin, we begin with one step, but is that not the point?
            A journey of a thousand miles starts with one. Welcome to your journey.
          </p>
        </div>
      )}
    </div>
    </>,
    document.getElementById('portalH')
  );
};


