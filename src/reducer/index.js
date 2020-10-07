import { combineReducers } from "redux";
import location from "./location";
import weather from "./weather";

export default combineReducers({
  location,
  weather
});
