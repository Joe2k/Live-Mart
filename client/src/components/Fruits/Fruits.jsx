import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getDistance from "../../utils/getDistance";
import { Link } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    display: "inline-block",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
  },
  media: {
    height: 200,
  },
  container: {
    marginTop: 50,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
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
});

const GreenTextTypography = withStyles({
  root: {
    color: "#00a152",
  },
})(Typography);

function Fruits(props) {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    axios.get("/api/items/all").then((resp) => {
      let { data } = resp;
      data = data.filter((i) => i.category === "Fruits");
      //console.log(data);
      //console.log(props.auth.user.location);
      data.forEach((d, i, arr) => {
        let newDistance = getDistance(
          props.auth.user.location.latitude,
          props.auth.user.location.longitude,
          d.location.latitude,
          d.location.longitude
        );

        arr[i] = { ...d, distance: newDistance };
      });
      setItems(data);
      setDisplayItems(data);
    });
  }, []);

  const handleSearch = (newValue = search) => {
    setSearch(newValue);
    setDisplayItems(
      items.filter(
        (item) =>
          item.name.toLowerCase().includes(newValue) ||
          item.soldBy.name.toLowerCase().includes(newValue)
      )
    );
  };

  return (
    <Container className={classes.container}>
      <Typography
        className={classes.heading}
        gutterBottom
        variant="h2"
        component="h2"
      >
        Fruits
      </Typography>
      <SearchBar
        className={classes.search}
        value={search}
        onChange={(newValue) => handleSearch(newValue)}
        onRequestSearch={handleSearch}
        onCancelSearch={() => handleSearch("")}
      />

      {displayItems.map((item) => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={item.url}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.CardContent}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="p"
                    color="textPrimary"
                  >
                    Sold by: {item.soldBy.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="primary" component="p">
                    Cost : Rs. {item.cost}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {item.quantity > 0 ? (
                    <GreenTextTypography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                      align="right"
                    >
                      In Stock
                    </GreenTextTypography>
                  ) : (
                    <Typography
                      variant="body2"
                      color="error"
                      component="p"
                      align="right"
                    >
                      Out of Stock
                    </Typography>
                  )}
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
          <CardActions>
            {item.quantity > 0 ? (
              <>
                <Link href={"/online/" + item._id} underline="none">
                  <Button size="small" color="primary">
                    Buy Online
                  </Button>
                </Link>

                <Link href={"/offline/" + item._id} underline="none">
                  <Button size="small" color="secondary">
                    Buy Offline
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button size="small" color="primary" disabled>
                  Buy Online
                </Button>
                <Button size="small" color="secondary" disabled>
                  Buy Offline
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}

Fruits.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToprops = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToprops)(Fruits);
