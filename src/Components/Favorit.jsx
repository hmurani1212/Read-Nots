import { useEffect, useState } from 'react'
import axios from 'axios';
function Favorit() {
    const [favroute, setfavroute] = useState([])
    useEffect(() => {
        const HandleSubmit = async () => {
            const getAuth = localStorage.getItem("AuthToken");
            try {
                const response = await axios.get("http://localhost:5000/ap4/v4/getfavourit",
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': getAuth,
                        }
                    });
                const result = await response.data.allfavroute;
                setfavroute(result)
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
        HandleSubmit()
    })
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
        <>
            <h1 className='md:text-3xl text-center font-bold my-5 text-green-500'>You Favoute Notes</h1>
            <div className='max-w-sm mx-auto'>
                {favroute.map((element) => (
                    element.favorites.map((favorite) => (
                        <p
                            key={favorite._id}
                            href="#"
                            className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Title: {favorite.title}
                            </h5>
                            <p className="text-gray-700 dark:text-gray-400">
                                Description: {favorite.description}
                            </p>
                            <button  onClick={() => handleDownloadPdf(`http://localhost:5000/Uploads/${favorite.pdf}`)}>Download</button>
                            <button className='mx-5' onClick={() => handleViewPdf(`http://localhost:5000/Uploads/${favorite.pdf}`)}>View</button>
                        </p>
                    ))
                ))}
            </div>
        </>


    )
}

export default Favorit