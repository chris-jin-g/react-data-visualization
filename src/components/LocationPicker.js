import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import axios from "axios";
import { connect } from "react-redux";
import { getGeoLocation } from "../Actions/location-actions";
class LocationPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      locationError: "",
      date: "",
      specificGeoAdress: ""
    };
  }

  handleInputChange = name => event => {
    if (name === "location") {
      {
        event.target.value.length !== 5
          ? this.setState({ locationError: "Whoops thats not a zip code!" })
          : this.setState({ locationError: "", location: event.target.value });
      }
    }
    if (name === "date") {
      this.setState({
        date: event.target.value
      });
    }
  };

  handleSubmit = () => {
    {
      this.state.locationError == "" && this.state.location !== ""
        ? this.props.getGeoLocation(this.state.location)
        : alert("Please enter valid zip code!");
    }
  };

  componentDidUpdate = () => {
    console.log("Location picker updated", this.state);
  };

  render() {
    const styles = {
      container: {
        display: "flex",
        flexWrap: "wrap"
        // color: "pink"
      },
      textField: {
        marginLeft: "0.5em",
        marginRight: "0.5em",
        width: 225
      }
    };
    return (
      <div>
        <form style={styles.container} noValidate>
          <TextField
            error={this.state.locationError !== "" ? true : false}
            id="Location"
            label="Location"
            type="Location"
            defaultValue={this.state.location}
            onChange={this.handleInputChange("location")}
            style={styles.textField}
            InputLabelProps={{
              shrink: true
            }}
            helperText={this.state.locationError}
          />
          <TextField
            id="datetime-local"
            label="Get Data From"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            onChange={this.handleInputChange("date")}
            style={styles.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
          <br />
        </form>
        <Button
          onClick={this.handleSubmit}
          style={{ margin: "2em" }}
          variant="raised"
          color="primary"
        >
          Get Data
        </Button>
      </div>
    );
  }
}

let mapStateToProps = state => ({});

let mapDispatchToProps = dispatch => ({
  getGeoLocation: zip => dispatch(getGeoLocation(zip))
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationPicker);
