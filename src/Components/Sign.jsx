import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function Sign() {
    const navigate = useNavigate()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [phone, setphone] = useState("")
    const [Username, setUsername] = useState("")
    const [Cpassword, setCpassword] = useState("")
    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/vi/Create", {
                email,
                name,
                phone,
                password,
                Username,
                Cpassword
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.data;
            console.log(result)
            navigate("/Login")
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
    return (
        <div>
            <form className="max-w-sm mx-auto my-10" onSubmit={HandleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Enter Your name
                    </label>
                    <input
                        type="name"
                        id="name" value={name} onChange={(e) => (setname(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your name"
                        required=""
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input value={email} onChange={(e) => (setemail(e.target.value))}
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        required=""
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="number"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Phone Number
                    </label>
                    <input value={phone} onChange={(e) => (setphone(e.target.value))}
                        type="number"
                        id="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        User Name
                    </label>
                    <input value={Username} onChange={(e) => (setUsername(e.target.value))}
                        type="text"
                        id="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input value={password} onChange={(e) => (setpassword(e.target.value))}
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Confirm Password
                    </label>
                    <input value={Cpassword} onChange={(e) => (setCpassword(e.target.value))}
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            required=""
                        />
                    </div>
                    <label
                        htmlFor="remember"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Remember me
                    </label>
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
                <Link to="/Login">
                    <p className='float-right mt-3 hover:underline cursor-pointer font-2xl'>Have Already Account</p>
                </Link>
            </form>

        </div>
    )
}

export default Sign