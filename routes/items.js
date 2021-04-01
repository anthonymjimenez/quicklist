const express = require("express");
const router = express.Router();
const {
  getItems,
  postItems,
  testUniversalItems,
} = require("../controllers/itemControllers");

router.route("/").get(getItems).post(postItems);
router.route("/test").post(testUniversalItems);
module.exports = router;
