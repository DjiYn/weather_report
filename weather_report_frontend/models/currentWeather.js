const mongoose = require("mongoose");

const currentWeatherSchema = new mongoose.Schema({
    locationID: {
        type: String,
        required: true,
    },
    weather: {
        type: String, //Can save the whole JSON.
        required: true,

    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("currentWeather", currentWeatherSchema);