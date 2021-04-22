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
      width: "50%",
    },
  },
}));

const GreenTextTypography = withStyles({
  root: {
    color: "#00a152",
  },
})(Typography);

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
};

function Online() {
  const classes = useStyles();
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
  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            className={classes.heading}
            gutterBottom
            variant="h2"
            component="h2"
          >
            Buy Online
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="https://solidstarts.com/wp-content/uploads/Broccoli_edited-480x320.jpg"
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
                      Broccoli
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="primary" component="p">
                      Cost : Rs. 200
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
                      Quantity Availabe : 16
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="right"
                    >
                      Distance : 5 km
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
            mapStyle="mapbox://styles/mapbox/streets-v11"
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
                Shop Name
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
              id="standard-number"
              label="Quantity"
              variant="outlined"
              type="number"
              fullWidth
            />
            <Button variant="contained" color="primary" fullWidth>
              Buy Online
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Online;
