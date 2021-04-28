const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: String,
  price: Number,
  availability: Boolean,
  image: String,
  logo: String,
  hostname: String,
  url: String,
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  createdBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", ItemsSchema);
