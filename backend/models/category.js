"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Nama category sudah digunakan, masukan category lain.",
        },
        validate: {
          notNull: {
            msg: "Inputan category tidak boleh kosong. ",
          },
        },
      },
      description: DataTypes.TEXT,
    },

    {
      // hook
      hooks: {
        afterValidate: (category, option) => {
          category.name = category.name.toLowerCase();
        },
      },
      sequelize,
      modelName: "category",
    }
  );
  return category;
};
