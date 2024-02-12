const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const User = require("../Model/User");
module.exports = (io, Order) => {
  // POST route to create an order
  router.post('/createOrder', fetchUser, async (req, res) => {
    try {
      const { name, FoodDetail, location, quantity, price } = req.body;

      // Check if required fields are provided
      if (!name || !FoodDetail || !location || !location.coordinates || !location.type) {
        return res.status(400).json({ error: 'Name, FoodDetail, Location (type and coordinates), quantity, and price are required fields.' });
      }

      const user = await User.findById(req.user.id).select('name email');

      // Create the order with user details
      const order = new Order({
        name,
        FoodDetail,
        location: {
          type: location.type,
          coordinates: location.coordinates
        },
        quantity,
        price,
        user
      });

      await order.save();

      // Emit the 'orderCreated' event with the order details
      io.emit('orderCreated', order);
      res.status(200).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // GET route to fetch all orders
  router.get('/getOrders', async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json({ message: 'Orders retrieved successfully', orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/UserOrder', fetchUser, async (req, res) => {
    try {
      const userId = req.user.id;

      // Assuming you have an Order model with a 'user' field referencing the User model
      const userOrders = await Order.find({ user: userId });

      if (!userOrders || userOrders.length === 0) {
        return res.status(404).json({ msg: 'No orders found for the user' });
      }

      res.json(userOrders);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  return router;
};
