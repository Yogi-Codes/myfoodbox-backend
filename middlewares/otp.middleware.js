const db = require('../models/index.model');
const Otp = db.otp;

const bcrypt = require('bcryptjs');

exports.isValidToken = async (req, res, next) => {
    var validToken = bcrypt.compareSync(req.body.token, );
    if (!validToken) {
        return res.status(400).send({
            result: "Invalid token"
        });
    }
}