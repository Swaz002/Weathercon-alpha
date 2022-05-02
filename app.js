//adding the express package
const express = require("express");
//adding the https module
const https = require("https");
//adding the bodyParser modue
const bodyParser = require("body-parser");
const { link } = require("fs");
//adding the express module in app
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//to fix the get values in the server homepage
app.get("/", function(req, res) {
        res.sendFile(__dirname + "/index.html");        
        });

app.post("/", function(req, res) {
        console.log("Post request recieved");
        console.log(req.body.cityName);
        const query = req.body.cityName;
        const appid = "69a1316f77e614a952ac1d2c21d01e03";
        const unit = "metric"
        const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit ;

        //getting the api value using https
        https.get(URL, function(response) {
            //printing the status code on the console
            console.log(response.statusCode);

            //bringing the response on the url used in https module
            response.on("data", function(data) {
                const weatherData = JSON.parse(data);
                const place = weatherData.name;
                const temp = weatherData.main.temp;
                const WeatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
               //there can only be one res.send
              res.write("<p>The weather is currently " + WeatherDescription + "</p>");
               console.log("temp = " + temp);
              res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius<h1>");
               res.write("<img src=" + imgURL + ">");
    });
});
})


app.listen(process.env.PORT || 3000, function() {
    console.log("server online at port 3000 ...");
});