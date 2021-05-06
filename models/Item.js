const mongoose = require("mongoose");
var validUrl = require("valid-url");

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
  url: {
    type: String,
    validate: {
      validator: function () {
        return validUrl.isUri(this.url) ? true : false;
      },
    },
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: [],
    },
  ],
  categoryLength: {
    type: Number,
    default: function () {
      return this.categories.length;
    },
    validate: {
      validator: function () {
        return this.categoryLength > 0;
      },
    },
  },
  createdBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", ItemsSchema);
