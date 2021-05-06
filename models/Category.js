const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minLength: [2, "Too few characters"],
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  createdBy: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
