import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";

class Landing extends Component {
  render() {
    return (
      <Grid container style={{ height: "75vh" }}>
        <div className="row">
          <Grid item xs={12}>
            <h4>
              <b>Build</b> a login/auth app with the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
              scratch
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Create a (minimal) full-stack app with user authentication via
              passport and JWTs
            </p>
            <br />
            <Grid item xs={6}>
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }
}
export default Landing;
