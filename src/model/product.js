const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Product price is required"]
    },
    description: {
      type: String,
      required: [true, "Product description is required"]
    },
    category: {
      type: String,
      required: [true, "Product category is required"]
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"]
    },
    rating: {
      rate: {
        type: Number,
        required: [true, "Product rating is required"]
      },
      count: {
        type: Number,
        required: [true, "Product rating count is required"]
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
