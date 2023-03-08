const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Otp = sequelize.define("otp", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
        type: DataTypes.UUID
    },
    expireAt: {
        type: DataTypes.TIME,
        allowNull: false,
      },
  });
  return Otp;
};
