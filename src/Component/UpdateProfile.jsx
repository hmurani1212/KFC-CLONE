import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function UpdateProfile() {
    const [data, setdata] = useState([])
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error1, setError] = useState("")
    const fetcUser = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:5000/ap2/v2/getUsers", {
                headers: {
                    'auth-token': localStorage.getItem("AuthToken")
                }
            });

            setdata(response.data);
            setname(response.data.name);
            setemail(response.data.email);
        } catch (error) {
            console.error(error);
        }
    }, []);
    useEffect(useCallback => () => {
        fetcUser()
    }, [fetcUser])
    const HandleForm = async (e) => {
        e.preventDefault()
        if (!name || !email || !password) {
            setError("Please fill are require feild");
            return;
        }
        try{
            const response = await axios.put("http://localhost:5000/ap2/v2/UpdateOneuser", { name, email, password }, {
                headers: {
                    'auth-token': localStorage.getItem("AuthToken")
                }
            })
            console.log(response);
            toast.success('successifuly Update your profile', {
                position: "top-right",
                autoClose: 3000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }catch(error){
            console.log(error);
            toast.error('faile to update your profile', {
                position: "top-right",
                autoClose: 3000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
       
    };
    console.log(data)
    return (
        <div className='max-w-sm mx-auto'>
            <div className="w-full mt-28 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={HandleForm}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                        Update your profile </h5>
                    <div className='text-red-600'>
                        {error1}
                    </div>
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Enter new Name
                        </label>
                        <input
                            type="text"
                            name="text"
                            id="text" value={name} onChange={(e) => setname(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter your name Here....."
                            required=""
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Enter new  Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email" value={email} onChange={(e) => setemail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@company.com"
                            required=""
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Enter new password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password" value={password} onChange={(e) => setpassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required=""
                        />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
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
                        <p
                            className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Lost Password?
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login to your account
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?
                        <Link to="/Login" className="text-blue-700 mx-1 hover:underline dark:text-blue-500">
                            Have an already Account
                        </Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default UpdateProfile