import React from "react";
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

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    display: "inline-block",
    marginLeft: 20,
    marginRight: 20,
    flex: "1",
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

function Vegetables() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography
        className={classes.heading}
        gutterBottom
        variant="h2"
        component="h2"
      >
        Vegetables
      </Typography>
      <SearchBar className={classes.search} />
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://solidstarts.com/wp-content/uploads/Broccoli_edited-480x320.jpg"
            title="Contemplative Reptile"
          />
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
                <Typography variant="body2" color="textSecondary" component="p">
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
        <CardActions>
          <Button size="small" color="primary">
            Buy Online
          </Button>
          <Button size="small" color="secondary">
            Buy Offline
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Vegetables;
