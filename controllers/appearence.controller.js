const db = require('../models/index.model');
const Appearence = db.appearence;
const Restaurant = db.resturant;

exports.markAppearence = async (req, res) => {
    await Appearence.create({
        employee: req.body.employee,
        restaurant: req.body.restaurant,
        date: req.body.date,
        time: req.body.time,
        empEmail: req.body.empEmail,
        restaurantName: req.body.restaurantName
    }).then((appearence) => {
        if (!appearence) {
            return res.status(500).send({
                result: "Something went wrong!"
            });
        }
        res.status(200).send({
            id: appearence.id,
            appearence: appearence.toJSON()
        });
    }).catch(err => {
        return res.status(500).send({
            result: err
        });
    });
}

exports.getAllAppearenceByUser = async (req, res, next) => {
    await Appearence.findAll({
        where: {
            employee: req.params.id
        }
    }).then((appearences) => {
        if (!appearences) {
            return res.status(500).send({
                result: "Something went wrong"
            });
        }
        return res.status(200).send({
            appearences: appearences
        });
    }).catch(err => {
        return res.status(500).send({
            result: err
        });
    });
}

exports.getAllAppearenceOfRestaurent = async (req, res, next) => {
    await Restaurant.findAll({
        where: {
            resturant: req.body.restaurant
        }
    }).then((restaurant) => {
        if (!restaurant) {
            return res.status(500).send({
                result: "Something went wrong"
            });
        }
        return res.status(200).send({
            appearences: restaurant
        });
    }).catch(err => {
        return res.status(500).send({
            result: err
        });
    });
}