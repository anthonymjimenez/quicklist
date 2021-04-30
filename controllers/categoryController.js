let Category = require("../models/Category");

exports.getCategories = async ({ query: { user } }, res, next) => {
  const userCategories = filterByUser(await Category.find(), user);
  return res.status(200).json({
    pinged: true,
    results: userCategories,
    count: userCategories.length,
  });
};

exports.postCategory = async ({ body: { title, user_id } }, res, next) => {
  try {
    console.log(title, user_id);
    const newCategory = new Category({
      title,
      createdBy: user_id,
    });

    newCategory.save();
    // add Categories to Item & add Item to Categories .findByIdAndUpdate

    return res.status(200).json({
      completed: true,
      results: newCategory,
    });
  } catch (e) {
    return console.error(e);
  }
  // return res.status(200).json({
  //   request: await parseFromAmazon(req.body),
  // });
};
