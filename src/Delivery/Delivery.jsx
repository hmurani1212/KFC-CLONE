import axios from 'axios';
import React, { useState, useEffect } from 'react'

function Delivery() {

  const [order, setorder] = useState([]);
  const fetchdata = async () => {
    try {
      const resonse = await axios.get("http://localhost:5000/api/v1/UserOrder", {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("AuthToken")
        }
      });
      setorder(resonse.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchdata();
  }, [])
  return (
    <div className='mt-28'>
      {order.length > 0    ? <div>
      {order.map((element, index) => {
        return (
          <div>
            <div className="w-full my-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h1 className='text-black'>{index}</h1>
              <h1 className='text-black text-2xl text-center'>Your Pending orders</h1>
              <div className='flex text-black'>
                <h1 className='text-bold mx-9 font-bold'>Food Name</h1>
                <h1 className='text-black'>{element.FoodDetail}</h1>
              </div>
              <div className='flex text-black'>
                <h1 className='text-bold mx-9 font-bold'>Price</h1>
                <h1 className='text-black'>{element.price}</h1>
              </div>

            </div>
          </div>
        )
      })}
      </div>:   <h1 className='text-3xl mt-20 text-center'>You Don't have any Order yet</h1>   } 
     
   
     
    </div>
  )
}

export default Delivery