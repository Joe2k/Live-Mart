import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    display: "inline-block",
    marginLeft: 20,
    marginRight: 20,
  },
  media: {
    height: 250,
  },
  container: {
    marginTop: 50,
  },
});

function Dashboard() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg"
            title="Vegetables"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Vegetables
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Vegetables are well-known for being good for your health. Most
              vegetables are low in calories but high in vitamins, minerals and
              fiber.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link href="/vegetables" underline="none">
            <Button size="small" color="primary">
              Buy
            </Button>
          </Link>
        </CardActions>
      </Card>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://veggiedesserts.com/wp-content/uploads/2018/07/Fruit-Platter-sq.jpg"
            title="Fruits"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Fruits
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Fruits are an excellent source of essential vitamins and minerals,
              and they are high in fiber. Fruits also provide a wide range of
              antioxidants
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Buy
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1141999659%2F0x0.jpg"
            title="Grocery"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Grocery
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Get all the other food items you would need such as flour, sugar,
              tinned foods and all the household requirements
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Buy
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Dashboard);
