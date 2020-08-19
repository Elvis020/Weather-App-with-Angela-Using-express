const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// Making a get request using https
const https = require("https");

// Helps us to parse info from the body of the html
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
// ?Parsing the data into JSON and working with it using the https module

app.post("/", (req, res) => {
    console.log("👨‍🎤Post request received😻");
    const city = req.body.cityName;
    const apiKey = "79c46d65d676ff601149e47ad14aa357";
    const units = "metric";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    https.get(URL, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            console.log(weatherData.main.temp);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const ImageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(
                "<h1>The current temperature in " +
                city +
                " is " +
                temperature +
                " degree Celcius</h1>"
            );
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<img src=" + ImageUrl + ">");
            res.send();
        });
    });
});

app.listen(3000, () => {
    "Weather project has🛬 started at port🥰 3000";
});