"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class jabatan extends Model {
    static associate(models) {
      // define association here
    }
  }
  jabatan.init(
    {
      jabatan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      jabatan_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Nama jabatan sudah digunakan",
        },
        validate: {
          notNull: { msg: "Inputan jabatan tidak boleh kosong." },
          notEmpty: { msg: "Inputan jabatan tidak boleh kosong." },
        },
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "jabatan",
      tableName: "jabatans",
      timestamps: false,
      hooks: {
        beforeValidate: (jabatan) => {
          if (jabatan.jabatan_name) {
            jabatan.jabatan_name = jabatan.jabatan_name.toLowerCase();
          }
        },
      },
    }
  );
  return jabatan;
};
