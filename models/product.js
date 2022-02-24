const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  unitDescription: {
    type: String,
  },
  marketPrice: {
    type: Number
  },
  price: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  visible: {
    type: Boolean,
    required: true,
  },
  photos: [
    {
      photoUrl: String,
      featured: Boolean,
    },
  ],
});

module.exports = Product = mongoose.model("product", ProductSchema);
