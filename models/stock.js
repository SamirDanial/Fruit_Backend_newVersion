const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  itemInStock: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      availableNumber: {
        type: Number,
      },
    },
  ],
});

module.exports = Stock = mongoose.model("stock", StockSchema);
