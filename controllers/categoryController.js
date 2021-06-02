let Category = require("../models/Category");
let { filterByUser } = require("../utils/users");
let { errorStatus } = require("../utils/errors");
let {
  updateEntries: { removeCategoryFromItem },
} = require("../utils/updateEntries");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
exports.getCategoryItems = async ({ query: { user } }, res, next) => {
  try {
    const userCategories = filterByUser(await Category.find(), user);
    let pop = async () =>
      Promise.all(
        userCategories.map(({ _id }) =>
          Category.findById(_id).populate("items")
        )
      );

    pop().then((categories) => {
      return res.status(200).json({
        pinged: true,
        results: categories,
        count: userCategories.length,
      });
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};

exports.postCategory = async ({ body: { title, user_id } }, res, next) => {
  try {
    console.log(title, user_id);
    const newCategory = new Category({
      title,
      createdBy: user_id,
    });
    let error = newCategory.validateSync();
    if (error) throw error;
    await newCategory.save();

    return res.status(200).json({
      completed: true,
      results: newCategory,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};
exports.updateCategory = async ({ body: { id, updates } }, res, next) => {
  try {
    let newCategory = await Category.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      message: "Update successful!",
      results: newCategory,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};

exports.deleteCategory = async ({ query: { categoryId } }, res, next) => {
  try {
    // find item
    const category = await Category.findById(categoryId);
    asyncForEach(category.items, async (item) => {
      await removeCategoryFromItem(category._id, item);
    });

    // return results
    let deletedCategory = await category.remove();
    console.log(deletedCategory, "deleted");
    res.status(200).json({
      results: deletedCategory,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};

exports.removeItemsFromExistingCategory = async (
  { body: { id, removedItems } },
  res,
  next
) => {
  try {
    const category = await Category.findById(id);

    // asyncForEach(newCategories, async (categoryId) => {
    //   await addItemToCategory(categoryId, item.id);
    // });

    asyncForEach(removedItems, async (item) => {
      await removeCategoryFromItem(category._id, item._id);
    });
    return res.status(200).json({
      message: "Update successful!",
      item: item,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};
