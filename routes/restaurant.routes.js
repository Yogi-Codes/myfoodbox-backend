module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type", "Origin", "Accept"
        );
        next();
    });
    const controller = require('../controllers/restaurant.controller');
    const middleware = require('../middlewares/restaurent.middleware')
    app.post('/restaurant', [
        middleware.duplicateDoesntExists
    ], controller.create);
    app.get('/restaurant', controller.findAll);
    app.get('/restaurant/:id', controller.findOne);
}