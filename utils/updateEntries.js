let Item = require("../models/Item");
let Category = require("../models/Category");

// req first receives (url, [...category ids])
// create new Item and then map through category ids and execute addItemToCategory
// Take newly created Item id and map through category id and execute addCategoryToItem

const addItemToCategory = (categoryId, itemId) => {
  return Category.findByIdAndUpdate(
    categoryId,
    { $push: { items: itemId } },
    { new: true, useFindAndModify: false }
  );
};

const addCategoryToItem = (categoryId, itemId) => {
  return Item.findByIdAndUpdate(
    itemId,
    { $push: { categories: categoryId } },
    { new: true, useFindAndModify: false }
  );
};

const removeItemFromCategory = async (categoryId, itemId) => {
  return Category.findByIdAndUpdate(
    categoryId,
    { $pull: { items: itemId } },
    { new: true, useFindAndModify: false }
  );
};

const removeCategoryFromItem = async (categoryId, itemId) => {
  return Item.findByIdAndUpdate(
    itemId,
    { $pull: { categories: categoryId } },
    { useFindAndModify: false }
  );
};

exports.updateEntries = {
  addItemToCategory,
  addCategoryToItem,
  removeItemFromCategory,
  removeCategoryFromItem,
};
