import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Profile() {
    const [data, setdata] = useState([]);
    const fetchdata = async () => {
        const getAuth = localStorage.getItem("AuthToken")
        try {
            const response = await axios.get("http://localhost:5000/ap2/v2/UserDetail", {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': getAuth
                }
            });
            setdata(response.data.user)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchdata();
    }, [])
    return (
        <div className='mt-20'>
            <h1 className='text-3xl text-center'> Your profile</h1>
            <h1 className='text-3xl text-center mt-20'> {data.name}----------- {data.email}</h1>
            <Link to="/UpdateProfile">
                <button type="button" className="text-white mt-10 float-right mr-20 bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700  dark:border-gray-700">Update Profile</button>
            </Link>


        </div>
    )
}

export default Profile