import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import Typography from "material-ui/Typography";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import {
  VictoryChart,
  VictoryGroup,
  VictoryStack,
  VictoryBar,
  Bar
} from "victory";

const handleMouseOver = () => {
  const fillColor = this.state.clicked ? "blue" : "tomato";
  const clicked = !this.state.clicked;
  this.setState({
    clicked,
    style: {
      data: { fill: fillColor }
    }
  });
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper
  }
});

class InfoDisplay extends React.Component {
  state = {
    value: "one"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab value="one" label="Summary" />
            <Tab value="two" label="Hourly" />
            <Tab value="three" label="Item Three" />
          </Tabs>
        </AppBar>
        {value === "one" && (
          <TabContainer>
            {this.props.weather.daily !== undefined
              ? this.props.weather.daily.summary
              : "No Data"}
          </TabContainer>
        )}
        {value === "two" && (
          <TabContainer>
            {this.props.weather.hourly !== undefined ? (
              <div>
                {/* <List component="nav">
                  {this.props.weather.hourly.data.map(ele => {
                    console.log("eles", ele);
                    return (
                      <ListItem button>
                        <ListItemText primary={ele.time} />
                      </ListItem>
                    );
                  })}
                </List> */}
                <VictoryChart
                  height={400}
                  width={400}
                  domainPadding={{ x: 50, y: [0, 20] }}
                  scale={{ x: "time" }}
                >
                  <VictoryBar
                    dataComponent={
                      <Bar events={{ onMouseOver: handleMouseOver }} />
                    }
                    style={this.state.style}
                    data={[
                      { x: "0000", y: 2 },
                      { x: "0100", y: 3 },
                      { x: "0200", y: 5 },
                      { x: "0300", y: 4 }
                    ]}
                  />
                </VictoryChart>
              </div>
            ) : (
              "No data"
            )}
            }
          </TabContainer>
        )}
        {value === "three" && <TabContainer>Item Three</TabContainer>}
      </div>
    );
  }
}

{
  /* <p>Info</p>
              {this.props.weather.daily !== undefined ? (
                <h2>{this.props.weather.daily.summary}</h2>
              ) : (
                undefined
              )} */
}

// export default withStyles(styles)(InfoDisplay);
let mapStateToProps = state => ({
  location: state.location,
  weather: state.weather
});

let mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(InfoDisplay)
);

// :
// apparentTemperature
// :
// 33.36
// cloudCover
// :
// 0.46
// dewPoint
// :
// 34.35
// humidity
// :
// 0.92
// icon
// :
// "partly-cloudy-night"
// ozone
// :
// 459.15
// precipIntensity
// :
// 0
// precipProbability
// :
// 0
// pressure
// :
// 1002.18
// summary
// :
// "Partly Cloudy"
// temperature
// :
// 36.34
// time
// :
// 1519912800
// uvIndex
// :
// 0
// visibility
// :
// 6.88
// windBearing
// :
// 167
// windGust
// :
// 4.25
// windSpeed
// :
// 3.74
