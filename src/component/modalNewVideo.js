import React, { useState, useEffect }from  "react";
import ReactDOM from "react-dom";
import { jwtDecode } from "jwt-decode";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import YouTube from 'react-youtube';

export default function ModalVideo({ open, onClose, link, id, time }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        setShowButton(false);
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 55000); // 55 seconds
        return () => clearTimeout(timer);
    }, []);

    const handleProceed = async () => {
        console.log('Proceed action performed');
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/ourVideo/status/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
                body: JSON.stringify({
                    watchingStatus: 'watched'
                }),
            });

            if (response.status === 200) {
                onClose();
                console.log('Video status updated to "watched"');
            } else {
                const result = await response.json();
                console.error('Error:', result['error']);
                setErrorMessage('Failed to update video status');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('An error occurred while updating video status');
        }
    };

    const onPlayerReady = (event) => {
        event.target.playVideo();
    };

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            const interval = setInterval(() => {
                const currentTime = event.target.getCurrentTime();
                if (currentTime >= time) {
                    setShowButton(true);
                    clearInterval(interval);
                }
            }, 1000);
        }
    };

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
            mute: 0,
            controls: 0,
            rel: 0,
            showinfo: 0,
        },
    };

    if (!open) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modalOv"></div>
            <div className="modalSt mdN">
                {errorMessage && <p className="createER">{errorMessage}</p>}

                <YouTube videoId={link} opts={opts} onReady={onPlayerReady} onStateChange={onPlayerStateChange} />

                {showButton && (
                    <p onClick={handleProceed} className="closeMMM">Proceed</p>
                )}
            </div>
        </>,
        document.getElementById('portalH')
    );
}
