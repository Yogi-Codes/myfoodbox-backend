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

db.sequelize.sync({force: true}).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log("Error");
});

require('./routes/auth.routes')(app);
require('./routes/restaurant.routes')(app);
require('./routes/appearence.routes')(app);
require('./routes/users.routes')(app);
require('./routes/otp.routes')(app);

app.listen(8081, () => {
    console.log("Server is Running!");
});