let { parseFromAmazon } = require("../utils/amazon-parser");
let { uniParser } = require("../utils/universal-parser");
let { filterByUser } = require("../utils/users");
let Item = require("../models/Items");
let Url = require("url-parse");
var validUrl = require("valid-url");

exports.getItems = async ({ query: { user } }, res, next) => {
  const userItems = filterByUser(await Item.find(), user);
  return res.status(200).json({
    pinged: true,
    results: userItems,
    count: userItems.length,
  });
};

exports.postItems = async ({ body: { url, user_id } }, res, next) => {
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

    const newItem = new Item({
      ...parsedRequest,
      createdBy: user_id,
    });

    newItem.save();
    return res.status(200).json({
      completed: true,
      results: newItem,
    });
  } catch (e) {
    console.error(e);
  }
  // return res.status(200).json({
  //   request: await parseFromAmazon(req.body),
  // });
};

exports.publicItems = async ({ body: { url, user_id } }, res, next) => {
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

    const newItem = new Item({
      ...parsedRequest,
    });

    return res.status(200).json({
      completed: true,
      results: newItem,
    });
  } catch (e) {
    console.error(e);
  }
  // return res.status(200).json({
  //   request: await parseFromAmazon(req.body),
  // });
};
