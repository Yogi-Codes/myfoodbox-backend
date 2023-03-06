const db = require('../models/index.model');
const User = db.user;

  
  exports.findAll = async (req, res) => {
    await User.findAll()
    .then((users) => {
      res.status(200).send({
        users: users
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
  };
  
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await User.findByPk(id)
    .then((user) => {
      if (user) {
        res.status(200).send({
          user: user
        });
      } else {
        res.status(404).send({
          message: `User with id ${id} not found.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving user with id ${id}.`
      });
    });
  };