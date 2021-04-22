import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Box, ListItem, withStyles } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

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

function Create() {
  const classes = useStyles();
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);

  const selectFile = (event) => {
    console.log("hehe");
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    // this.setState({
    //   currentFile: event.target.files[0],
    //   previewImage: URL.createObjectURL(event.target.files[0]),
    //   progress: 0,
    //   message: ""
    // });
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
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Item Name"
            name="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="cost"
            label="Item Cost"
            type="number"
            id="cost"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="quantity"
            label="Quantity"
            type="number"
            id="cost"
          />
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={(e) => selectFile(e)}
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
          >
            Add Item
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Create;
