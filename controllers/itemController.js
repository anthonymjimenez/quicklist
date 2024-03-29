let {
  parsers: { parseFromAmazon, uniParser },
} = require("../utils/parsers");
let {
  updateEntries: {
    addItemToCategory,
    removeItemFromCategory,
    addCategoryToItem,
  },
} = require("../utils/updateEntries");
let { errorStatus } = require("../utils/errors");
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
  try {
    const userItems = filterByUser(await Item.find(), user);
    return res.status(200).json({
      results: userItems,
      count: userItems.length,
      success: true,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};
exports.getItemCategories = async ({ params: { id } }, res) => {
  try {
    return res.status(200).json({
      success: true,
      results: await Item.findById(id).populate("categories"),
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};

exports.postItem = async (
  { body: { url, user_id, categories } },
  res,
  next
) => {
  try {
    res.setTimeout(12000, function () {
      console.log("Request has timed out.");
      return res.status(408).json({
        success: false,
        error:
          "Request has timed out. (Site is probably not compatible with Quicklist)",
      });
    });
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
      success: true,
      results: newItem,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};

exports.publicItem = async ({ body: { url } }, res, next) => {
  try {
    res.setTimeout(12000, function () {
      console.log("Request has timed out.");
      return res.status(408).json({
        success: false,
        error: "Sorry but this site isn't currently compatible with Quicklist!",
      });
    });
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
      success: true,
      results: newItem,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};
exports.update = async ({ body: { id, updates } }, res, next) => {
  try {
    let newItem = await Item.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      success: true,
      message: "Update successful!",
      results: newItem,
    });
  } catch (error) {
    return errorStatus(res, error);
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
    updatedFields.availability = parsedRequest.availability;
    if (parsedRequest.price) {
      updatedFields.price = parsedRequest.price;
    }
    // if (Object.keys(updatedFields).length === 0) {
    //   return res.status(200).json({
    //     success: true,
    //     update: false,
    //     message: "Done- No update was needed!",
    //   });
    // }
    let newItem = await Item.findOneAndUpdate({ _id: id }, updatedFields, {
      new: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      update: true,
      message: "Update successful!",
      results: newItem,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};

exports.addCategoriesToExistingItem = async (
  { body: { id, categories } },
  res,
  next
) => {
  try {
    var item = await Item.findById(id);
    console.log(item);
    item.categories.push(...categories);
    asyncForEach(categories, async (categoryId) => {
      await addItemToCategory(categoryId, id);
    });
    await item.save();
    return res.status(200).json({
      success: true,
      results: item,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};

exports.removeCategoriesFromExistingItem = async (
  { body: { id, categories } },
  res,
  next
) => {
  try {
    var item = await Item.findById(id);
    item.categories = item.categories.filter(
      (itemCategory) =>
        !categories.some((categoryToRemove) => itemCategory == categoryToRemove)
    );
    asyncForEach(categories, async (categoryId) => {
      await removeItemFromCategory(categoryId, id);
    });
    await item.save();
    return res.status(200).json({
      success: true,
      results: item,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};

exports.deleteItem = async ({ query: { itemId } }, res, next) => {
  try {
    // find item
    const item = await Item.findById(itemId);

    asyncForEach(item.categories, async (category) => {
      await removeItemFromCategory(category._id, item._id);
    });

    // return results
    let deletedItem = await item.remove();

    res.status(200).json({
      success: true,
      message: "Item deleted",
      results: deletedItem,
    });
  } catch (error) {
    return errorStatus(res, error);
  }
};
