import axios from "axios";

export const weatherSet = weather => ({
  type: "WEATHER_SET",
  payload: weather
});

export const weatherCreate = weather => ({
  type: "WEATHER_CREATE",
  payload: weather
});

export const weatherUpdate = weather => ({
  type: "WEATHER_UPDATE",
  payload: weather
});

export const getWindData = () => (dispatch, getState) => {
  let { location } = getState();
  console.log(
    "Inside weather actions",
    location.latLong.lat,
    location.latLong.lng
  );
  axios
    //https://us-central1-reactdatavisualization.cloudfunctions.net/api3/api/darksky/superseekret
    // http://localhost:3001/api/darksky
    .post(
      "https://us-central1-reactdatavisualization.cloudfunctions.net/api3/api/darksky",
      {
        lat: location.latLong.lat,
        long: location.latLong.lng
      }
    )
    .then(response => {
      console.log(
        "this is the response from my express server",
        response.data,
        response.data.currently.windSpeed,
        response.data.currently.windBearing
      );
      dispatch(weatherSet(response.data));
    })
    .catch(function(error) {
      console.log(error);
    });
};
