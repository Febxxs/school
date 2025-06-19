"use strict";

const { jabatan } = require("../models");

exports.getJabatan = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Berhasil mendapatkan data jabatan",
    data: ["data"],
  });
};

exports.createJabatan = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Berhasil mendapatkan data jabatan",
    data: ["data"],
  });
};
