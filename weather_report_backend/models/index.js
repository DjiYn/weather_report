const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/weather-report");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Database connected!");
});

mongoose.set('debug', false);

module.exports.UserKeyword = require("./userKeyword");
module.exports.CurrentWeather = require("./currentWeather");