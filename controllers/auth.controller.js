const db = require('../models/index.model');
const User = db.user;

var bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    console.log(req.body);
    await User.create({
        lname: req.body.lname,
        fname: req.body.fname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phone: req.body.phone
    }).then((user) => {
        if (!user) {
            res.send(500)({
                result: "Something went wrong!"
            });
        }
        return res.status(200).send({
            user: user.toJSON(),
            id: user.id
        });
    }).catch((err) => {
        return res.status(500).send({
            result: err
        });
    });
}

exports.signin = async (req, res) => {
    await User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (!user) {
            return res.status(500).send({
                result: "Something went wrong!"
            });
        }
        return res.status(200).send({
            user: user.toJSON(),
            id: user.id
        });
    }).catch(err => {
        return res.status(500).send({
            result: err
        });
    });
}