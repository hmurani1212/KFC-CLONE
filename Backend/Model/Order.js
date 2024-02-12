const mongoose = require('mongoose');
const { Schema } = mongoose;


const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"  // Assuming your user model is named "User"
  },
  name: String,
  FoodDetail: String,
  location: {
    type: {
      type: String,
      enum: ['Point'], // We use 'Point' for a GeoJSON point
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  quantity: Number,
  price: Number
});

// Add a 2dsphere index to support geospatial queries
OrderSchema.index({ location: '2dsphere' });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
