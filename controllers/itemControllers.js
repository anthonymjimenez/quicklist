// create and require model
let { parseFromAmazon } = require("../utils/amazon-parser");
let { uniParser } = require("../utils/universal-parser");
let Item = require("../models/Items");

exports.getItems = async (req, res, next) => {
  const items = await Item.find();
  return res.status(200).json({
    pinged: true,
    results: items,
    count: items.length,
  });
};

exports.postItems = async (req, res, next) => {
  try {
    let resp = await uniParser(req.body);
    console.log(resp);
    const newResponse = new Item({
      ...resp,
    });
    newResponse.save();
    return res.status(201).json({
      completed: true,
      results: newResponse,
    });
  } catch (e) {
    console.log(e);
  }
  // return res.status(200).json({
  //   request: await parseFromAmazon(req.body),
  // });
};

exports.testUniversalItems = async (req, res, next) => {
  return res.status(200).json({
    request: await uniParser(req.body),
  });
};
