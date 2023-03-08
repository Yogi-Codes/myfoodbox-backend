module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type", "Origin", "Accept"
        );
        next();
    });
    const controller = require('../controllers/otp.controller');
    app.post('/sendotp', controller.sendotp);
    app.post('/verifyotp', controller.verifyotp);
}