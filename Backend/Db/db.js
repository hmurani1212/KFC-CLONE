const mongoose = require('mongoose');

const ConnectToMongo = async () => {
    try {
    await mongoose.connect("mongodb://localhost:27017/KFCWebsite");
        console.log("Connected to MongoDB on port 27017");
    } catch (error) {
        console.log(error)
    }

}
module.exports = ConnectToMongo;