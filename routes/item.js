const express = require("express");
const router = express.Router();
const {
  getItems,
  postItem,
  publicItem,
  getItemCategories,
  deleteItem,
  autoUpdate,
  update,
  addCategoriesToExistingItem,
  removeCategoriesFromExistingItem,
} = require("../controllers/itemController");
const { checkJwt } = require("../utils/checkJwt");

router.route("/").get(getItems).post(postItem).delete(deleteItem).patch(update);
router.route("/getItemCategories/:id").get(getItemCategories);
router.route("/auto").patch(autoUpdate);
router.route("/addCategories").patch(addCategoriesToExistingItem);
router.route("/removeCategories").patch(removeCategoriesFromExistingItem);
router.route("/test").post(publicItem);
module.exports = router;
