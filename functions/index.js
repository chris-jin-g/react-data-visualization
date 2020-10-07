const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const cors = require("cors");
const express = require("express");
const axios = require("axios");
/* Express with CORS & automatic trailing '/' solution */
const app3 = express();

app3.use(cors({ origin: true }));

app3.get("/test", (request, response) => {
  response.send(
    "Hello from Express on Firebase with CORS! No trailing '/' required!"
  );
});

// not as clean, but a better endpoint to consume
const api3 = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`; // prepend '/' to keep query params if any
  }
  return app3(request, response);
});

app3.post("/api/darksky", (req, res) => {
  let url_prefix =
    "https://api.darksky.net/forecast/" +
    functions.config().reactdatavisualization.server.env.dark_sky_secret_key;

  console.log("RECIEVED DATA TO USE, INSIDE FIREBASE FUNCTIONS", req.body);
  // Retrieves location coordinates (latitude and longitude) from client request query
  var coordinates = `/${req.body.lat}, ${req.body.long}`;
  var url = url_prefix + coordinates;
  console.log("Fetching " + url);

  axios
    .get(url)
    .then(retrievedDataFromDarkSky => {
      // console.log(retrievedDataFromDarkSky.data);
      return res.status(200).send(retrievedDataFromDarkSky.data);
    })
    .catch(err => console.log("whoops something went wrong", err));
});

app3.post("/api/getZip", (req, res) => {
  console.log("recieved zip code...", req.body);
  axios
    .get(
      `http://maps.googleapis.com/maps/api/geocode/json?address=${
        req.body.zipCode
      }&sensor=true`
    )
    .then(response => {
      console.log(
        "Response from google geolocation api based on zip code",
        response.data.results[0].geometry.location,
        response.data.results[0].formatted_address
      );
      let specificGeoAdress = {
        name: response.data.results[0].formatted_address,
        latLong: response.data.results[0].geometry.location
      };
      return res.send(specificGeoAdress);
    })
    .catch(err => console.log("ISE", err));
});

module.exports = {
  api3
};
