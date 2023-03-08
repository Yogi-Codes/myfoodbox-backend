const db = require('../models/index.model');
const Otp = db.otp;

const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');


exports.sendotp = async (req, res) => {
    const userId = req.body.userId;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const time = new Date();
    const expireTime = `${time.getHours()}:${time.getMinutes()+1}`;
    await Otp.create({
        userId: userId,
        otp: otp,
        expireAt: expireTime 
    }).then((otp) => {
        if(!otp){
            return res.status(500).send({
                "result": "Something went wrong"
            });
        }
        var token = bcrypt.hashSync(otp.id, 8);
        return res.status(200).send({
            token: token
        });
    }).catch((err) => {
        return res.status(500).send({
            result: err
        });
    });
}

exports.verifyotp = async (req, res) => {
    let date = new Date();
    await Otp.findAll({
        where: {
            userId: req.body.userId,
            expireAt: {
                [Op.gte]: `${date.getHours()}:${date.getMinutes()}`
            }
        }
    }).then((otp) => {
        if (otp.length == 0) {
            return res.status(400).send({
                result: "OTP expired or something went wrong"
            });
        }
        otp = otp[0];
        var valid = bcrypt.compareSync(
            otp.id, req.body.token
        );
        if (!valid) {
            return res.status(400).send({
                result: "Invalid Token!"
            });
        }
        if (otp.otp != req.body.otp) {
            return res.status(400).send({
                result: "Otp didn't match!"
            });
        }
        return res.status(200).send({
            id: otp.id
        });
    });
}
