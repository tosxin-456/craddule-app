import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function QuestionBus() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [userId, setUserId] = useState('');
    const projectId = '6675678ac8768de3d516dbc1';
    const socket = useRef(null);

    useEffect(() => {
        // Establish socket connection
        socket.current = io('http://localhost:3001');

        // Handle incoming messages
        socket.current.on('message', ({ projectId, content, userId, firstName, lastName,createdAt }) => {
            setMessages(prevMessages => [...prevMessages, { projectId, content, userId, firstName, lastName,createdAt }]);
            
        });

        // Request initial chat history
        socket.current.emit('loadChat', projectId);

        socket.current.on('initialChat', (initialMessages) => {
            console.log(initialMessages);
            setMessages(initialMessages);
        });

        return () => {
            socket.current.off('message');
            socket.current.disconnect();
        };
    }, [projectId]);

    const handleSend = () => {
        if (messageInput.trim() && userId.trim()) {
            const message = {
                projectId,
                content: messageInput,
                userId
            };
            socket.current.emit('message', message);
            setMessageInput('');
        }
    };

    return (
        <div id="chat-container">
            <div id="messages">
                {messages.map((message, index) => (
                    <div key={index}>
                        {message.userId.first_name} {message.userId.last_name}: {message.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                id="user-id"
                placeholder="User ID"
                value={userId}
                onChange={e => setUserId(e.target.value)}
            />
            <input
                type="text"
                id="message-input"
                placeholder="Type a message"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
            />
            <button id="send-button" onClick={handleSend}>
                Send
            </button>
        </div>
    );
}

export default QuestionBus;
