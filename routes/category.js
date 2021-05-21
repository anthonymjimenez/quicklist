const express = require("express");
const router = express.Router();
const {
  getCategoryItems,
  postCategory,
  update,
  deleteCategory,
} = require("../controllers/categoryController");
const { checkJwt } = require("../utils/checkJwt");

router
  .route("/")
  .get(getCategoryItems)
  .post(postCategory)
  .patch(update)
  .delete(deleteCategory);

module.exports = router;
