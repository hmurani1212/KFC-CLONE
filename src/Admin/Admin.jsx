import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function Admin() {
  const [orders, setOrders] = useState([]);
  const [newOrderCount, setNewOrderCount] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    const fetchOrders = () => {
      console.log('Fetching orders...');
      socket.emit('getOrders');
    };

    socket.on('ordersList', (newOrders) => {
      console.log('Received ordersList:', newOrders);
      setOrders(newOrders);
    });

    socket.on('newOrder', (newOrder) => {
      console.log('Received newOrder:', newOrder);
      setOrders((prevOrders) => [...prevOrders, newOrder]);
      setNewOrderCount((prevCount) => prevCount + 1);
      alert('New order received!');
    });

    const intervalId = setInterval(fetchOrders, 5000);

    return () => {
      socket.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    document.title = newOrderCount > 0 ? `(${newOrderCount}) New Order - Admin Panel` : 'Admin Panel';

    return () => {
      document.title = 'Admin Panel';
    };
  }, [newOrderCount]);

  const handleCheckLocation = (coordinates) => {
    const userLatitude = coordinates[1];
    const userLongitude = coordinates[0];
  
    // Replace 'YOUR_LATITUDE' and 'YOUR_LONGITUDE' with your actual coordinates
    const yourLatitude = 'YOUR_LATITUDE';
    const yourLongitude = 'YOUR_LONGITUDE';
  
    // Create a map URL with the user's and your coordinates
    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${yourLatitude},${yourLongitude}&destination=${userLatitude},${userLongitude}`;
  
    // Calculate distance using Haversine formula
    const haversine = (lat1, lon1, lat2, lon2) => {
      const toRadians = (angle) => angle * (Math.PI / 180);
      const R = 6371; // Earth radius in kilometers
  
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
  
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
  
      return distance;
    };
  
    const distance = haversine(yourLatitude, yourLongitude, userLatitude, userLongitude);
  
    // Open a new window with the map URL
    window.open(mapUrl, '_blank');
  
    // Log or display the distance
    console.log(`Distance to user: ${distance} km`);
  };
  console.log(orders)

  return (
    <div className='mt-28'>
      <h1>Admin Panel</h1>
      <p>{newOrderCount > 0 ? `${newOrderCount} new order(s)` : 'No new orders'}</p>
      {orders.map((element, index) => (
        <div key={index} className=''>
          <p className='text-xl'>
            {index + 1}
          </p>
          <div id={`map-${index}`} className='order-map' style={{ height: '200px' }}>"Map"</div>
          <p className="block max-w-sm p-6 my-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              {element.name}
            </h5>
            <button class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={() => handleCheckLocation(element.location.coordinates)}>
              Check User Location
            </button>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {element.FoodDetail}
            </p>
            <p className='text-black'>
              {element.price}
            </p>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Admin;
