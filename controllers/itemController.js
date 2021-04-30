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

exports.postItem = async (
  { body: { url, user_id, categories } },
  res,
  next
) => {
  try {
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

    var newItem = new Item({
      ...parsedRequest,
      createdBy: user_id,
    });
    var item = "";
    newItem.save();

    await asyncForEach(categories, async (categoryId) => {
      await addItemToCategory(categoryId, newItem._id);
      item = (await addCategoryToItem(newItem._id, categoryId)).toJSON();
    });
    // add Categories to Item & add Item to Categories .findByIdAndUpdate
    return res.status(200).json({
      completed: true,
      results: item,
    });
  } catch (e) {
    return console.error(e);
  }
  // return res.status(200).json({
  //   request: await parseFromAmazon(req.body),
  // });
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
