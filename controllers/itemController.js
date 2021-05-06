let {
  parsers: { parseFromAmazon, uniParser },
} = require("../utils/parsers");
let {
  updateEntries: { addItemToCategory, addCategoryToItem },
} = require("../utils/updateEntries");
let { filterByUser } = require("../utils/users");
let Item = require("../models/Item");
let Url = require("url-parse");
var validUrl = require("valid-url");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
exports.getItems = async ({ query: { user } }, res, next) => {
  const userItems = filterByUser(await Item.find(), user);
  return res.status(200).json({
    pinged: true,
    results: userItems,
    count: userItems.length,
  });
};
exports.getItemCategories = async ({ params: { id } }, res) => {
  return res.status(200).json({
    pinged: true,
    results: await Item.findById(id).populate("categories"),
  });
};

exports.postItem = async (
  { body: { url, user_id, categories } },
  res,
  next
) => {
  try {
    var validateItem = new Item({
      url: url,
      categories: categories,
    });
    const err = validateItem.validateSync();
    if (err) throw err;

    const { host } = new Url(url);

    const parsedRequest =
      host === "www.amazon.com"
        ? await parseFromAmazon(url)
        : await uniParser(url);

    var newItem = new Item({
      ...parsedRequest,
      categories: categories,
      createdBy: user_id,
    });

    await asyncForEach(categories, async (categoryId) => {
      await addItemToCategory(categoryId, newItem._id);
    });

    newItem.save();

    return res.status(200).json({
      completed: true,
      results: newItem,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.toString(),
      status: 400,
    });
  }
};

exports.publicItem = async ({ body: { url } }, res, next) => {
  try {
    console.log(url);

    if (!validUrl.isUri(url)) {
      return res.status(400).json({
        error: true,
        message: "Not a valid URL",
      });
    }
    const { host } = new Url(url);

    const parsedRequest =
      host === "www.amazon.com"
        ? await parseFromAmazon(url)
        : await uniParser(url);

    const newItem = new Item({
      ...parsedRequest,
    });

    return res.status(200).json({
      completed: true,
      results: newItem,
    });
  } catch (e) {
    return console.error(e);
  }
};
