const db = require('../models/index.model');
const Restaurant = db.restaurant;

exports.create = async (req, res) => {
  await Restaurant.create({
    name: req.body.name,
    address: req.body.address,
  })
  .then((restaurant) => {
    res.status(200).send({
      restaurant: restaurant.toJSON(),
      id: restaurant.id
    });
  })
  .catch((err) => {
    // If an error occurred, send an error response
    res.status(500).send({
      message: err.message || "Some error occurred while creating the restaurant."
    });
  });
};

exports.findAll = async (req, res) => {
  await Restaurant.findAll()
  .then((restaurants) => {
    res.status(200).send({
      restaurents: restaurants
    });
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving restaurants."
    });
  });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
  .then((restaurant) => {
    if (restaurant) {
      res.status(200).send({
        restaurant: restaurant
      });
    }
    else {
      res.status(404).send({
        message: `Restaurant with id ${id} not found.`
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || `Error retrieving restaurant with id ${id}.`
    });
  });
};
