import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
// import ReactMapboxGl, { Layer, Feature, Marker, Image } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { Marker, NavigationControl } from "react-map-gl";
import Pin from "../Map/Pin";

const { mapboxToken } = require("../../config");

// const Map = ReactMapboxGl({
//   accessToken: mapboxToken,
// });

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Live Mart
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = (theme) => ({
  root: {
    height: "90vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
};

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      lat: null,
      lng: null,
      viewport: {
        latitude: 40,
        longitude: -100,
        zoom: 10.5,
        bearing: 0,
        pitch: 0,
      },
      marker: {
        latitude: 40,
        longitude: -100,
      },
      events: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      this.setState({ lat: position.coords.latitude });
      this.setState({ lng: position.coords.longitude });
      this.setState({
        marker: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        },
        viewport: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 17,
          bearing: 0,
          pitch: 0,
        },
      });
    });
  }

  onMarkerDragEnd = (event) => {
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
      },
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      marker: this.state.marker,
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  handleMapMove = (map) => {
    this.setState({
      lat: map.getCenter().lat.toFixed(4),
      lng: map.getCenter().lng.toFixed(4),
    });
    console.log(this.state.lat, this.state.lng);
  };

  render() {
    const { errors, lat, lng } = this.state;
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                helperText={errors.name}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                helperText={errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                helperText={errors.password}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                helperText={errors.password2}
              />
              {/* {lat && lng && (
                <Map
                  style="mapbox://styles/mapbox/streets-v11"
                  containerStyle={{
                    height: "35vh",
                    width: "35vw",
                  }}
                  center={[lng, lat]}
                  // onMouseUp={(map) => this.handleMapMove(map)}
                >
                  <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "marker-15", "icon-size": 10 }}
                  >
                    <Feature
                      coordinates={[lng, lat]}
                      onDrag={(map) => this.handleMapMove(map)}
                    />
                  </Layer>
                </Map>
              )} */}
              <MapGL
                {...this.state.viewport}
                width="30vw"
                height="30vh"
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={(viewport) => this.setState({ viewport })}
                mapboxApiAccessToken={mapboxToken}
              >
                <Marker
                  longitude={this.state.marker.longitude}
                  latitude={this.state.marker.latitude}
                  offsetTop={-20}
                  offsetLeft={-10}
                  draggable
                  // onDragStart={onMarkerDragStart}
                  // onDrag={onMarkerDrag}
                  onDragEnd={this.onMarkerDragEnd}
                >
                  <Pin size={20} />
                </Marker>

                <div className="nav" style={navStyle}>
                  <NavigationControl />
                </div>
              </MapGL>

              <InputLabel style={{ marginTop: "20px" }}>
                Place The Marker At Your Location In The Map*
              </InputLabel>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { registerUser })(withRouter(Register))
);
