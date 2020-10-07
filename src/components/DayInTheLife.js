import React from "react";
import axios from "axios";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryStack
} from "victory";
import Button from "material-ui/Button";
import { connect } from "react-redux";
import { getWindData } from "../Actions/weather-actions";
const directions = {
  0: "E",
  45: "NE",
  90: "N",
  135: "NW",
  180: "W",
  225: "SW",
  270: "S",
  315: "SE"
};

const orange = { base: "gold", highlight: "darkOrange" };

const red = { base: "tomato", highlight: "orangeRed" };

const innerRadius = 30;

class CompassCenter extends React.Component {
  render() {
    const { origin } = this.props;
    const circleStyle = {
      stroke: red.base,
      strokeWidth: 2,
      fill: orange.base
    };
    return (
      <g>
        <circle
          cx={origin.x}
          cy={origin.y}
          r={innerRadius}
          style={circleStyle}
        />
      </g>
    );
  }
}

class CenterLabel extends React.Component {
  render() {
    const { datum, active, color } = this.props;
    const text = [`${Math.round(datum._y1)} mph`];
    const baseStyle = { fill: color.highlight, textAnchor: "middle" };
    const style = [
      { ...baseStyle, fontSize: 18, fontWeight: "bold" },
      { ...baseStyle, fontSize: 12 }
    ];

    return active ? (
      <VictoryLabel text={text} style={style} x={175} y={175} renderInPortal />
    ) : null;
  }
}

class DayInTheLife extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windNew: [],
      windSpeed: "",
      windBearing: "",
      windGust: "",
      homeState: ""
    };
  }

  componentDidMount() {
    console.log("DayInTheLife did mount", this.state, "PROPS", this.props);
    {
      this.state.windNew.length === 0
        ? this.setState({
            windNew: [
              ...this.state.windNew,

              {
                windSpeed: 0,
                windGust: 0 + 0.02,
                windBearing: 45
              },
              {
                windSpeed: 0,
                windGust: 0 + 0.02,
                windBearing: 90
              },
              {
                windSpeed: 0,
                windGust: 0 + 0.02,
                windBearing: 135
              },
              {
                windSpeed: 0,
                windGust: 0 + 0.02,
                windBearing: 180
              },
              {
                windSpeed: 0,
                windGust: 0 + 0.02,
                windBearing: 225
              },
              {
                windSpeed: 0,
                windGust: 0 + 0.02,
                windBearing: 270
              },
              {
                windSpeed: 0,
                windGust: 0 + 0.02,
                windBearing: 315
              }
            ]
          })
        : undefined;
    }

    // this.setStateInterval = window.setInterval(() => {
    //   this.getWindDataFromUnderground();
    // }, 100000);
  }

  componentDidUpdate() {
    console.log("DayInTheLife update", this.state, "PROPS", this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log("day recieved props", nextProps);
    try {
      this.setState(
        {
          windNew: [
            {
              windSpeed: nextProps.weather.currently.windSpeed,
              windGust: nextProps.weather.currently.windSpeed + 0.02,
              windBearing: nextProps.weather.currently.windBearing
            },
            ...this.state.windNew
          ]
        },
        () => {
          console.log("updated state with store props", this.state);
        }
      );
    } catch (error) {
      return console.log("cant set nextprops", error);
    }
  }

  handleRefresh = () => {
    console.log("refreshed");
  };

  getWindDataFromUnderground = () => {};

  render() {
    return (
      <div>
        <VictoryChart
          polar
          animate={{ duration: 500, onLoad: { duration: 500 } }}
          theme={VictoryTheme.material}
          innerRadius={innerRadius}
          domainPadding={{ y: 10 }}
          events={[
            {
              childName: "all",
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    { target: "labels", mutation: () => ({ active: true }) },
                    { target: "data", mutation: () => ({ active: true }) }
                  ];
                },
                onMouseOut: () => {
                  return [
                    { target: "labels", mutation: () => ({ active: false }) },
                    { target: "data", mutation: () => ({ active: false }) }
                  ];
                }
              }
            }
          ]}
        >
          <VictoryPolarAxis
            dependentAxis
            labelPlacement="vertical"
            style={{ axis: { stroke: "none" } }}
            tickFormat={() => ""}
          />
          <VictoryPolarAxis
            labelPlacement="parallel"
            tickValues={Object.keys(directions).map(k => +k)}
            tickFormat={Object.values(directions)}
          />
          <VictoryStack>
            <VictoryBar
              style={{
                data: {
                  fill: a => (a ? orange.highlight : orange.base),
                  width: 40
                }
              }}
              data={this.state.windNew}
              x="windBearing"
              y="windSpeed"
              labels={() => ""}
              labelComponent={<CenterLabel color={orange} />}
            />
            {/* <VictoryBar
            style={{
              data: {
                fill: (d, a) => (a ? red.highlight : red.base),
                width: 40
              }
            }}
            data={this.state.wind}
            x="windBearing"
            y={d => d.windGust - d.windSpeed}
            labels={() => ""}
            labelComponent={<CenterLabel color={red} />}
          /> */}
          </VictoryStack>
          <CompassCenter />
        </VictoryChart>
        <Button
          onClick={this.handleRefresh}
          style={{ margin: "2em" }}
          variant="raised"
          color="primary"
        >
          Update Data
        </Button>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  location: state.location,
  weather: state.weather
});

let mapDispatchToProps = dispatch => ({
  getWindData: () => dispatch(getWindData())
});

export default connect(mapStateToProps, mapDispatchToProps)(DayInTheLife);
