import "./App.css";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { deepOrange, red } from "@material-ui/core/colors";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

// export const light = {
//   palette: {
//     type: "light",
//     background: {
//       default: "#fff",
//     },
//   },
// };

// export const dark = {
//   palette: {
//     type: "dark",
//     primary: red,
//     background: {
//       default: "#303030",
//     },
//   },
// };

function App() {
  // const [theme, setTheme] = useState(localStorage.getItem("theme") || true);

  // // Icons imported from `@material-ui/icons`

  // let appliedTheme = createMuiTheme(theme ? light : dark);
  // React.useEffect(() => {
  //   localStorage.setItem("theme", theme);
  //   appliedTheme = createMuiTheme(theme ? light : dark);
  // }, [theme]);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
