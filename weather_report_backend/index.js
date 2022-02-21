const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const weatherReportRoutes = require("./routes/weatherReport");

app.use("/api/", weatherReportRoutes);




app.listen(port, () => {
    console.log(`Serving on port ${port}!`);
});
