const express = require("express");
const router = express.Router();
const {
  getItems,
  postItem,
  publicItem,
} = require("../controllers/itemController");
const { checkJwt } = require("../utils/checkJwt");

router.route("/").get(getItems).post(postItem);
router.route("/test").post(checkJwt, publicItem);
module.exports = router;
