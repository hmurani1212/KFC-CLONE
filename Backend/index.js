const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const ConnectToMongo = require('./Db/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const Order = require('./Model/Order'); // Adjust the path accordingly

ConnectToMongo();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const port = 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Use the router returned by the order module
const orderRouter = require('./routes/order')(io, Order);
app.use('/api/v1', orderRouter);
app.use("/ap2/v2", require("./routes/User"));
app.use("/ap3/v3", require("./routes/Payment"))

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('getOrders', async () => {
    try {
      const orders = await Order.find();
      socket.emit('ordersList', orders);
    } catch (error) {
      console.error(error);
    }
  });

  // Other Socket.io events

  socket.on('orderCreated', (order) => {
    console.log('New order:', order);
    io.emit('newOrder', order);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
