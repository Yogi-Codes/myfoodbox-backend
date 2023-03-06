const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./models/index.model");

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.sequelize.sync({force: false}).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log("Error");
});

require('./routes/auth.routes')(app);
require('./routes/restaurant.routes')(app);
require('./routes/appearence.routes')(app);
require('./routes/users.routes')(app);

app.listen(8080, () => {
    console.log("Server is Running!");
});