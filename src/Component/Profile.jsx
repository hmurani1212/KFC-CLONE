import axios from 'axios';
import React, { useState, useEffect } from 'react'

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
        </div>
    )
}

export default Profile