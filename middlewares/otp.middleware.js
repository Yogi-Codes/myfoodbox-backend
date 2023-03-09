const db = require('../models/index.model');
const Otp = db.otp;

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

exports.isValidToken = async (req, res, next) => {
    var validToken = bcrypt.compareSync(req.body.token, );
    if (!validToken) {
        return res.status(400).send({
            result: "Invalid token"
        });
    }
}

exports.alreadySent = async (req, res, next) => {
    const time = new Date();
    await Otp.findOne({
        where: {
            expireAt: {
                [Op.gt]: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}}`
            }
        },
        order: [['expireAt', 'DESC']]
    }).then((otp) => {
        if (otp) {
            return res.status(400).send({
                result: "Aready sent an OTP"
            });
        }
        next();
    });
}