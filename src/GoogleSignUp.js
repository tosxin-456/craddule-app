import { GoogleLogin } from '@react-oauth/google';
import { API_BASE_URL } from './config/apiConfig';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorToast from './component/errorComponent';

export default function SignWithGoogle() {
    const [referralCode, setReferralCode] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        const pathname = location.pathname.split('/');
        const lastPath = pathname[pathname.length - 1];

        if (lastPath === 'signup') {
            setReferralCode('');
        } else {
            setReferralCode(lastPath);
        }
    }, [location]);

    const handleSuccess = async (credentialResponse) => {
        console.log("entered here");
        try {
            const url = referralCode
                ? `${API_BASE_URL}/api/user/auth/google/${referralCode}`
                : `${API_BASE_URL}/api/user/auth/google`;

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential: credentialResponse.credential }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                // This will display server errors from your backend
                throw new Error(errorData.message || `Server error: ${res.status}`);
            }

            const data = await res.json();
            localStorage.setItem('access_token', data.data.access_token);
            console.log('✅ Logged in:', data);
            setError(''); // clear previous errors

            // You might want to redirect or update UI state here
            // Example: navigate('/dashboard');
            navigate('/home');

        } catch (error) {
            console.error('❌ Login error:', error);
            // This will display both network errors and server errors
            setError(error.message || 'Login failed. Please try again.');
        }
    };

    const handleError = () => {
        console.log('❌ Google Login Failed');
        setError('Google login was cancelled or failed. Please try again.');
    };

    const clearError = () => {
        setError('');
    };

    return (
        <>
            {/* Error Toast - positioned at top of screen */}
            <ErrorToast
                error={error}
                onClose={clearError}
                duration={6000} // Show for 6 seconds
            />

            <div className="flex justify-center w-fit m-auto mt-6">
                {/* Custom wrapper with specific styling */}
                <div className="w-fit max-w-md border-[1px] border-gray-300 google-login-wrapper">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        theme="outline"
                        shape="rectangular"
                        width="100%"
                        text="signup_with"
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