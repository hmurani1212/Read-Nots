import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom'
function Notes() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/ap2/v2/getNotes');
                setData(response.data.product);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }
    console.log(data)
    return (
        <div>
            <h1 className='md:text-3xl text-center font-bold my-5 text-green-500'>Download Notes by Ahmed Kutub Khana</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-14">
                {/* {
                    data.map((element) => {
                        return (
                            <Link to={"/ProductList/" + element._id}>
                                <div className='border-2 border-indigo-100 drop-shadow-2xl my-5 text-center justify-center mx-auto'>
                                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <embed src={`http://localhost:5000/Uploads/${element.pdf}`} type="application/pdf"
                                            width="100%" height="100%" />
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {element.title}
                                            </h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            Download Notes Here
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            View pdf
                                            <svg
                                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 14 10"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                                />
                                            </svg>
                                        </a>
                                        <br />
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
                <div> */}
                <div>
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link to="/MyClass9">
                            <img className="rounded-t-lg w-80 h-52 mx-auto" src="https://play-lh.googleusercontent.com/FOqBKYAIEjFtUYA86rrF_vW7q1FKi3PUdccfPMIwMap8_cfaJ0ozTMk5mG2gmDuTKh32" alt="" />
                        </Link>
                        <div className="p-5">
                            <Link to="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Class 9th Notes Available</h5>
                            </Link>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <Link to="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                View
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                </div>
                <div>


                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link to="#">
                            <img className="rounded-t-lg w-80 h-48 mx-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVFeag7_qG5k_zi--RKQDVs-dq3Z-slL5mJA&usqp=CAU" alt="" />
                        </Link>
                        <div className="p-5">
                            <Link to="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            </Link>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <Link to="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                View
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                </div>
                <div>


                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link to="#">
                            <img className="rounded-t-lg w-80 h-52 mx-auto" src="https://play-lh.googleusercontent.com/t2BOGp5ALUFhW1ih2M-CDA357ijjhwHD9xNbnhE90lxXojM83IZXPD3eGjG9NgSKhvq1" alt="" />
                        </Link>
                        <div className="p-5">
                            <Link to="/">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            </Link>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <Link to="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                View
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                </div>
                <div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center  mx-auto">
                        <Link to="#">
                            <img className="rounded-t-lg w-80 h-48 mx-auto" src="https://play-lh.googleusercontent.com/QHIBjm7S9qjs0xNf2KmGnHH_2hWot5y8LPmpYYXBo4YISKHMEq4gGEI6Knm13jM_9Tlo" alt="" />
                        </Link>
                        <div className="p-5">
                            <Link to="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            </Link>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <Link to="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                View
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Notes