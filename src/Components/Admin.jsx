import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:7000'); 
function Admin() {
    const [notifications, setNotifications] = useState([]);
    const handleNewUserLogin = (data) => {
        const newNotification = { message: data.message, timestamp: new Date() };
        setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    };
    useEffect(() => {
        socket.on('newUserLogin', handleNewUserLogin);

        // Clean up the subscription when the component unmounts
        return () => {
            socket.off('newUserLogin', handleNewUserLogin);
        };
    }, []);

    return (
        <div>
            <h1 className='text-3xl text-center mt-5'>Admin Panel</h1>
            <h1 className='ml-28 text-xl font-bold'>Notifications</h1>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        {notification.message} - {notification.timestamp.toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Admin;
