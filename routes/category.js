const express = require("express");
const router = express.Router();
const {
  getCategoryItems,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { checkJwt } = require("../utils/checkJwt");

router
  .route("/")
  .get(getCategoryItems)
  .post(postCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
