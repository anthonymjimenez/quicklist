const express = require("express");
const router = express.Router();
const { getItems } = require("../controllers/itemControllers");
const { postItems } = require("../controllers/itemControllers");

router.route("/").get(getItems).post(postItems);

module.exports = router;
