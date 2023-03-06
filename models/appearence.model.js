const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Appearence = sequelize.define("appearence", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        time: {
            type: DataTypes.TIME
        },
        date: {
            type: DataTypes.DATE
        },
        employee: {
            type: DataTypes.UUID
        },
        restaurant: {
            type: DataTypes.UUID
        }
    });
    return Appearence;
}