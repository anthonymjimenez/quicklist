const express = require("express");
const router = express.Router();
const {
  getItems,
  postItems,
  publicItems,
} = require("../controllers/itemControllers");
const { checkJwt } = require("../utils/checkJwt");

router.route("/").get(getItems).post(postItems);
router.route("/test").post(publicItems);
module.exports = router;
