import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
    const [message, setMessage] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:5000/ap8/v8/send-email', { userEmail, message });
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Error sending email. Please try again.');
        }
    };


    return (
        <>
            <h1 className='text-center text-2xl font-bold mt-5'>Contact Us if You Have any Issues</h1>
            <div className='max-w-sm mx-auto mt-10'>
                <div class="mb-5">
                    <label for="userEmail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input
                        type="email"
                        id="userEmail" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="your.email@example.com"
                        required
                    />
                </div>
                <textarea
                    id="message"
                    rows={8}
                    cols={12}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Your Message Here"
                />
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </div>
        </>
    );
}

export default Contact;
