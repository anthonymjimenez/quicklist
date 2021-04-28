let Category = require("../models/Category");

exports.getCategories = async ({ query: { user } }, res, next) => {
  const userCategories = filterByUser(await Category.find(), user);
  return res.status(200).json({
    pinged: true,
    results: userCategories,
    count: userItems.length,
  });
};

exports.postCategory = async ({ body: { user_id } }, res, next) => {
  try {
    const newCategory = new Category({
      ...body,
      createdBy: user_id,
    });

    newCategory.save();
    // add Categories to Item & add Item to Categories .findByIdAndUpdate

    return res.status(200).json({
      completed: true,
      results: newCategory,
    });
  } catch (e) {
    console.error(e);
  }
  // return res.status(200).json({
  //   request: await parseFromAmazon(req.body),
  // });
};
