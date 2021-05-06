let Category = require("../models/Category");
let { filterByUser } = require("../utils/users");

exports.getCategoryItems = async ({ query: { user } }, res, next) => {
  const userCategories = filterByUser(await Category.find(), user);
  let pop = async () =>
    Promise.all(
      userCategories.map(({ _id }) => Category.findById(_id).populate("items"))
    );

  pop().then((categories) => {
    return res.status(200).json({
      pinged: true,
      results: categories,
      count: userCategories.length,
    });
  });
};

exports.postCategory = async ({ body: { title, user_id } }, res, next) => {
  console.log(title, user_id);
  const newCategory = new Category({
    title,
    createdBy: user_id,
  });

  await newCategory.save(async function (err) {
    if (err) {
      return res.status(400).json({
        error: err.toString(),
        status: 400,
      });
    }
  });

  return res.status(200).json({
    completed: true,
    results: newCategory,
  });
};
