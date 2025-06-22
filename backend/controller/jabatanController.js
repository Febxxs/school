"use strict";
const { Op } = require("sequelize");
const { jabatan } = require("../models");
//ambil semua data
exports.getJabatan = async (req, res) => {
  try {
    const dataJabatan = await jabatan.findAll();
    return res.status(200).json({
      status: "success",
      data: dataJabatan,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan server",
    });
  }
};
//detai jabatan
exports.detailJabatan = async (req, res) => {
  try {
    // Perbaikan 1: Gunakan req.params bukan req.param
    const { id } = req.params; // atau req.params.jabatan_id jika route menggunakan :jabatan_id

    // Perbaikan 2: Validasi ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "fail",
        message: "ID jabatan tidak valid",
      });
    }

    const detail = await jabatan.findByPk(id);

    // Perbaikan 3: Handle null result
    if (!detail) {
      return res.status(404).json({
        status: "fail",
        message: "Nama Jabatan tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Data jabatan ditemukan",
      data: detail,
    });
  } catch (error) {
    console.error("Error:", error); // Log error untuk debugging
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan server",
    });
  }
};
//membuat data baru
exports.createJabatan = async (req, res) => {
  try {
    const { jabatan_name, description } = req.body; // <-- Pastikan nama field sesuai model
    // Cek apakah jabatan sudah ada
    const existingJabatan = await jabatan.findOne({
      where: { jabatan_name: jabatan_name.toLowerCase() },
    });

    if (existingJabatan) {
      return res.status(400).json({
        status: "fail",
        message: "Nama jabatan sudah digunakan",
      });
    }

    const newJabatan = await jabatan.create({
      jabatan_name,
      description,
    });

    return res.status(201).json({
      status: "success",
      data: newJabatan,
    });
  } catch (error) {
    // // Handle validation errors
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({
        status: "fail",
        message: error.errors.map((e) => e.message).join(", "),
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan server",
    });
  }
};
// update data jabatan
exports.updateJabatan = async (req, res) => {
  try {
    const { id } = req.params;
    const { jabatan_name, description } = req.body;

    // Validasi ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "fail",
        message: "ID jabatan tidak valid",
      });
    }

    // Validasi duplikat nama jabatan (case insensitive)
    if (jabatan_name) {
      const existingJabatan = await jabatan.findOne({
        where: {
          jabatan_name: jabatan_name.toLowerCase(),
          jabatan_id: { [Op.ne]: id }, // Kecuali record saat ini
        },
      });

      if (existingJabatan) {
        return res.status(400).json({
          status: "fail",
          message: "Nama jabatan sudah digunakan",
        });
      }
    }

    // Update data dan ambil data yang sudah diupdate
    const [affectedRows] = await jabatan.update(
      {
        jabatan_name: jabatan_name?.toLowerCase(),
        description,
      },
      {
        where: { jabatan_id: id },
        returning: true, // Untuk PostgreSQL/SQLite
      }
    );

    // Jika tidak ada data yang diupdate
    if (affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Data jabatan tidak ditemukan",
      });
    }

    // Ambil data terbaru setelah update
    const updatedData = await jabatan.findByPk(id);

    return res.status(200).json({
      status: "success",
      message: "Data jabatan berhasil diupdate",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating jabatan:", error);

    // Handle Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        status: "fail",
        message: error.errors.map((e) => e.message).join(", "),
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan server",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// delete jabatan
exports.deleteJabatan = async (req, res) => {
  try {
    const { id } = req.params;

    const getId = await jabatan.findByPk(id);

    if (!getId) {
      return res.status(404).json({
        status: "Fail",
        error: `ID ${id} tidak ditemukan`,
      });
    }

    await jabatan.destroy({
      where: {
        jabatan_id: id,
      },
    });

    return res.status(200).json({
      status: "Success",
      message: "Berhasil menghapus data jabatan",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      status: "Fail",
      error: "Terjadi kesalahan server",
    });
  }
};
