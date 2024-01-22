import React, { useState,useEffect } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import first from "./first.jpg";
import second from "./second.jpg"
import third from "./third.png"
import axios from 'axios';
function Home() {
    //
    const [btntext, setbtn] = useState("Subscribe")
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const getAuth = localStorage.getItem("AuthToken");
        const getData1 = async () => {
            try {
                const result = await fetch("http://localhost:5000/api/vi/UserDetail", {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': getAuth,
                    }
                });

                const response = await result.json();
                setProfile(response);
            } catch (error) {
                console.error(error);
            }
        };

        getData1();

    }, []);
    const HandleLike = async (notesId) => {
        const getAuth = localStorage.getItem("AuthToken");
        setbtn("Subscribed")
        try {
            const response = await axios.post(
                ` http://localhost:5000/ap7/v7/subscribe`, // Removed the double slash after 'v6'
                {}, // Empty request payload data here (if any)
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': getAuth,
                    }
                }
            );

            const result = await response.data;
            console.log(result);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized: Redirect to login page");
                // Handle unauthorized error here (e.g., redirect to login page)
            } else if (error.response && error.response.status === 400) {
                console.log("Bad Request:", error.response.data);
            } else {
                console.log("Error:", error.message);
            }
        }
    };
    const handleType = (count: number) => {
        // access word count number
    }
    const handleDone = () => {
        console.log(`Done after 5 loops!`)
    }
    return (
        <div>
            <div className='float-right mr-10'>
                <button
                    type="button"
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={HandleLike}>
                    {btntext} {profile?.user?.subscribers.length}
                </button>

            </div>
            <form className='my-3 max-w-sm mx-auto'>
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Mockups, Logos..."
                        required=""
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-2 gap-2 mr-10 ml-10">
                <div>
                    <h1 className='text-sm md:text-2xl font-bold' style={{ margin: 'auto 0', fontWeight: 'normal' }}>
                        Welcome to
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                            {/* Style will be inherited from the parent element */}
                            <Typewriter
                                words={[' NoteswithHassan', ' NoteswithHassan', ' NoteswithHassan', ' NoteswithHassan!']}
                                loop={5}
                                cursor
                                cursorStyle='_'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                                onLoopDone={handleDone}
                                onType={handleType}
                            />
                        </span>
                    </h1>
                    <h1 className='text-sm md:text-xl font-bold' style={{ margin: 'auto 0', marginTop: "10px", fontWeight: 'normal' }}>
                        Here is a
                        <span style={{ color: 'green', fontWeight: 'bold' }}>
                            {/* Style will be inherited from the parent element */}
                            <Typewriter
                                words={[' React js Developer', ' Node js Developer', ' ', ' MongoDb Developer!']}
                                loop={5}
                                cursor
                                cursorStyle='_'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                                onLoopDone={handleDone}
                                onType={handleType}
                            />
                        </span>
                    </h1>
                    <p className='mt-5 font-bold  md:font-xl font-mono'>Confused on which course to take? I have got you covered. Browse courses and find out the best course for you. Its free! Code With Harry is my attempt to teach basics and those coding techniques to people in short time which took me ages to learn.</p>
                    <button type="button" className="text-white mt-10 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Free Courses</button>
                    <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Paid Courses</button>

                </div>
                <div>
                    <img
                        className="h-auto max-w-full rounded-lg"
                        src={first}
                        alt=""
                    />
                </div>
            </div>
            <h1 className='text-2xl md:text-center my-10 font-bold'>Recommended Courses</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mr-10 ml-10">
                <div className='shadow-2xl'>
                    <img
                        className="h-auto max-w-full rounded-lg"
                        src={second}
                        alt=""
                    />
                    <p style={{ fontSize: "13px" }} className='text-gray-600 font-bold ml-5'>FREE COURSE</p>
                    <h1 className="md:text-xl ml-3 font-bold">Python Tutorials - 100 Days of Code</h1>
                    <p className='ml-3 my-1'>Python is one of the most demanded programming languages in the job market. Surprisingly, it is equally easy to learn and master Python. Let's commit our 100 days of code to python!</p>
                    <button type="button" className="focus:outline-none mt-10 rounded-3xl bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 text-black dark:focus:ring-yellow-900">
                        Start Learning
                    </button>

                </div>
                <div className='shadow-2xl'>
                    <img
                        className="h-auto max-w-full rounded-lg"
                        src={third}
                        alt=""
                    />
                    <p style={{ fontSize: "13px" }} className='text-gray-600 font-bold ml-5'>FREE COURSE</p>
                    <h1 className="md:text-xl ml-3 font-bold">Python Tutorials - 100 Days of Code</h1>
                    <p className='ml-3 my-1'>Python is one of the most demanded programming languages in the job market. Surprisingly, it is equally easy to learn and master Python. Let's commit our 100 days of code to python!</p>
                    <button type="button" className="focus:outline-none mt-10 rounded-3xl bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 text-black dark:focus:ring-yellow-900">
                        Start Learning
                    </button>
                </div>
                <div className='shadow-2xl'>
                    <img
                        className="h-auto max-w-full rounded-lg"
                        src={third}
                        alt=""
                    />
                    <p style={{ fontSize: "13px" }} className='text-gray-600 font-bold ml-5'>FREE COURSE</p>
                    <h1 className="md:text-xl ml-3 font-bold">Python Tutorials - 100 Days of Code</h1>
                    <p className='ml-3 my-1'>Python is one of the most demanded programming languages in the job market. Surprisingly, it is equally easy to learn and master Python. Let's commit our 100 days of code to python!</p>
                    <button type="button" className="focus:outline-none mt-10 rounded-3xl bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 text-black dark:focus:ring-yellow-900">
                        Start Learning
                    </button>
                </div>
            </div>
            <h1 className='text-2xl md:text-center my-10 font-bold'>Testimonials</h1>
        </div>
    )
}

export default Home