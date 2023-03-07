module.exports = (app) => {
    app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type", "Origin", "Accept"
      );
      next();
    });

    const controller = require('../controllers/appearence.controller.js');
    const middleware = require('../middlewares/appearence.middleware');
  
    app.post('/appearence', [
      middleware.checkValidData,
      middleware.checkIfRepeating
    ], controller.markAppearence);
    app.get('/appearence/:id', controller.getAllAppearenceByUser);
};