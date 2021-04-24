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
import Vegetables from "./components/Vegetables/Vegetables";
import Online from "./components/Online/Online";
import Offline from "./components/Offline/Offline";
import Create from "./components/Create/Create";
import Fruits from "./components/Fruits/Fruits";
import Grocery from "./components/Grocery/Grocery";
import Orders from "./components/Orders/Orders";
import Events from "./components/Events/Events";
import Delivery from "./components/Delivery/Delivery";

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

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <NavBar />
          {/* <Route exact path="/" component={Landing} /> */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/delivery" component={Delivery} />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/vegetables" component={Vegetables} />
            <PrivateRoute exact path="/fruits" component={Fruits} />
            <PrivateRoute exact path="/grocery" component={Grocery} />
            <PrivateRoute exact path="/online/:id" component={Online} />
            <PrivateRoute exact path="/offline/:id" component={Offline} />
            <PrivateRoute exact path="/create" component={Create} />
            <PrivateRoute exact path="/orders" component={Orders} />
            <PrivateRoute exact path="/events" component={Events} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
