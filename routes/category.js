const express = require("express");
const router = express.Router();
const {
  getCategoryItems,
  postCategory,
} = require("../controllers/categoryController");
const { checkJwt } = require("../utils/checkJwt");

router.route("/").get(getCategoryItems).post(postCategory);

module.exports = router;
