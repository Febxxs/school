const express = require("express");
const router = express.Router();

const {
  getJabatan,
  createJabatan,
  detailJabatan,
  updateJabatan,
  deleteJabatan,
} = require("../controller/jabatanController");
// get all
router.get("/jabatan", getJabatan);
// detail
router.get("/jabatan/:id", detailJabatan);
// create
router.post("/jabatan", createJabatan);
// update
router.put("/jabatan/:id", updateJabatan);
// delete
router.delete("/jabatan/:id", deleteJabatan);

module.exports = router;
