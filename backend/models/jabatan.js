"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class jabatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
          msg: "Nama jabatan sudah digunakan, masukan jabatan lain.",
        },
        validate: {
          notNull: {
            msg: "Inputan jabatan tidak boleh kosong.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "jabatan",
      tableName: "jabatans",
      timestamps: false, // <--- tambahkan ini
      hooks: {
        afterValidate: (jabatan, options) => {
          if (jabatan.jabatan_name)
            jabatan.jabatan_name = jabatan.jabatan_name.toLowerCase();
        },
      },
    }
  );
  return jabatan;
};
