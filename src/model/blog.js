const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      lowercase: true
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 300
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: false,
      trim: true
    },
    coverImage: {
      type: String
    },
    category: {
      type: String,
      required: true,
      lowercase: true
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ],
    isPublished: {
      type: Boolean,
      default: false
    },
    publishedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Blog", blogSchema);
