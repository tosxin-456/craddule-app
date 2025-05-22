import { GoogleLogin } from '@react-oauth/google';
import { API_BASE_URL } from './config/apiConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorToast from './component/errorComponent';
import { FcGoogle } from 'react-icons/fc';

export default function SignInWithGoogle() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            const url = `${API_BASE_URL}/api/auth/google/login`;

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential: credentialResponse.credential }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || `Server error: ${res.status}`);
            }

            localStorage.setItem('access_token', data.token || data.data.access_token);
            setError('');
            navigate('/home');
        } catch (error) {
            console.error('❌ Login error:', error);
            setError(error.message || 'Login failed. Please try again.');
        }
    };

    const handleError = () => {
        console.log('❌ Google Login Failed');
        setError('Google login was cancelled or failed. Please try again.');
    };

    const clearError = () => setError('');

    return (
        <>
            <ErrorToast error={error} onClose={clearError} duration={6000} />

            <div className="flex justify-center w-fit m-auto mt-6 ">
                {/* Custom wrapper with specific styling */}
                <div className="w-fit max-w-md border-[1px] border-gray-300 google-login-wrapper">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        theme="outline"
                        shape="rectangular"
                        width="100%"
                        text="signin_with"
                        size="large"
                    />
                </div>
            </div>

            {/* Add this CSS - you can put it in your global CSS file or use styled-components */}
            <style jsx>{`
                .google-login-wrapper {
                    width: 100% !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                }
                
                .google-login-wrapper > div {
                    width: 100% !important;
                    display: flex !important;
                    justify-content: center !important;
                }
                
                .google-login-wrapper iframe {
                    width: 100% !important;
                    background-color: white !important;
                }
                
                /* Target the Google button directly */
                .google-login-wrapper [role="button"] {
                    width: 100% !important;
                    background-color: white !important;
                    border: none !important;
                    box-shadow: none !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                    gap: 8px !important;
                    padding: 12px !important;
                    cursor: pointer !important;
                }
                
                /* Remove hover effects */
                .google-login-wrapper [role="button"]:hover {
                    background-color: white !important;
                    box-shadow: none !important;
                    transform: none !important;
                    border: none !important;
                }
                
                /* Center the content inside the button */
                .google-login-wrapper [role="button"] > * {
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                    text-align: center !important;
                }
            `}</style>
        </>
    );
}