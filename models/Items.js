const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  availability: {
    //
    type: Boolean,
  },
  image: {
    type: String,
  },
  lo: {
    //
    type: String,
  },
  hostname: {
    //
    type: String,
  },
  url: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Items", ItemsSchema);
