const db = require('../models/index.model');
const User = db.user;
const bcrypt = require('bcryptjs');

exports.checkNotDuplicate = async (req, res, next) => {
    await User.findAll({
        attributes: ['id'],
        where: {
            email: req.body.email
        }
    }).then((result) => {
        if (result.length > 0) {
            res.status(400).send({message: 'email already in use'});
            return;
        }
        next();
    }).catch(err => {
        res.status(500).send({message: err});
        return;
    });
}

exports.checkUserExists = async (req, res, next) => {
    await User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (!user) {
            res.status(400).send({
                result: "Email not registered"
            });
            return;
        }
        next();
    }).catch((err) => {
        return res.status(500).send({
            result: err
        });
    });
}

exports.correctPassword = async (req, res, next) => {
    await User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        var isValidPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!isValidPassword) {
            return res.status(400).send({
                result: "Invalid Password!"
            });
        }
        next();
    });
}