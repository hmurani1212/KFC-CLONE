import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart, removeSingleIteams, emptycartIteam } from '../redux/features/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import OrderDetails from "./OrderDetails";
import axios from 'axios'
import { toast } from 'react-toastify';
const OrderDetails1 = () => {

  const { carts } = useSelector((state) => state.allCart);
  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const dispatch = useDispatch();

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
  const total = () => {
    let totalprice = 0
    carts.map((ele, ind) => {
      totalprice = ele.price * ele.qnty + totalprice
    });
    setPrice(totalprice)
  }


  // count total quantity
  const countquantity = () => {
    let totalquantity = 0
    carts.map((ele, ind) => {
      totalquantity = ele.qnty + totalquantity
    });
    setTotalQuantity(totalquantity)
  }

  useEffect(() => {
    total()
  }, [total])

  useEffect(() => {
    countquantity()
  }, [countquantity]);
  const [Saveitem, setSaveitem]= useState({});
  // payment integration
  const makePayment = async () => {
    const firstCartItem = carts[0];
    // Check if there's at least one item in the cart
    if (firstCartItem) {
      Senddata(firstCartItem);
        // The rest of your code...
    } else {
      // Handle the case where the cart is empty
      console.log('Cart is empty');
    }
       const getAuth = localStorage.getItem("AuthToken");
    // // Check if AuthToken is present
    if (!getAuth) {
      // AuthToken is not present, redirect the user to the sign-in page
      // You can use your preferred routing mechanism, for example, react-router-dom
      // Replace '/signin' with the actual path of your sign-in page
      window.location.href = '/Sign';
      return; // Stop further execution
    }
     try {
      const stripe = await loadStripe("pk_test_51ON9IWGOffRjuiXbk0WFHxHCEvEI9m6sbuhnOgPANCiKkfsoobCRxXxmtX2B2MzDP9pMv0jLswEosM2cdF27HJnu00XnqW9N3j");
      const body = {
        products: carts
      };
      const headers = {
        "Content-Type": "application/json"
      };
      const response = await fetch("http://localhost:5000/ap3/v3/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };
  const HandleChnage = () => {
    setChangePayment(!ChangePayment)
    setChangePayment1(!ChangePayment1)
  }
  const [ChangePayment, setChangePayment] = useState(false);
  const [ChangePayment1, setChangePayment1] = useState(true);
  const Senddata = async (item) => {
    setSaveitem({item})
    console.log("Saveitem", Saveitem)
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
  return (
    <>
      <div className='text-center md:text-2xl mt-20'>
        <p className='text-xl mt-28'>if you dont want pay the payment online want to pay by Hand just Order Click<span className='underline text-blue-500 cursor-pointer mx-3' onClick={HandleChnage}>Here</span></p>
        {ChangePayment1 && <div className='col-md-8 mt-5 mb-5 cardsdetails'>
          <h1>Online payment and order</h1>
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className='card-header-flex'>
                <h5 className='my-5'>Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""}</h5>
                {
                  carts.length > 0 ? <button className='btn btn-danger mt-0 btn-sm'
                    onClick={emptycart}
                  ><i className='fa fa-trash-alt mr-2'></i><span>EmptyCart</span></button>
                    : ""
                }
              </div>

            </div>
            <div className="card-body p-0">
              {
                carts.length === 0 ?
                  <p className='md:text-3xl text-center my-5'>Your Cart Is Empty</p>
                  :
                  <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Action
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Product
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Quantity
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Total Price
                          </th>
                          <th scope="col" class="px-6 py-3 hidden">
                           Order
                          </th>
                        </tr>
                      </thead>
                      {
                        carts.map((data, index) => {
                          return (
                            <>
                              <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    <button className='prdct-delete'
                                      onClick={() => handleDecrement(data.id)}
                                    ><i className='fa fa-trash-alt'></i></button>
                                  </th>
                                  <td className="px-6 py-4">
                                    <div className='h-10 w-10'><img src={data.image} alt="" /></div>
                                  </td>
                                  <td className="px-6 py-4"><div className='product-name'><p>{data.category}</p></div></td>
                                  <td className="px-6 py-4">${data.price}</td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                      <button className="text-sm bg-gray-200 px-2 py-1 rounded" type="button"
                                        onClick={data.qnty <= 1 ? () => handleDecrement(data.id) : () => handleSingleDecrement(data)}
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <input type="text" value={data.qnty} disabled name="" id="" className="text-center w-8" />
                                      <button className="text-sm bg-gray-200 px-2 py-1 rounded" type="button" onClick={() => handleIncrement(data)}>
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                  </td>
                                  <td>₹ {data.qnty * data.price}</td>
                                  <td><button className="hidden" onClick={() => Senddata(data)}>Order</button></td>
                                </tr>
                              </tbody>
                            </>
                          )
                        })
                      }
                    </table>
                    <div className='flex text-center justify-center mt-20'>
                      <p className='mx-10'> Total  Items In Cart:<span>{totalquantity}</span> </p>
                      <p className='mx-10'> Total Price: ₹ {totalprice}</p>
                      <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={makePayment}> Purchase</button>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>}
      </div>
      {ChangePayment && <OrderDetails />}
    </>
  )
}

export default OrderDetails1

