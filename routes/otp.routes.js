module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type", "Origin", "Accept"
        );
        next();
    });
    const controller = require('../controllers/otp.controller');
    app.get('/sendotp', controller.sendotp);
    app.get('/verifyotp/:id', controller.verifyotp);
}