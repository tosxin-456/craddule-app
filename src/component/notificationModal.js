import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from '../utils/startUtils';
import { API_BASE_URL } from '../config/apiConfig';

export default function NotificationModal({ open, onClose, clickPosition }) {
    const navigate = useNavigate();
    const projectId = localStorage.getItem('nProject');
    const { access_token, userId } = getUserIdFromToken();
    const [notifications, setNotifications] = useState([]);
    const modalRef = useRef(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('access_token');
            try {
                const response = await fetch(`${API_BASE_URL}/api/notification/project/${projectId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const data = await response.json();
                    const unreadNotifications = data.data.filter(notification => !notification.read);
                    setNotifications(unreadNotifications);
                } else {
                    console.log('Error fetching notifications:', response.status);
                }
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchNotifications();
    }, [projectId]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onClose]);

    const formatTimeSent = (timeSent) => {
        const date = new Date(timeSent);
        const today = new Date();

        const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        return isToday
            ? 'Today'
            : date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
    };

    if (!open) return null;

    return (
        <div
            ref={modalRef}
            className="absolute top-[5] right-0 w-[350px] bg-white h-[350px] border shadow-lg rounded-lg"
        >
            {/* Close Button */}
            <button
                className="absolute z-20 top-2 right-2 text-white hover:text-gray-700"
                aria-label="Close"
                onClick={onClose}
            >
                X
            </button>
            {/* Modal Header */}
            <div className="text-center bg-[#193FAE] text-white rounded-t-lg py-2">
                <p className="text-lg font-semibold">Notifications</p>
            </div>
            {/* Modal Content */}
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="p-3 bg-gray-100 rounded-md shadow-sm border border-gray-200"
                        >
                            <h3 className="text-base font-bold text-gray-700">
                                {notification.notificationHead}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {notification.notification}
                            </p>
                            <span className="text-xs text-gray-500">
                                {formatTimeSent(notification.timeSent)}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm text-center">No new notifications</p>
                )}
            </div>
        </div>
    );
}
