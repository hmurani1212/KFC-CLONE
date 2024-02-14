// src/components/Checkout.js
import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [products, setProducts] = useState([
    // Your product data goes here
  ]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/ap3/v3/create-checkout-session', {
        products,
      });

      // Redirect to Stripe Checkout page
      window.location.href = response.data.redirect_url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div>
      {/* Display your products here */}
      <h1 className='text-3xl my-20'>Complete your payment</h1>
      {products.map((product) => (
        <div key={product.id}>
          {/* Display product details */}
          <p>{product.dish}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.qnty}</p>
        </div>
      ))}

      {/* Trigger checkout */}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Payment;
