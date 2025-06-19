const express = require("express");
const router = express.Router();

const {
  getJabatan,
  createJabatan,
} = require("../controller/jabatanController");

router.get("/jabatan", getJabatan);
router.post("/jabatan", createJabatan);

module.exports = router;
