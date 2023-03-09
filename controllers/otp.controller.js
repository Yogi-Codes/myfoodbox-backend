const db = require('../models/index.model');
const Otp = db.otp;
const User = db.user;

const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const {sendMail} = require('../services/email.services');

exports.sendotp = async (req, res) => {
    const userId = req.body.userId;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    var time = new Date();
    time = new Date(time.getTime() + 60*1000);
    const expireTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    await User.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        if (!user) {
            return res.status(400).send({
                result: "Invalid User ID"
            });
        }
        req.body.email = user.email;
    }).catch(err => {
        return res.status(500).send({
            result: err
        });
    });
    await Otp.create({
        userId: userId,
        otp: otp,
        expireAt: expireTime 
    }).then(async (otp) => {
        if(!otp){
            return res.status(500).send({
                "result": "Something went wrong"
            });
        }
        var token = bcrypt.hashSync(otp.id, 8);
        // await sendMail(
        //     req.body.email,
        //     "Your OTP for Fresh-Food " + otp.otp,
        //     "Fresh-Food"
        // );
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
        },
        limit: 1,
        order: [['createdAt', 'DESC']]
    }).then(async (otp) => {
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
        await Otp.destroy({
            where: {
                id: otp.id
            }
        });
        return res.status(200).send({
            id: otp.id
        });
    });
}
