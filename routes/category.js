const express = require("express");
const router = express.Router();
const {
  getCategories,
  postCategory,
} = require("../controllers/categoryController");
const { checkJwt } = require("../utils/checkJwt");

router.route("/").get(getCategories).post(postCategory);

module.exports = router;
