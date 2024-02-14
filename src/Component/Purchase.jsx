import React from 'react'
import { Link } from 'react-router-dom'

function Purchase() {
    return (
        <div className='text-center justify-center'>
            <h1 className='text-3xl mt-20 my-20'>Purchase</h1>
            <div className='flex justify-center'>
            <Link className='cursor-pointer mx-10' to='/OrderDetails1'>
                <p className='mx-10 text-3xl'>Payment Online</p>
            </Link>
            <Link className='cursor-pointer text-3xl ' to='/OrderDetails'>
                <p>Payment By Hand</p>
            </Link>
            </div>
        </div>
    )
}

export default Purchase