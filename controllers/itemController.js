let {
  parsers: { parseFromAmazon, uniParser },
} = require("../utils/parsers");
let {
  updateEntries: {
    addItemToCategory,
    addCategoryToItem,
    removeItemFromCategory,
  },
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
    let error = validateItem.validateSync();
    if (error) throw error;
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

    asyncForEach(categories, async (categoryId) => {
      await addItemToCategory(categoryId, newItem._id);
    });

    await newItem.save();

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
exports.update = async ({ body: { id, updates } }, res, next) => {
  try {
    let newItem = await Item.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      useFindAndModify: false,
    });
    console.log(newItem, "NEW ITEM");
    return res.status(200).json({
      message: "Update successful!",
      item: newItem,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};
exports.autoUpdate = async ({ body: { id } }, res, next) => {
  try {
    const item = await Item.findById(id);

    const parsedRequest =
      item.hostname === "www.amazon.com"
        ? await parseFromAmazon(item.url)
        : await uniParser(item.url);

    const updatedFields = {};
    for (prop in parsedRequest) {
      if (parsedRequest[prop] !== item[prop] && parsedRequest[prop] !== null) {
        console.log("HELLO?");
        updatedFields[prop] = parsedRequest[prop];
      }
    }
    console.log(updatedFields);
    if (Object.keys(updatedFields).length === 0) {
      return res.status(200).json({
        message: "Done- No update needed!",
      });
    }

    let newItem = await Item.findOneAndUpdate({ _id: id }, updatedFields, {
      new: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      message: "Update successful!",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      error: err,
    });
  }
};
exports.addCategoriesToExistingItem = (
  { body: { id, newCategories } },
  res,
  next
) => {
  try {
    const item = await Item.findById(id);
    item.categories.push(...newCategories);
    await item.save();
    asyncForEach(newCategories, async (categoryId) => {
      await addItemToCategory(categoryId, item.id);
    });

    return res.status(200).json({
      message: "Update successful!",
      item: item,
    });
  } catch (error) {
    res.status(500).json({
      error: err,
    });
  }
};
exports.deleteItem = async ({ body: { id } }, res, next) => {
  try {
    // find item
    const item = await Item.findById(id);
    asyncForEach(item.categories, async (category) => {
      await removeItemFromCategory(category._id, item._id);
    });

    // return results
    let i = await item.remove();
    console.log("I", i);

    res.status(200).json({
      completed: result,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.toString(),
      status: 400,
    });
  }
};
