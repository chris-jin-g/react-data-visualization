import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DayInTheLife from "../src/components/DayInTheLife";
import InfoDisplay from "../src/components/InfoDisplay";
import Map from "../src/components/TestMap";
import axios from "axios";
import LocationPicker from "../src/components/LocationPicker";
import RadarChart from "../src/components/RadarChart";
import Grid from "material-ui/Grid";
import { connect } from "react-redux";
import firebase from "firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: "",
      weatherLocation: "",
      start: false
    };
  }
  componentDidMount() {
    let config = {
      apiKey: "AIzaSyAwIDNb3b5rBFopAuL-rGkj0W-98Ia9YAM",
      authDomain: "reactdatavisualization.firebaseapp.com",
      databaseURL: "https://reactdatavisualization.firebaseio.com",
      projectId: "reactdatavisualization",
      storageBucket: "",
      messagingSenderId: "602382825924"
    };
    firebase.initializeApp(config);
  }
  componentDidUpdate() {
    console.log("App Updated", this.state, "PROPS", this.props);
  }

  render() {
    return (
      <div>
        <Grid className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React Data Visualization</h1>
          </header>
          <Grid className="polarChartContainer">
            {this.props.location.name !== undefined ? (
              <p className="App-intro">
                Current weather for {this.props.location.name}.
              </p>
            ) : (
              <p>No Location chosen yet!</p>
            )}
            <div style={{ textAlign: "center" }} />
            <Grid container spacing={24}>
              <Grid item xs>
                <p>Pick your location</p>
                <LocationPicker />
              </Grid>
              <Grid item xs={8} />
              <Map />
              <Grid item xs>
                <InfoDisplay />
              </Grid>
            </Grid>
          </Grid>
          <div style={{ maxWidth: "25%", maxHeight: "25%" }}>
            <DayInTheLife />
          </div>
        </Grid>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  location: state.location,
  weather: state.weather
});

let mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
