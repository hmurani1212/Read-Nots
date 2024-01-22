import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
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
    console.log(profile)
    return (
        <>
            <Link to="/Favorit">
                <button
                    type="button"
                    className="py-2.5 mt-20 mr-20 float-right px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-blue-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    Add Your Favorit Notes
                </button>
            </Link>
            <div className="max-w-sm mx-auto my-5">
                <h1 className="text-3xl my-10">Customize Your Profile</h1>


                <img
                    className="rounded-full w-16 h-16 border-2 border-indigo-600 ml-28"
                    src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                    alt="imagedescription"
                />
                <h1 className="text-xl ml-24">{profile?.user?.name}</h1>
            </div>
            <h1 className="text-3xl my-10 text-center mr-16">Your Detail</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {profile?.user?.email}
                            </th>
                        </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Password
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {profile?.user?.password}
                            </th>
                        </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {profile?.user?.phone}
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <button type="button" className="text-white float-right mr-40 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>

            </div>

        </>
    )

}

export default Profile;