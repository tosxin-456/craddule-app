import React, { useState } from "react";
import "App.css";

function WhereDidYouHearModal({ isOpen, onClose }) {
    const [selectedOption, setSelectedOption] = useState("");
    const [otherText, setOtherText] = useState("");

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        setOtherText("");
    };

    const handleSubmit = () => {
        const response = selectedOption === "other" ? otherText : selectedOption;
        alert(`User response: ${response}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Where did you hear about us?</h2>
                <button className="close-button" onClick={onClose}>×</button>
                <form className="modal-body">
                    <label>
                        <input
                            type="radio"
                            value="Social Media"
                            checked={selectedOption === "Social Media"}
                            onChange={handleOptionChange}
                        />
                        Social Media
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Friend or Family"
                            checked={selectedOption === "Friend or Family"}
                            onChange={handleOptionChange}
                        />
                        Friend or Family
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="other"
                            checked={selectedOption === "other"}
                            onChange={handleOptionChange}
                        />
                        Other
                    </label>
                    {selectedOption === "other" && (
                        <input
                            type="text"
                            placeholder="Please specify"
                            value={otherText}
                            onChange={(e) => setOtherText(e.target.value)}
                            required
                        />
                    )}
                </form>
                <div className="modal-footer">
                    <button onClick={handleSubmit} disabled={!selectedOption || (selectedOption === "other" && !otherText)}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WhereDidYouHearModal;
