import axios from "axios";
import { getWindData } from "./weather-actions";

export const locationSet = location => ({
  type: "LOCATION_SET",
  payload: location
});

export const locationCreate = location => ({
  type: "LOCATION_CREATE",
  payload: location
});

export const locationUpdate = location => ({
  type: "LOCATION_UPDATE",
  payload: location
});

export const getGeoLocation = zip => dispatch => {
  axios
    //https://us-central1-reactdatavisualization.cloudfunctions.net/api3/api/getZip
    // http://localhost:3001/api/getZip
    .post(
      "https://us-central1-reactdatavisualization.cloudfunctions.net/api3/api/getZip",
      {
        zipCode: zip
      }
    )
    .then(response => {
      console.log("response from server geolocation info", response);
      dispatch(locationSet(response.data));
    })
    .then(() => {
      dispatch(getWindData());
    })
    .catch(err => {
      console.log("Internal server error with geolocation", err);
    });
};
