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
} = require("../controllers/itemController");
const { checkJwt } = require("../utils/checkJwt");

router
  .route("/")
  .get(getItems)
  .post(postItem)
  .delete(deleteItem)
  .update(update);
router.route("/getItemCategories/:id").get(getItemCategories);
router.route("/auto").update(autoUpdate);
router.route("/test").post(publicItem);
module.exports = router;
