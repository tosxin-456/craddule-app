import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateTellUs, getUserIdFromToken } from '../utils/startUtils';

export default function GiveFeedbackModal({ open, onClose, clickPosition }) {
    const navigate = useNavigate();
    const projectId = localStorage.getItem('nProject');
    const { access_token, userId } = getUserIdFromToken();
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const modalRef = useRef(null);

    // Handle click outside to close modal
    useEffect(() => {
        // Event listener to detect click outside modal
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        // Add event listener when modal is open
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Clean up the event listener when modal is closed
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onClose]);

    const handleFeedbackSubmit = async () => {
        const feedbackData = {
            projectId,
            userId,
            tellUs: feedback,
        };

        await CreateTellUs(
            feedbackData,
            (response) => {
                console.log('Feedback Submitted:', response);
                setFeedback(''); // Clear feedback input
                setError(null);  // Clear any previous error
                onClose();       // Close modal after successful submission
            },
            setError,
            setLoading
        );
    };

    const onClickHandler = () => navigate(`/viewDocument`);

    if (!open) return null;

    return (
        <div
            ref={modalRef}
            className="absolute top-[5] w-[350px] bg-white"
        >
            {/* Close Button */}
            <button
                className="absolute z-20 top-2 right-2 text-white hover:text-gray-700"
                aria-label="Close"
                onClick={() => {
                    setFeedback(''); // Clear feedback input
                    setError(null);  // Clear any previous error
                    onClose();
                }}
            >
                X
            </button>
            {/* Modal Header */}
            <div className="text-center bg-[#193FAE] text-white rounded-t-lg py-4">
                <p className="text-lg font-semibold">Tell us more</p>
                <p className="text-sm">Let us know what you think</p>
            </div>
            {/* Modal Content */}
            <div className="p-6">
                <textarea
                    className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#193FAE]"
                    placeholder="Write your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="mt-4">
                    <button
                        className="w-full bg-[#193FAE] text-white py-2 rounded-lg hover:bg-blue-700"
                        type="button"
                        onClick={handleFeedbackSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Share Feedback'}
                    </button>
                </div>
            </div>
        </div>
    );
}
