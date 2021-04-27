import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";

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
  const [displayBought, setDisplayBought] = useState([]);
  const [displaySell, setDisplaySell] = useState([]);
  const [user, setUser] = useState({});
  console.log(props);

  useEffect(() => {
    axios.get("/api/orders/myorder/" + props.auth.user.id).then((resp) => {
      let { data } = resp;
      console.log(data);
      setDisplayBought(data.buyingOrders);
      setDisplaySell(data.sellingOrders);
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
        Bought Orders
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
                <Grid item xs={6}>
                  <Typography variant="body2" color="primary" component="p">
                    Total Cost : Rs. {item.cost}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <GreenTextTypography
                    variant="body2"
                    color="textPrimary"
                    component="p"
                    align="right"
                  >
                    {item.status}
                  </GreenTextTypography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Delivery By : {item.deliveryDetails.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="left"
                  >
                    Contact : {item.deliveryDetails.contact}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
          {item.status === "Delivered" && (
            <CardActions>
              <Rating
                name="simple-controlled"
                // value={value}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
              />
            </CardActions>
          )}
        </Card>
      ))}

      <Typography
        className={classes.heading}
        gutterBottom
        variant="h2"
        component="h2"
      >
        Selling Orders
      </Typography>

      {displaySell.map((item) => (
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
                    Bought by: {item.buyer.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="primary" component="p">
                    Total Cost : Rs. {item.cost}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <GreenTextTypography
                    variant="body2"
                    color="textPrimary"
                    component="p"
                    align="right"
                  >
                    {item.status}
                  </GreenTextTypography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Delivery By : {item.deliveryDetails.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="left"
                  >
                    Contact : {item.deliveryDetails.contact}
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
