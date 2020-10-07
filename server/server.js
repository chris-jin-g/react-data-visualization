/**
 * This is a simple express server, to show how to proxy weather rquest to DarkSky API.
 */
require("dotenv").load();
var express = require("express");
var bodyParser = require("body-parser");
require("es6-promise").polyfill();
require("isomorphic-fetch");

var axios = require("axios");
var cors = require("cors");

var port = 3001;

// Configure app to use bodyParser to parse json data
var app = express();
var server = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

// Test server is working (GET http://localhost:3001/api)
app.get("/api/", function(req, res) {
  res.json({ message: "Hi, welcome to the server api!" });
});

// Following is an example to proxy client request to DarkSky forecast API
// Please use your own darksky secret key.
// Get one for free at https://darksky.net/dev/
// DarkSky returns 403 (forbidden) error for invalid key.

var url_prefix =
  "https://api.darksky.net/forecast/" +
  `${process.env.DARKSKY_SECRET_KEY}` +
  "/";
app.post("/api/darksky", function(req, res) {
  console.log("RECIEVED DATA TO USE", req.body);
  // Retrieves location coordinates (latitude and longitude) from client request query
  var coordinates = `${req.body.lat}, ${req.body.long}`;
  var url = url_prefix + coordinates;
  console.log("Fetching " + url);

  axios.get(url).then(retrievedDataFromDarkSky => {
    // console.log(retrievedDataFromDarkSky.data);
    res.status(200);
    res.send(retrievedDataFromDarkSky.data);
  });
});

app.post("/api/getZip", function(req, res) {
  console.log("recieved zip code...", req.body);
  axios
    .get(
      `http://maps.googleapis.com/maps/api/geocode/json?address=${
        req.body.zipCode
      }&sensor=true`
    )
    .then(response => {
      try {
        console.log(
          "Response from google geolocation api based on zip code",
          response.data.results[0].geometry.location,
          response.data.results[0].formatted_address
        );
        let specificGeoAdress = {
          name: response.data.results[0].formatted_address,
          latLong: response.data.results[0].geometry.location
        };
        res.send(specificGeoAdress);
      } catch (error) {
        return console.log("Internal server error", error);
      }
    });
});

// Start the server
server.listen(port);
console.log("Server is listening on port " + port);
