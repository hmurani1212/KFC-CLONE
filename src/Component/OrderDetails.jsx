import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart, removeSingleIteams, emptycartIteam } from '../redux/features/cartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
function OrderDetails() {
  const { carts } = useSelector((state) => state.allCart);
  console.log("Card Data", carts)
  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);
  const dispatch = useDispatch();
  const [userLocation, setUserLocation] = useState(null);
  console.log(totalprice, totalquantity, userLocation);

  // add to cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e))
  }

  // remove to cart
  const handleDecrement = (e) => {
    dispatch(removeToCart(e));
    alert("Item Remove From Your Cart")
  }

  // remove single item 
  const handleSingleDecrement = (e) => {
    dispatch(removeSingleIteams(e))
  }

  // empty cart
  const emptycart = () => {
    dispatch(emptycartIteam())
    alert("Your Cart is Empty")

  }
  // count total price
  useEffect(() => {
    const total = () => {
      let totalprice = 0;
      carts.map((ele) => {
        totalprice = ele.price * ele.qnty + totalprice;
        return null; // Add this line to satisfy array-callback-return
      });
      setPrice(totalprice);
    };

    total();
  }, [carts, setPrice]);
  // count total quantity
  useEffect(() => {
    const countquantity = () => {
      let totalquantity = 0;
      carts.map((ele) => {
        totalquantity = ele.qnty + totalquantity;
        return null; // Add this line to satisfy array-callback-return
      });
      setTotalQuantity(totalquantity);
    };

    countquantity();
  }, [carts, setTotalQuantity]);
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [FoodDetail, setFoodDetail] = useState("");
  const [quantity, setqnty] = useState("");
  console.log(name, price, FoodDetail, quantity)
  const setdata = useCallback(() => {
    if (carts.length > 0) {
      carts.map((item) => {
        setname(item.title);
        setprice(item.price);
        setFoodDetail(item.description);
        setqnty(item.qnty);
        return null; // Add this line to satisfy array-callback-return
      });
    } else {
      console.log("empty");
    }
  }, [carts, setname, setprice, setFoodDetail, setqnty]);

  useEffect(() => {
    setdata();
  }, [setdata]);
  const Senddata = async (item) => {
    console.log("Items", item)
    try {
      // Request user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Send order data with location
          sendOrderData(item, { type: 'Point', coordinates: [longitude, latitude] });
        },
        (error) => {
          console.error('Error getting user location:', error);
          toast.error('Unable to track your current location. Please enable your location', {
            position: "top-right",
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      );
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('Error during purchase');
    }
  };

  const sendOrderData = async (item, location) => {
    const getAuth = localStorage.getItem("AuthToken");

    // Check if AuthToken is present
    if (!getAuth) {
      // AuthToken is not present, redirect the user to the sign-in page
      // You can use your preferred routing mechanism, for example, react-router-dom
      // Replace '/signin' with the actual path of your sign-in page
      window.location.href = '/Sign';
      return; // Stop further execution
    }

    try {
      await axios.post(
        "http://localhost:5000/api/v1/CreateOrder",
        {
          title: item.title,
          price: item.price,
          location: location,
          FoodDetail: item.description,
          quantity: item.qnty,
        },
        {
          headers: {
            'auth-token': getAuth // Include the AuthToken in the headers
          },
        }
      );

      // Assuming you want to clear the cart after a successful purchase
      dispatch(removeSingleIteams(item.id));
      toast.success('your order successifully Send it will be send to you with in a week', {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
     
    } catch (error) {
      console.log(error);
      toast.error('Fail to purchase product try agin', {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  console.log(emptycart)

  return (
    <>
      <div className='text-2xl mt-20 overflow-hidden'>
        <div className='row justify-content-center m-0'>
          <div className='col-md-8  cardsdetails'>
          <h1 className='text-center'>Only Online Order payment by Hand</h1>
            <div className="card">
              <div className="card-header bg-dark p-3">
                <div className='card-header-flex'>
                  <h5 className='text-white m-0 font-bold '>Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""}</h5>
                  <div className='flex justify-center '>
                    {carts.length > 0 ? (
                      <button className='btn btn-danger mt-0 btn-sm text-center'>
                        <span className='text-2xl'>You Purchasing Data</span>
                      </button>
                    ) : ""}
                  </div>


                </div>
              </div>
              <div className="card-body p-0">
                {carts.length === 0 ? (
                  <div className='cart-empty'>
                    <p className='text-center'>Your Cart Is Empty</p>
                  </div>
                ) : (
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-lg">
                            Action
                          </th>
                          <th scope="col" className="px-6 py-3 text-lg">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-3 text-lg">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-lg">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-lg">
                            Qty
                          </th>
                          <th scope="col" className="px-6 py-3 text-lg">
                            Total Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-lg">
                            Purcahse
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {carts.map((data, index) => (
                          <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">
                              <button className='prdct-delete' onClick={() => handleDecrement(data.id)}>
                                <i className='fa fa-trash-alt fa-2    xl mr-2'></i>
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              <div className='h-10 w-10'><img src={data.image} alt="" /></div>
                            </td>
                            <td className="px-6 py-4">
                              <div className=''><p>{data.category}</p></div>
                            </td>
                            <td className="px-6 py-4" style={{ fontSize: "20px" }}>₹ {data.price}</td>
                            <td className="px-6 py-4">
                              <div className="prdct-qty-container">
                                <button className='prdct-qty-btn' type='button' onClick={data.qnty <= 1 ? () => handleDecrement(data.id) : () => handleSingleDecrement(data)}>
                                  <i className='fa fa-xl fa-minus'></i>
                                </button>
                                <input type="text" className='text-center w-12' value={data.qnty} disabled name="" id="" style={{ fontSize: "20px" }} />
                                <button className='prdct-qty-btn' type='button' onClick={() => handleIncrement(data)}>
                                  <i className='fa fa-xl fa-plus'></i>
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 " style={{ fontSize: "20px" }}>₹ {data.qnty * data.price}</td>
                            <td className="px-6 py-4 " style={{ fontSize: "20px" }}>
                              <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => Senddata(data)}>Purchase</button>
                            </td>
                          </tr>
                        ))}

                      </tbody>


                    </table>

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
};
export default OrderDetails