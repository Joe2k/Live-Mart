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

function Orders(props) {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [displayBought, setDisplayBought] = useState([]);
  const [displaySell, setDisplaySell] = useState([]);
  const [user, setUser] = useState({});
  console.log(props);

  useEffect(() => {
    axios.get("/api/orders/myevents/" + props.auth.user.id).then((resp) => {
      let { data } = resp;
      console.log(data);
      setDisplayBought(data.buyingEvents);
      setDisplaySell(data.sellingEvents);
      setUser(data);
    });
  }, []);

  return (
    <Container className={classes.container}>
      <Typography
        className={classes.heading}
        gutterBottom
        variant="h2"
        component="h2"
      >
        Buying Events
      </Typography>

      {displayBought.map((item) => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={item.item.url}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.CardContent}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.item.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="p"
                    color="textPrimary"
                  >
                    Sold by: {item.seller.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Date : {item.time && item.time.split("T")[0]}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="left"
                  >
                    Time : {item.time && item.time.split("T")[1]}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      <Typography
        className={classes.heading}
        gutterBottom
        variant="h2"
        component="h2"
      >
        Selling Events
      </Typography>

      {displaySell.map((item) => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={item.item && item.item.url}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.CardContent}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.item && item.item.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="p"
                    color="textPrimary"
                  >
                    Sold by: {item.buyer && item.buyer.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Date : {item.time && item.time.split("T")[0]}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="left"
                  >
                    Time : {item.time && item.time.split("T")[1]}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Container>
  );
}

Orders.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToprops = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToprops)(Orders);
