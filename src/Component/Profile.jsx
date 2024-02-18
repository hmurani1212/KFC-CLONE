import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import img from "./User.webp"
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
    const HandleDelete = () => {
        alert("I am deleting your Account Are you ready to delete account")
    }
    return (
        <div className='mt-36'>

            <div className='flex items-center justify-center'>
                <img className='h-20 w-20 border-dotted' src={img} alt='myImage' />
            </div>
            <p className='text-xl text-center '><span className='font-bold mx-2'>Name</span>: {data.name} </p>
            <p className='text-xl text-center'><span className='font-bold mx-2'>email</span>: {data.email}</p>
            <p className='text-sm text-center cursor-pointer' onClick={HandleDelete}>Delete Account</p>
            <Link to="/UpdateProfile">
                <button type="button" className="text-white mt-10 float-right mr-20 bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700  dark:border-gray-700">Update Profile</button>
            </Link>


        </div>
    )
}

export default Profile