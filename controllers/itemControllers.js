// create and require model
let { parseFromAmazon } = require("../utils/amazon-parser");
let { uniParser } = require("../utils/universal-parser");
exports.getItems = async (req, res, next) => {
  return res.status(200).json({
    pinged: true,
    message: "Need to create mongo cluster",
  });
};

exports.postItems = async (req, res, next) => {
  return res.status(200).json({
    request: await parseFromAmazon(req.body),
  });
};

exports.testUniversalItems = async (req, res, next) => {
  return res.status(200).json({
    request: await uniParser(req.body),
  });
};
