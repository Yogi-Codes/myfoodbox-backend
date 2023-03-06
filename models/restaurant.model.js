const {DataTypes} = require('sequelize');

module.exports = (sequalize, Sequelize) => {
    const Restaurent = sequalize.define("restaurent", {
        name: {
            type: DataTypes.STRING
        },
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        address: {
            type: DataTypes.STRING
        },
    });
    return Restaurent;
}