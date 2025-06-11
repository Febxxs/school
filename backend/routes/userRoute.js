const express = require("express");
const router = express.Router();
const { dataUser, addUser } = require("../controller/userCoontroller");

router.get("/", dataUser);

router.post("/", addUser);
module.exports = router;
