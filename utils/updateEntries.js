let Item = require("../models/Item");
let Category = require("../models/Category");

// req first receives (url, [...category ids])
// create new Item and then map through category ids and execute addItemToCategory
// Take newly created Item id and map through category id and execute addCategoryToItem

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
