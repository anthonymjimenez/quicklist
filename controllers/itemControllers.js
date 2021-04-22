let { parseFromAmazon } = require("../utils/amazon-parser");
let { uniParser } = require("../utils/universal-parser");
let Item = require("../models/Items");
let Url = require("url-parse");
var validUrl = require("valid-url");

exports.getItems = async (req, res, next) => {
  const items = await Item.find();
  return res.status(200).json({
    pinged: true,
    results: items,
    count: items.length,
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

exports.testUniversalItems = async (
  { body: { url, user_id } },
  res,
  next
) => {};
