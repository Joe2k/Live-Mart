import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { Marker, NavigationControl } from "react-map-gl";
import Pin from "../Map/Pin";
import { useParams } from "react-router";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getDistance from "../../utils/getDistance";
import { CustomThemeContext } from "../../context/CustomThemeProvider";

const { mapboxToken } = require("../../config");

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center",
  },
  media: {
    height: 400,
  },
  container: {
    marginTop: 50,
  },
  heading: {
    flex: "1 100%",
    textAlign: "center",
  },
  cardContent: {
    flexGrow: 1,
  },
  search: {
    flex: "1 100%",
    textAlign: "center",
    marginLeft: "300px",
    marginRight: "300px",
    marginBottom: "50px",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "80%",
    },
  },
}));

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
};

const GreenTextTypography = withStyles({
  root: {
    color: "#00a152",
  },
})(Typography);

function Offline(props) {
  const classes = useStyles();

  const { id } = useParams();
  const [curTime, setCurTime] = useState("");
  const [viewPort, setViewPort] = useState({
    longitude: 80.186224,
    latitude: 13.102343,
    zoom: 17,
    bearing: 0,
    pitch: 0,
  });
  const [marker, setMarker] = useState({
    longitude: 80.186224,
    latitude: 13.102343,
  });
  const [item, setItem] = useState({});
  const [form, setForm] = useState({ date: "" });
  const { currentTheme, setTheme } = React.useContext(CustomThemeContext);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11"
  );

  React.useEffect(() => {
    var now = new Date();
    console.log(currentTheme);
    setCurTime(now.toLocaleString());
    setForm({ ...form, date: now.toLocaleString() });
    axios.get("/api/items/one/" + id).then((resp) => {
      let { data } = resp;
      data = {
        ...data,
        distance: getDistance(
          props.auth.user.location.latitude,
          props.auth.user.location.longitude,
          data.location.latitude,
          data.location.longitude
        ),
      };
      setItem(data);
      setMarker(data.location);
      setViewPort({
        ...viewPort,
        longitude: data.location.longitude,
        latitude: data.location.latitude,
      });
    });
  }, []);

  React.useEffect(() => {
    if (currentTheme === "light")
      setMapStyle("mapbox://styles/mapbox/streets-v11");
    else setMapStyle("mapbox://styles/mapbox/dark-v9");
  }, [currentTheme]);

  const handleSubmit = () => {
    let submitForm = { ...form, itemId: id, userId: props.auth.user.id };

    axios.post("/api/orders/offline", submitForm).then((resp) => {
      console.log(resp.data);
      props.history.push("/events");
    });
  };

  return (
    <Container className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            className={classes.heading}
            gutterBottom
            variant="h2"
            component="h2"
          >
            Buy Offline
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={item.url}
                title="Vegetables"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent className={classes.CardContent}>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="primary" component="p">
                      Cost : Rs. {item.cost}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <GreenTextTypography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                      align="right"
                    >
                      In Stock
                    </GreenTextTypography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Quantity Availabe : {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="right"
                    >
                      Distance : {item.distance} km
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
          <Typography
            style={{ marginTop: "30px", marginBottom: "10px" }}
            align="center"
            variant="subtitle1"
            color="textPrimary"
            component="h4"
          >
            Shop Location
          </Typography>
          <MapGL
            {...viewPort}
            width="25vw"
            height="25vh"
            mapStyle={mapStyle}
            onViewportChange={(viewport) => setViewPort(viewport)}
            mapboxApiAccessToken={mapboxToken}
          >
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              offsetTop={-20}
              offsetLeft={-10}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                {item.soldBy && item.soldBy.name}
              </Typography>
              <Pin size={20} />
            </Marker>

            <div className="nav" style={navStyle}>
              <NavigationControl />
            </div>
          </MapGL>
        </Grid>
        <Grid item xs={4}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              id="date"
              label="Date and Time"
              type="datetime-local"
              onChange={(event) =>
                setForm({ ...form, date: event.target.value })
              }
              value={form.date}
              variant="outlined"
              fullWidth
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Buy Offline
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

Offline.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToprops = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToprops)(Offline);
