module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type", "Origin", "Accept"
        );
        next();
    });

    const controller = require('../controllers/auth.controller');
    const middleware = require('../middlewares/auth.middlewares');

    app.post('/signup', [
        middleware.checkNotDuplicate
    ], controller.signup);

    app.post('/signin', [
        middleware.checkUserExists,
        middleware.correctPassword
    ], controller.signin);
}
