const db = require('../models/index.model');
const Otp = db.otp;

const bcrypt = require('bcryptjs');


exports.sendotp = async (req, res) => {
    const uid = req.query.uid.trim();
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expireTime = new Date();
    expireTime.setMinutes(expireTime.getMinutes() + 1);
    await Otp.create({
        id: uid,
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
    
}
