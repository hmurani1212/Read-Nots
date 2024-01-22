import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
function MyClass9() {
    const [comments, setcomments] = useState("");
    // const [userId, setuserId]= useState()
    const [data, setData] = useState([]);
    const [comment, setcomment] = useState([]);
    const [error, setError] = useState(null);
    const HandleSubmit = async (e) => {
        const getAuth = localStorage.getItem("AuthToken");
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/ap5/v5/comments", {
                comments,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': getAuth,
                }
            });
            const result = await response.data;
            console.log(result)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // setErrorMessage("User does not exist. Please check your input.");
                console.log(error)
            } else {
                // setErrorMessage("An error occurred. Please try again later.");
                console.log(error)
            }


        }
    }

    const HandleFavrout = async (notesId) => {
        const getAuth = localStorage.getItem("AuthToken");
        try {
            const response = await axios.post("http://localhost:5000/ap4/v4/addFavorite", {
                notesId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': getAuth,
                }
            });

            const result = await response.data;
            console.log(result);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error);
            } else {
                console.log(error);
            }
        }
    }
    const HandleLike = async (notesId) => {
        const getAuth = localStorage.getItem("AuthToken");
        try {
            const response = await axios.post(
                `http://localhost:5000/ap6/v6/like/${notesId}`, // Removed the double slash after 'v6'
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


    // 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/ap2/v2/getNotes');
                setData(response.data.product);
            } catch (error) {
                setError(error);
            }
        };
        const fetchComment = async () => {
            try {
                const response = await axios.get('http://localhost:5000/ap5/v5/getComments');
                setcomment(response.data.allComments);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
        fetchComment()
    }, []);
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }
    const handleViewPdf = (pdfUrl) => {
        window.open(pdfUrl, '_blank');
    };

    const handleDownloadPdf = (pdfUrl) => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'downloaded-file.pdf';
        // Trigger the click event programmatically
        link.click();
    };
    return (
        <div>
            <h1 className='md:text-3xl text-center font-bold my-5 text-green-500'>9th Class Notes</h1>
            {data.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-14">
                {data.map((element) => (
                    <div key={element._id} className='border-2 border-indigo-100 drop-shadow-2xl my-5 text-center justify-center mx-auto'>
                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            {/* <embed src={`http://localhost:5000/Uploads/${element.pdf}`} type="application/pdf" width="100%" height="100%" /> */}
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {element.title}

                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Download Notes Here
                            </p>
                            <button
                                className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => handleViewPdf(`http://localhost:5000/Uploads/${element.pdf}`)}
                            >
                                View PDF
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
                            </button>
                            <br />
                            <button
                                className="inline-flex mx-5 my-2 cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => handleDownloadPdf(`http://localhost:5000/Uploads/${element.pdf}`)}
                            >
                                Download Now
                            </button>

                            <br></br>
                            <div>
                                <ThumbUpOffAltIcon className="cursor-pointer" onClick={() => HandleLike(element._id)} />  {element.likes.length}
                                <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 cursor-pointer" onClick={() => HandleFavrout(element._id)}>
                                    Add to Favroute
                                </span>

                            </div>
                            <br />
                        </div>
                    </div>
                ))}
            </div> : <div role="progressbar" aria-valuetext="Loading" className="max-w-sm mx-auto text-center">
                <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            }
            <h1 className='md:text-2xl mt-20 ml-10 font-bold my-5 text-green-500'>Write Your Comment about us</h1>
            <form>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                        <label htmlFor="editor" className="sr-only">
                            Publish post
                        </label>
                        <textarea
                            id="editor"
                            rows={8} value={comments} onChange={(e) => setcomments(e.target.value)}
                            className="block border text-xl border-indigo-600 h-48 w-full px-0  text-gray-800 bg-white  dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Write an article..."
                            required=""
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="inline-flex md:ml-20 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    onClick={HandleSubmit}>
                    Publish Comment
                </button>
            </form>

            <h1 className='md:text-2xl mt-20 ml-10 font-bold my-5 text-green-500'>All Comments</h1>
            <hr></hr>
            {comment.length > 0 ? <div className='ml-20'>
                {
                    comment.map((element, index) => {
                        return (
                            <>
                                <h1 className='text-xl cursor-pointer font-bold underline my-1 ' key={element.index}>{element.user[0].name}</h1>
                                <h1>{element.comments}</h1>
                                <hr className="w-64 h-1 my-3 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                            </>

                        )
                    })
                }
            </div> : <h1 className='md:text-2xl text-center ml-10 font-bold my-5 text-red-500'>No Comments</h1>}
        </div>
    );
}

export default MyClass9;
