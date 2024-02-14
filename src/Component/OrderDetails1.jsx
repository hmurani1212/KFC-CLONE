import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart, removeSingleIteams, emptycartIteam } from '../redux/features/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import OrderDetails from "./OrderDetails"
const OrderDetails1 = () => {

  const { carts } = useSelector((state) => state.allCart);
  console.log("Card Data", carts)

  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);

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

  // payment integration
  const makePayment = async () => {
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
  const HandleChnage = () =>{
    setChangePayment(!ChangePayment)
    setChangePayment1(!ChangePayment1)
  }
  const [ChangePayment, setChangePayment] = useState(false);
  const [ChangePayment1, setChangePayment1] = useState(true);
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
     {ChangePayment && <OrderDetails /> }
    </>
  )
}

export default OrderDetails1

