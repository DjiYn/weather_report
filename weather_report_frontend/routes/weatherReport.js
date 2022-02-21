const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");


// Could probably put this route on main index.js file.
router.get("/", (req, res) => {
    res.send("Main page");
});

router.get("/:search", async (req, res) => {
    const keyword = req.params["search"]
    const options = {
        method: 'GET',
        url: `https://foreca-weather.p.rapidapi.com/location/search/${keyword}`,
        params: { lang: 'en' },
        headers: {
            'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
            'x-rapidapi-key': 'ea31a5259emsh2a528715c266ab7p1c1054jsnba4f29571c99'
        }
    };
    let locations = {};
    await axios.request(options).then((response) => {
        locations = response.data.locations;
    }).catch(function (error) {
        console.error(error);
    });
    res.send(locations);
})

router.post("/search", async (req, res) => {
    const userIP = req.body.userip;
    const keyword = req.body.keyword;
    const userKeyword = new db.UserKeyword({ userIP, keyword });
    await userKeyword.save();

    // CONSOLE LOG
    console.log(userIP, keyword);

    res.send("User keyword was logged!");
})

router.get("/search/:locationID", async (req, res) => {
    const locationID = req.params["locationID"];
    //Current weather
    let options = {
        method: 'GET',
        url: `https://foreca-weather.p.rapidapi.com/current/${locationID}`,
        params: { alt: '0', tempunit: 'C', windunit: 'MS', tz: 'Europe/London', lang: 'en' },
        headers: {
            'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
            'x-rapidapi-key': 'ea31a5259emsh2a528715c266ab7p1c1054jsnba4f29571c99'
        }
    };
    let weatherInfo = {};
    await axios.request(options).then(function (response) {
        weatherInfo = response.data.current;
    }).catch(function (error) {
        console.error(error);
    });


    //7 day forcast information.
    options = {
        method: 'GET',
        url: `https://foreca-weather.p.rapidapi.com/forecast/daily/${locationID}`,
        params: { alt: '0', tempunit: 'C', windunit: 'MS', periods: '8', dataset: 'full' },
        headers: {
            'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
            'x-rapidapi-key': 'ea31a5259emsh2a528715c266ab7p1c1054jsnba4f29571c99'
        }
    };
    let weatherForecast = {};
    await axios.request(options).then((response) => {
        weatherForecast = response.data.forecast;
    }).catch((error) => {
        console.error(error);
    });

    const requestedInfo = [weatherInfo, weatherForecast.slice(1, 8)];

    res.send(requestedInfo);
})

router.post("/search/:locationID", async (req, res) => {
    const locationID = req.params["locationID"];

    const currentWeather = new db.CurrentWeather();
    currentWeather.locationID = locationID;

    const options = {
        method: 'GET',
        url: `https://foreca-weather.p.rapidapi.com/current/${locationID}`,
        params: { alt: '0', tempunit: 'C', windunit: 'MS', tz: 'Europe/London', lang: 'en' },
        headers: {
            'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
            'x-rapidapi-key': 'ea31a5259emsh2a528715c266ab7p1c1054jsnba4f29571c99'
        }
    };
    let weatherInfo = {};
    await axios.request(options).then((response) => {
        weatherInfo = response.data.current;
    }).catch((error) => {
        console.error(error);
    });

    currentWeather.weather = JSON.stringify(weatherInfo);
    await currentWeather.save();

    //CONSOLE LOG
    console.log(currentWeather.date, currentWeather.locationID, currentWeather.weather);

    res.send("Requested weather was saved!");
})


module.exports = router;