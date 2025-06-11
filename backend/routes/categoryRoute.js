const express = require("express");
const router = express.Router();
const {
  dataCategory,
  addCategory,
} = require("../controller/categoryCoontroller");

router.get("/", dataCategory);

router.post("/", addCategory);
module.exports = router;
