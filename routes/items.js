const express = require("express");
const router = express.Router();
const {
  getItems,
  postItems,
  publicItems,
} = require("../controllers/itemController");
const { checkJwt } = require("../utils/checkJwt");

router.route("/").get(getItems).post(postItems);
router.route("/test").post(checkJwt, publicItems);
module.exports = router;
