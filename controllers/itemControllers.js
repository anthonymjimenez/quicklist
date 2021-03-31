// create and require model
let { parseFromAmazon } = require("../utils/amazon-parser");

exports.getItems = async (req, res, next) => {
  return res.status(200).json({
    pinged: true,
    message: "Need to create mongo cluster",
  });
};

exports.postItems = async (req, res, next) => {
  console.log(parseFromAmazon(req.body), 1);
  return res.status(200).json({
    request: await parseFromAmazon(req.body),
  });
};
