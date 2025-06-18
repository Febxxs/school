"use strict";

const { category } = require("../models");

exports.dataCategory = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Berhasil mendapatkan data kategori",
  });
};

exports.addCategory = async (req, res) => {
  try {
    let { name, description } = req.body;

    const newCategory = await category.create({ name, description });

    res.status(201).json({
      status: "Success",
      data: newCategory,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      error: error.errors,
    });
  }
};
