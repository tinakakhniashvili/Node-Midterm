const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
