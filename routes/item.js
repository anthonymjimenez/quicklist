const express = require("express");
const router = express.Router();
const {
  getItems,
  postItem,
  publicItem,
  getItemCategories,
} = require("../controllers/itemController");
const { checkJwt } = require("../utils/checkJwt");

router.route("/").get(getItems).post(postItem);
router.route("/getItemCategories/:id").get(getItemCategories);
router.route("/test").post(publicItem);
module.exports = router;
