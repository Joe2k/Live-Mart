import React from "react";
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

function Online() {
  const classes = useStyles();
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
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
