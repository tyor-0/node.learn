// model/cars.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
   name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Car", carSchema);
