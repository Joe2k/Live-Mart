import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0.5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Create(props) {
  const classes = useStyles();
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [item, setItem] = useState({
    name: "",
    cost: 0,
    quantity: 0,
    location: { longitude: 0, latitude: 0 },
    type: "",
    soldBy: "",
  });

  useEffect(() => {
    console.log(props);
    setItem({
      ...item,
      location: props.auth.user.location,
      type: props.auth.user.type,
      soldBy: props.auth.user.id,
    });
  }, []);

  const onChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = new FormData();
      form.append("name", item.name);
      form.append("cost", item.cost);
      form.append("quantity", item.quantity);
      form.append("location[longitude]", item.location.longitude);
      form.append("location[latitude]", item.location.latitude);
      form.append("type", item.type);
      form.append("photo", currentFile);
      form.append("soldBy", item.soldBy);

      const resp = await axios.post("/api/items/create", form);
      //console.log(resp);
      if (resp.status === 200) {
        props.history.push("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a new item
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Item Name"
            name="name"
            value={item.name}
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="cost"
            label="Item Cost"
            type="number"
            value={item.cost}
            id="cost"
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="quantity"
            label="Quantity"
            type="number"
            value={item.quantity}
            id="quantity"
            onChange={onChange}
          />
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={(e) => selectFile(e)}
              required
            />
            <Button className="btn-choose" variant="outlined" component="span">
              Choose Image
            </Button>
          </label>
          <span style={{ marginLeft: "20px" }}>
            {currentFile ? currentFile.name : null}
          </span>
          {previewImage && (
            <div style={{ marginTop: "10px" }}>
              <img width="100%" src={previewImage} alt="" />
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Add Item
          </Button>
        </form>
      </div>
    </Container>
  );
}

Create.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToprops = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToprops)(Create);
