let Item = require("../models/Item");
let Category = require("../models/Category");

const addItemToCategory = (categoryId, item) => {
  return Category.findByIdAndUpdate(
    categoryId,
    { $push: { items: item._id } },
    { new: true, useFindAndModify: false }
  );
};

const addCategoryToItem = (itemId, category) => {
  return Item.findByIdAndUpdate(
    itemId,
    { $push: { categories: category._id } },
    { new: true, useFindAndModify: false }
  );
};
exports.updateEntries = { addItemToCategory, addCategoryToItem };
