const db = require('../models/index.model');
const User = db.user;
const Restaurant = db.restaurant;

exports.checkValidData = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            id: req.body.employee
        }
    });
    const restaurant = Restaurant.findOne({
        where: {
            id: req.body.restaurant
        }
    });
    if (!user || !restaurant) {
        res.status(400).send({
            result: "User or Resturant ID is empty"
        });
    }
    next();
}