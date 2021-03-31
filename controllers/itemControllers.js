// create and require model

exports.getItems = async (req, res, next) => {
  return res.status(200).json({
    pinged: true,
    message: "Need to create mongo cluster",
  });
};

exports.postItems = async (req, res, next) => {
  return res.status(200).json({
    request: req.body,
  });
};
