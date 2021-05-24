let Category = require("../models/Category");
let { filterByUser } = require("../utils/users");
let { errorStatus } = require("../utils/errors");
let {
  updateEntries: { removeCategoryFromItem },
} = require("../utils/updateEntries");
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
exports.update = async ({ body: { id, updates } }, res, next) => {
  try {
    let newCategory = await Category.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      message: "Update successful!",
      item: newCategory,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};

exports.deleteCategory = async ({ body: { id } }, res, next) => {
  try {
    // find item
    const category = await Category.findById(id);
    asyncForEach(category.items, async (category) => {
      await removeCategoryFromItem(category._id, item._id);
    });

    // return results
    let deletedCategory = await category.remove();

    res.status(200).json({
      completed: deletedCategory,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};

exports.removeItemFromExistingCategory = async (
  { body: { id, removedItems } },
  res,
  next
) => {
  try {
    const Category = await Category.findById(id);

    // asyncForEach(newCategories, async (categoryId) => {
    //   await addItemToCategory(categoryId, item.id);
    // });

    return res.status(200).json({
      message: "Update successful!",
      item: item,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};
