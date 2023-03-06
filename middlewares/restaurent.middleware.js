const db = require('../models/index.model');
const Restaurant = db.restaurant;

exports.duplicateDoesntExists = async (req, res, next) => {
    await Restaurant.findAll({
        where: {
            name: req.body.name.trim(),
            address: req.body.address.trim()
        }
    }).then(rest => {
        if (rest.length > 0) {
            return res.status(400).send({
                result: "Restaurant with given name or address already exists"
            });
        }
        next();
    })
}