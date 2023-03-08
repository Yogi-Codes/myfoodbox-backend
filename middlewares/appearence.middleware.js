const db = require('../models/index.model');
const User = db.user;
const Restaurant = db.restaurant;
const Appearence = db.appearence;

exports.checkValidData = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            id: req.body.employee
        }
    });
    const restaurant = await Restaurant.findOne({
        where: {
            id: req.body.restaurant
        }
    });
    if (!user || !restaurant) {
        return res.status(400).send({
            result: "User or Resturant ID empty or not valid"
        });
    }
    req.body.empEmail = user.email;
    req.body.restaurantName = restaurant.name;
    next();
}

exports.checkIfRepeating = async (req, res, next) => {
    await Appearence.findAll({
        where: {
            date: req.body.date + 'T00:00:00.000Z',
            restaurant: req.body.restaurant,
            employee: req.body.employee
        }
    }).then((appearence) => {
        if (appearence.length > 0) {
            return res.status(400).send({
                result: "You have already scanned for today"
            });
        }
        next();
    });
}