import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import Button from "material-ui/Button";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";

const styles = {
  list: {
    width: 250
  },
  listFull: {
    width: "auto"
  }
};
const Map = ReactMapboxGl({
  accessToken: `${process.env.REACT_APP_MAP_BOX_TOKEN}`
});

class TestMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 2.2137,
      latitude: 46.22276,
      dynamicZoom: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log("********************", nextProps, nextProps.weather.length);
    {
      nextProps.weather.length == undefined &&
      nextProps.weather.longitude !== this.state.longitude
        ? this.setState({
            longitude: nextProps.weather.longitude,
            latitude: nextProps.weather.latitude,
            dynamicZoom: 12
          })
        : undefined;
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  changeMapView = mapType => {
    console.log("LOOOK HERE", mapType);
    {
      this.toggleDrawer("left", false);
    }
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggleDrawer("left", true)}>
          Change Map Style
        </Button>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.changeMapView()}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            <div>
              <ListItem button>
                <ListItemText primary="Streets" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="3d" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Mountain" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Terrain" />
              </ListItem>
            </div>
          </div>
        </Drawer>
        <Map
          ref={e => {
            this.map = e;
          }}
          style="mapbox://styles/mapbox/satellite-streets-v10"
          containerStyle={{
            height: "75vh",
            width: "75vw",
            margin: "auto"
          }}
          center={[this.state.longitude, this.state.latitude]}
          zoom={[this.state.dynamicZoom]}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            {/* <Feature coordinates={[2.2137, 46.22276]} /> */}
          </Layer>
        </Map>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  weather: state.weather,
  location: state.location
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TestMap);
